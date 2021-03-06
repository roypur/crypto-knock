package main
 
import (
    "fmt"
    "net"
    "time"
    "io/ioutil"
    "encoding/json"
    "bytes"
    "crypto/hmac"
    "crypto/sha512"
    "encoding/hex"
    "os/exec"
    "strconv"
)

var key string;
var listen string;
var chain string;
var timeout int64;

var ipTimer = make(map[string]int64);

/* A Simple function to verify error */
func checkError(err error) {
    if err  != nil {
        fmt.Println("Error: " , err);
    }
}

func parseConfig(){

    file, err := ioutil.ReadFile("/etc/CryptoKnock/config.json");
    
    checkError(err);
    
    config := make(map[string]string);
    
    err = json.Unmarshal(file, &config);

    listen = config["listen"];
    key = config["key"];
    chain = config["chain"];
    
    checkError(err);
    
    timeout,err = strconv.ParseInt(config["timeout"], 10, 64);
    
    if(err != nil){
        timeout = 0;
    }
    fmt.Println("Listening on " + listen + "\n");

}

func main(){
    parseConfig();
    newChain();
    server(listen, key);
}

func server(listen, key string) {
    //Listen on selected ip and port
    ServerAddr,err := net.ResolveUDPAddr("udp", listen);
    checkError(err);
 
    //Now listen at selected port
    ServerConn, err := net.ListenUDP("udp", ServerAddr);
    checkError(err);
    defer ServerConn.Close();

    buf := make([]byte, 512);

    for {
        ServerConn.ReadFromUDP(buf);
        go parseUDP(buf); 
    }
}

func parseUDP(buf []byte){
    if(buf != nil){
        //Remove null values after string
        buf = bytes.SplitAfter(buf, []byte("}"))[0];
        incomming := make(map[string]string);
        json.Unmarshal(buf, &incomming);
        val(incomming);
    }
}


func val(incomming map[string]string){

    inSum,_ := hex.DecodeString(incomming["signature"]);
    
    value := []byte(incomming["ip"] + incomming["state"]);
    
    mac := hmac.New(sha512.New, []byte(key))
    mac.Write(value);
    
    newSum := mac.Sum(nil);
    
    if(hmac.Equal(newSum, inSum)){

        if(incomming["state"] == "open"){
            openIp(incomming["ip"]);
            if(timeout != 0){
                expire(incomming["ip"]);
            }
        }else if(incomming["state"] == "close"){
            closeIp(incomming["ip"]);
        }
        
        
    }
}



func expire(ip string){

    _, ok := ipTimer[ip];
    
    ipTimer[ip] = time.Now().Unix() + timeout;
    
    if !ok{
        
        var wait bool = true;
            
        for wait{
            time.Sleep(time.Second);
        
            if(ipTimer[ip] < time.Now().Unix()){
                closeIp(ip);
                delete(ipTimer, ip);
                wait = false;
            }
        }
    }
}


//if ip in iptables => return true
//else => return false

func testIp(ip string)(bool){
    cmd := exec.Command("iptables", "-C", chain, "-s", ip, "-j", "ACCEPT");
    err := cmd.Run();
    if(err == nil){
        return false;
    }else{
        return true;
    }
}

func openIp(ip string){
    if(testIp(ip)){
        cmd := exec.Command("iptables", "-I", chain, "-s", ip, "-j", "ACCEPT");
        err := cmd.Run();
        checkError(err);
        
    }
    
}

func closeIp(ip string){
    for(!testIp(ip)){
        cmd := exec.Command("iptables", "-D", chain, "-s", ip, "-j", "ACCEPT");
        err := cmd.Run();
        checkError(err);
    }
}

func newChain(){
    cmd := exec.Command("iptables","-F",chain);
    cmd.Run();
    cmd = exec.Command("iptables","-X",chain);
    cmd.Run();
    cmd = exec.Command("iptables","-N",chain);
    cmd.Run();
    cmd = exec.Command("iptables","-A",chain,"-j","DROP");
    cmd.Run();
}



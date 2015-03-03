package main
 
import (
    "fmt"
    "net"
    "io/ioutil"
    "encoding/json"
    "bytes"
    "crypto/hmac"
    "crypto/sha512"
    "encoding/hex"
    "os/exec"
)

var key string;
var listen string;
var chain string;

//time := make(map[string]int);


/* A Simple function to verify error */
func checkError(err error) {
    if err  != nil {
        fmt.Println("Error: " , err);
    }
}

func parseConfig(){

    file, err := ioutil.ReadFile("config.json");
    
    checkError(err);
    
    config := make(map[string]string);
    
    err = json.Unmarshal(file, &config);
    
    checkError(err);
    
    listen = config["listen"];
    key = config["key"];
    chain = config["chain"];
    
    fmt.Println("Listening on " + listen + "\n")

}

func main(){
    parseConfig();
    newChain();
    server(listen, key);
}

func server(listen, key string) {
    /* Lets prepare a address at any address at port 10001*/
    ServerAddr,err := net.ResolveUDPAddr("udp", listen)
    checkError(err)
 
    /* Now listen at selected port */
    ServerConn, err := net.ListenUDP("udp", ServerAddr)
    checkError(err)
    defer ServerConn.Close()

    buf := make([]byte, 512);

    for {
        _,_,err := ServerConn.ReadFromUDP(buf);
        
        checkError(err);
        
        //Remove null values after string
        buf = bytes.SplitAfter(buf, []byte("}"))[0];
        
        if(buf != nil){
            incomming := make(map[string]string);
            err := json.Unmarshal(buf, &incomming);
            checkError(err);
            val(incomming);
            
        }
        
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
        }else if(incomming["state"] == "close"){
            closeIp(incomming["ip"]);
        }
        
        
    }
}

//if ip in iptables => return false
//else => return true

func testIp(ip string)(bool){
    cmd := exec.Command("iptables", "-C", chain, "-s", ip, "-j", "ACCEPT");
    err := cmd.Run();
    if(err != nil){
        return false;
    }else{
        return true;
    }
}

func openIp(ip string){
    if(!testIp(ip)){
        cmd := exec.Command("iptables", "-I", chain, "-s", ip, "-j", "ACCEPT");
        err := cmd.Run();
        checkError(err);
    }
    
}

func closeIp(ip string){
    for(testIp(ip)){
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



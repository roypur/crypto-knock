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

time:= make(map[string]int);


/* A Simple function to verify error */
func checkError(err error) {
    if err  != nil {
        fmt.Println("Error: " , err);
    }
}

func parseConfig()(string, string){

    file, err := ioutil.ReadFile("config.json");
    
    checkError(err);
    
    config := make(map[string]string);
    
    err = json.Unmarshal(file, &config);
    
    checkError(err);
    
    var listen string = config["listen"];
    var key string = config["key"];
    
    fmt.Println("Listening on " + listen + "\n")
    
    return listen, key;
}

func main(){
    listen, key := parseConfig();
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
    
    openIp(incomming["ip"]);
    
    if(hmac.Equal(newSum, inSum)){
        fmt.Println("true");    
    }
}

func timeOut(ip string){
    time[]
}





func openIp(ip string){
    cmd := exec.Command("date");
    var err error = cmd.Run();
    checkError(err);
}

package main
 
import (
    "fmt"
    "net"
    "os"
    "encoding/json"
    "bytes"
)

var port string = ":5005";
/*
type Message struct{
    ip string `json:"ip"`
    signature string `json:"signature"`
    state string `json:"state"`
    }
*/


/* A Simple function to verify error */
func CheckError(err error) {
    if err  != nil {
        fmt.Println("Error: " , err)
        os.Exit(0)
    }
}
 
func main() {
    /* Lets prepare a address at any address at port 10001*/   
    ServerAddr,err := net.ResolveUDPAddr("udp", port)
    CheckError(err)
 
    /* Now listen at selected port */
    ServerConn, err := net.ListenUDP("udp", ServerAddr)
    CheckError(err)
    defer ServerConn.Close()

    buf := make([]byte, 512);

    for {
        _,addr,err := ServerConn.ReadFromUDP(buf);
        
        //Remove null values after string
        buf = bytes.SplitAfter(buf, []byte("}"))[0];
        
        if(buf != nil){
            m := make(map[string]string);
            
            err := json.Unmarshal(buf, &m);
            if err != nil{
                panic(err);
            }

            fmt.Println(m["ip"]);
        }
        
        if err != nil {
            fmt.Println("Error: ",err, addr)
        }
    }
}

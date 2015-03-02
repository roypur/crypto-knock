package main
import "net"

var address = "0.0.0.0"
var port = 5005

var key = "kjhnbskdfghntg"


func main() {
    addr := net.UDPAddr{
        Port: port,
        IP: net.ParseIP("0.0.0.0"),
    }
    conn, err := net.ListenUDP("udp", &addr)
    defer conn.Close()
    if err != nil{
        panic(err)
    }

    // Do something with `conn`
}

/*
def udpServer():

    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind((address, port))

    while True:
        try:
            data = sock.recv(256)
            try:
                content = json.loads(data.decode("utf-8"))
            
                checkSum = hmac.new(key.encode("utf-8"), content['ip'].encode("utf-8") + content['state'].encode('utf-8'), 'sha512')
            
                signature = checkSum.hexdigest()
            
                success = hmac.compare_digest(signature, content['signature'])
    
                if success:
                    print("success", content['ip'])
                    try:
                        
                        if content['state'] == "open":
                            addIP(content['ip'])
                        elif content['state'] == "close":
                            removeIP(content['ip'])
                            
                    except Exception as e:
                        print(str(e))
            except:
                print("invalid package")
        
        except:
            print("\n")
            exit()

udpServer()
*/

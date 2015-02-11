#!/usr/bin/python3
import socket
import json
import hmac
import iptc

address = "0.0.0.0"
port = 5005

key = "kjhnbskdfghntg"

def addIP(ip):
    rule = iptc.Rule()
    rule.src = ip
    rule.create_target("ACCEPT")
    
    match = rule.create_match("comment")
    match.comment = "port-knock"
    
    chain = iptc.Chain(iptc.Table(iptc.Table.FILTER), "INPUT")
    chain.insert_rule(rule)

def removeIP(ip):
    
    run = True
    
    while run:
        try:
            rule = iptc.Rule()
            rule.src = ip
            rule.create_target("ACCEPT")
    
            match = rule.create_match("comment")
            match.comment = "port-knock"
    
            chain = iptc.Chain(iptc.Table(iptc.Table.FILTER), "INPUT")
            chain.delete_rule(rule)
        except:
            run = False



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


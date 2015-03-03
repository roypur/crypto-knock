#!/usr/bin/python
import socket
import json
import hmac


ip = "127.0.0.1"
state = "close"


key = "kjhnbskdfghntg"

address = "127.0.0.1"
port = 5005


signature = hmac.new(key.encode("utf-8"), ip.encode('utf-8') + state.encode('utf-8'), 'sha512').hexdigest()

data = {}
data['ip'] = ip
data['state'] = state;
data['signature'] = signature



message = json.dumps(data)

print(message)

packet = message.encode("utf-8")


print("UDP target IP:", address)
print("UDP target port:", port)

sock = socket.socket(socket.AF_INET, # Internet
                     socket.SOCK_DGRAM) # UDP
sock.sendto(packet, (address, port))

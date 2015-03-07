# crypto-knock
An advanced "port knocker" sending signed udp packet instead of port number sequence.

I recommend you use the go implementation of the server. it is more efficient and uses a custom iptable-chain.

**install**
    
    git clone https://github.com/roypur/crypto-knock
    cd crypto-knock
    cd go
    go build server.go
    sudo cp server /usr/bin/cryptoknockd
    sudo cp config.json /etc/CryptoKnock/config.json


**sample config**

*/etc/CryptoKnock/config.json*

    {
        "listen":":5005"
        "chain":"CryptoKnock"
        "key":"MyÜberSecretKey"
    }


**run**

    sudo cryptoknockd
    sudo iptables -A INPUT -j chain-name
    
<a href='https://chrome.google.com/webstore/detail/crypto-knock/opdobdojdhfbdmhpfnhihoigbfjbfddi'>Chrome app</a>

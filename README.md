# crypto-knock
An advanced "port knocker" sending signed udp packet instead of port number sequence.

I recommend you use the go implementation of the server. it is more efficient and uses a custom iptable-chain.

**install**
    git clone https://github.com/roypur/crypto-knock
    cd crypto-knock
    cd go
    go build server.go
    sudo cp server /usr/bin/cryptoknock


**sample config file**

    /etc/CryptoKnock/config.json
    
    {
        "listen":":5005"
        "chain":"CryptoKnock"
        "key":"MyÜberSecretKey"
    }
    
The config file should be stored in /etc/CryptoKnock/config.json
    
<a href='https://chrome.google.com/webstore/detail/crypto-knock/opdobdojdhfbdmhpfnhihoigbfjbfddi'>Chrome app</a>

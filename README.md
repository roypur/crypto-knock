# crypto-knock
An advanced "port knocker" sending signed udp packet instead of port number sequence.

I recommend you use the go implementation of the server. it is more efficient and uses a custom iptable-chain.

sample config file

    {
        "listen":":5005"
        "chain":"CryptoKnock"
        "key":"MyüberSecretKey"
    }
    
<a href='https://chrome.google.com/webstore/detail/crypto-knock/opdobdojdhfbdmhpfnhihoigbfjbfddi'>Chrome app</a>

function getIP(callback){
    var ip_dups = {};

    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
        || window.mozRTCPeerConnection
        || window.webkitRTCPeerConnection;

    //minimal requirements for data connection
    var mediaConstraints = {
        optional: [{RtpDataChannels: true}]
    };

    servers = [
               "stun:stun.services.mozilla.com",
               "stun:stun.l.google.com:19302",
               "stun:stun1.l.google.com:19302",
               "stun:stun2.l.google.com:19302",
               "stun:stun3.l.google.com:19302",
               "stun:stun4.l.google.com:19302",
               "stun:stun.ekiga.net",
               "stun:stun.ideasip.com",
               "stun:stun.iptel.org",
               "stun:stun.rixtelecom.se",
               "stun:stun.schlund.de",
               "stun:stunserver.org",
               "stun:stun.softjoys.com",
               "stun:stun.voiparound.com",
               "stun:stun.voipbuster.com",
               "stun:stun.voipstunt.com"
              ]

    if(window.webkitRTCPeerConnection)
    {
        var chromeServers = {iceServers: []};
        
        for(var i = 0; i < servers.length; i++)
        {
            chromeServers.iceServers[i] = {urls: servers[i]};
        };
    
    servers = chromeServers;
    
    };
                      
    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);
    //listen for candidate events
    pc.onicecandidate = function(ice)
    {

        //skip non-candidate events
        if(ice.candidate)
        {

            //match just the IP address
            var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/
            var ip_addr = ip_regex.exec(ice.candidate.candidate)[1];
            
            //remove duplicates
            if(ip_dups[ip_addr] === undefined)
            {    
                if(!ip_addr.match(/^(192\.168\.|169\.254\.|10\.|172\.(1[6-9]|2\d|3[01]))/))
                {
                    callback(ip_addr);
                }
                
            ip_dups[ip_addr] = true;
            }
        }
    };
    //create a bogus data channel
    pc.createDataChannel("");

    //create an offer sdp
    pc.createOffer(function(result)
    {
        //trigger the stun server request
        pc.setLocalDescription(result, function(){}, function(){});

    }, function(){});
}

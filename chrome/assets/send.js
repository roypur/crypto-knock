function send(text, ip, port)
{
    var socketInfo;
    chrome.sockets.udp.create({}, function(callback)
        {
            socketInfo = callback;
            socketId = socketInfo.socketId;
        
            var utfArray = new TextEncoder('utf-8').encode(text);
        
            var ab = new ArrayBuffer(utfArray.length);
    
            var buf = new Uint8Array(ab);
        
            for(var i = 0; i<= utfArray.length; i++)
            {
                buf[i] = utfArray[i];
            }
            
            chrome.sockets.udp.bind(socketId, "0.0.0.0", 0, function()
            {

                chrome.sockets.udp.send(socketId, ab, ip, port, function(sendInfo)
                {
                });
                
            });
            
            
            
        }
    );
}


window.addEventListener('error (window)', function()
{
    console.log("Something went wrong");
});


document.addEventListener('DOMContentLoaded', function()
{
    document.getElementById("open").addEventListener("mousedown", function()
    {
        getInput("open");
    })
    
    document.getElementById("close").addEventListener("mousedown", function()
    {
        getInput("close");
    })
    
    $.get("https://icanhazip.com", function(data)
    {
        document.getElementById("local").value = data;
    });
    
    function getInput(state)
    {
        var remote = document.getElementById("remote").value;
        var port = parseInt(document.getElementById("port").value, 10);
        var local = document.getElementById("local").value;
        var key = document.getElementById("key").value;
        
        if(remote != "" && port != "" && local != "" && !isNaN(port))
        {
            makePackage(remote, port, local, state, key);
        }
        else
        {
            picoModal("Invalid Input!").show();
        }
    }
    
    $("#openSettings").click(function()
    {
        chrome.app.window.create('settings.html',
        {
            'bounds':
            {
                'width': 900,
                'height': 400
            }
        });
    });
    
    
    function makePackage(remote, port, local, state, key)
    {

        var message = local + state;
        var shaObj = new jsSHA(message, "TEXT");
        var sig = shaObj.getHMAC(key, "TEXT", "SHA-512", "HEX", "UTF8");
    
    
        var json = {"ip":local, "signature":sig, "state":state};
    
        var sJson = JSON.stringify(json);
    
        send(sJson, remote, port);
    
    }

});



window.addEventListener('error (window)', function()
{
    console.log("Something went wrong");
});


document.addEventListener('DOMContentLoaded', function()
{
    $("#open").click(function()
    {
        getInput("open");
    });
    
    $("#close").click(function()
    {
        getInput("close");
    });
    
    getIP(function(ip)
    {
        $("#local").val(ip);
    });
    
    function getInput(state)
    {
        var remote = $("#remote").val();
        var port = parseInt($("#port").val(), 10);
        var local = $("#local").val();
        var key = $("#key").val();
        
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



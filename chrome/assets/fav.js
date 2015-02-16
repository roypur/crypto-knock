makeSpace();

document.addEventListener('DOMContentLoaded', function()
{
    list();
});

chrome.storage.onChanged.addListener(function()
{
    list();
});

function list()
{
    chrome.storage.sync.get(null, function(items)
    {
        var data = items.storage;
        $("#fav").html("<option value='empty'></option>");
        
        for(var i = 0; i<data.length; i++)
        {
            $("#fav").append("<option value='" + i + "' + class='dropDown'>" + data[i]["name"] + "</option>");
        };
        
        $("#fav").change(function()
        {
            var line = $("#fav").val();
            
            if(line != "empty")
            {
                $("#remote").val(data[line]["remote"]);
                $("#key").val(data[line]["key"]);
                $("#port").val(data[line]["port"]);
            }
        });
    
    });
}

function makeSpace()
{
    chrome.storage.sync.getBytesInUse(null, function(bytes)
    {
        if(bytes == 0)
        {
            var data = [];
            chrome.storage.sync.set({"storage":data}, function(){});
        }
    
    });
}

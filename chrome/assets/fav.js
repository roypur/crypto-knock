makeSpace();

document.addEventListener('DOMContentLoaded', function()
{
    list()
    
    $("#fav").change(function()
    {
        paste();
    });

});

chrome.storage.onChanged.addListener(function()
{
    list();
});



function list()
{
    chrome.storage.local.get(null, function(items)
    {
        window.data = items.storage;
        $("#fav").html("<option value='empty'></option>");
        
        for(var i = 0; i<window.data.length; i++)
        {
            $("#fav").append("<option value='" + i + "' + class='dropDown'>" + window.data[i]["name"] + "</option>");
        };
       
    });
}

function paste()
{
    var line = $("#fav").val();
    
    if(line != "empty")
    {
        $("#remote").val(window.data[line]["remote"]);
        $("#key").val(window.data[line]["key"]);
        $("#port").val(window.data[line]["port"]);
    }
}


function makeSpace()
{
    chrome.storage.local.getBytesInUse(null, function(bytes)
    {
        if(bytes == 0)
        {
            var data = [];
            chrome.storage.local.set({"storage":data}, function(){});
        }
    
    });
}

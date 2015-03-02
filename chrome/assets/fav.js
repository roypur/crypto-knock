makeSpace();

var loaded = false;
var init = false;

$(document).ready(function()
{
    loaded = true;

    if(init)
    {
        afterSpace();
    }
});

$(document).on("init", function()
{
    init = true;

    if(loaded)
    {
        afterSpace();
    }
});

chrome.storage.onChanged.addListener(function()
{
    list();
});

function afterSpace()
{
    list();
    
    $("#fav").change(function()
    {
        paste();
    });
}

function list()
{
    chrome.storage.local.get(null, function(items)
    {
        window.data = items.storage;
        
        var length = window.data.length;
        
        $("#fav").html("<option value='empty'></option>");
        
        for(var i = 0; i < length; i++)
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
            var set = [];
            chrome.storage.local.set({"storage":set}, endSpace);
        }
        else
        {
            endSpace();
        }
    
    });
}

function endSpace()
{
    $.event.trigger(
    {
	    type: "init",
	    message: "",
	    time: new Date()
    });
}

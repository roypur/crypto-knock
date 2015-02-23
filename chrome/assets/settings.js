document.addEventListener('DOMContentLoaded', function()
{
    modify();
});


function makeMenu(id, data)
{  
    if(id == "new")
    {
    
        if(data[data.length] == undefined)
        {
            id = data.length;
        }
        else
        {
            id = data.length + 1;
        }
        
        data[id] = {"remote":"", "port":"", "key":"", "name":""};

    }    

    var div = "<div id='menu' data-id='" + id + "'>";
       div += "<table>";
       
       div += "<tr>";
       div += "<td>Remote Address</td><td><input type='text' id='remote' value='" + data[id]["remote"] + "' </td>";
       div += "</tr>";
       
       div += "<tr>";
       div += "<td>Port</td><td><input type='text' id='port' value='" + data[id]["port"] + "' </td>";
       div += "</tr>";
       
       div += "<tr>";
       div += "<td>Secret Key</td><td><input type='text' id='key' value='" + data[id]["key"] + "' </td>";
       div += "</tr>";       

       div += "<tr>";
       div += "<td>Name</td><td><input type='text' id='name' value='" + data[id]["name"] + "' </td>";
       div += "</tr>";  
       
       div += "<tr>";
       div += "<td></td><td>";
       div += "<input type='button' id='save' value='save'></input>";
       div += "<input type='button' id='delete' value='delete'></input>";
       div += "</td>";
       div += "</tr>";
       
       
       div += "</table>";
       div += "</div>";
    
    
    
    var modal = picoModal(div);
    modal.afterClose(function()
    {
        modal.destroy();
    }).show();
    
    
    
    $("#save").click(function()
    {
        
        var key = $("#key").val();
        var port = $("#port").val();
        var remote = $("#remote").val();
        var name = $("#name").val();
        
        
        var update = {"key":key, "port":port, "remote":remote, "name":name};
        
        var id = $("#menu").data("id");
        
        modify(update, id);
        modal.destroy();
    });
    
    $("#delete").click(function()
    {
        var id = $("#menu").data("id");
        
        modify(false, id);
        
        modal.destroy();
    });
    
}




function setTable()
{
    $("#list").html("<tr>");
    $("#list").append("<td><b>Name</b></td>");
    $("#list").append("<td><b>Remote Address</b></td>");
    $("#list").append("<td><b>Port</b></td>");
    $("#list").append("<td><b>Secret Key</b></td>");
    $("#list").append("<td><input type='button' id='new' value='add server' class='edit'></input></td>");
    $("#list").append("</tr>");
}


function setData(data, update, line)
{
    if(update != false)
    {
        data[line] = update;
    }
    else
    {
        data.splice(line, 1);
    }
    
    sortData(data);
    
    
    chrome.storage.local.set({"storage":data}, function()
    {
        setTable();
        drawData(data);
    });

}

function sortData(data) {
    data = data.sort(function(a, b) {
        return (a["name"] > b["name"]) ? 1 : ((a["name"] < b["name"]) ? -1 : 0);
    });
}

function modify(update, line)
{
    chrome.storage.local.get(null, function(items)
    {
        if(update == undefined)
        {
            setTable();
            drawData(items.storage);
        }
        else if(update == false)
        {
            setData(items.storage, false, line);
        }
        else
        {
            setData(items.storage, update, line);
        }
    });
    
}

function drawData(data)
{
    for(var i = 0; i<data.length; i++)
    {
        $("#list").append("<tr><br>");
        $("#list").append("<td>" + data[i]["name"] + "</td>");
        $("#list").append("<td>" + data[i]["remote"] + "</td>");
        $("#list").append("<td>" + data[i]["port"] + "</td>");
        $("#list").append("<td>" + data[i]["key"] + "</td>");
        $("#list").append("<td><input type='button' id='" + i + "' value='edit' class='edit'></input></td>");
        $("#list").append("</tr>");
    }
    
    $(".edit").click(function()
    {
        makeMenu(this.id, data)
    });
    
    
}

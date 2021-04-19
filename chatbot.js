var message_in = [];
var message_out = [];
var message_list = ["Welcome to talk with COVID Chatbot"];

function sendMessage() {
    var question = document.getElementById('question').value;
    if(question != "" && question != null)
    {
        message_list.push(question);
        append_out_message(question);
        document.getElementById('question').value = "";

        var answer = send_question(question);
        append_in_message(answer);
    }
}

function initMessage() {
    for(let i=0; i<message_list.length; i++)
    {
        var message = message_list[i];
        if(message_list.includes(message))
        {
            append_in_message(message);
            //$('messages').append('<div class="message-in"><p>message</p></div>')
        }
    }
}

function append_in_message(message) {
    var node = document.createElement("p");  
    node.setAttribute("class", "message-in"); 
    var line = message.replaceAll('\\"', '\"').split(/[;\t]/)
    //var line = message.split(";")
    for(i=0; i<line.length; i++) {
        var content = document.createTextNode(line[i]);
        node.appendChild(content);
        var linebreak = document.createElement('br');
        node.appendChild(linebreak);
    }
    var div = document.getElementById("message-container");
    div.appendChild(node);
}

function append_out_message(message) {
    var node = document.createElement("p");  
    node.setAttribute("class", "message-out"); 
    var content = document.createTextNode(message);
    node.appendChild(content);
    var div = document.getElementById("message-container");
    div.appendChild(node);
}

function send_question(question) {
    var xmlhttp = new XMLHttpRequest();
    var params = JSON.stringify({ "question": question });
    console.log(params);
    xmlhttp.open("PUT", "https://134.129.125.120:5000/api/", false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(params);
    return xmlhttp.responseText;
}
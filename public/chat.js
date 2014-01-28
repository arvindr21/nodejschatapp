window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://nodejschatapp.herokuapp.com/');
    var field = $("#field");
    var sendButton = $("#send");
    var content = $("#content");
    var name = $("#name");
	var flag = true;

	content.html("Loading.. Please wait!");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.html(html);
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.click(function() {
        if($.trim(name.val()) == "") {
            alert("Please type your name!");
        } else {
			if(flag)
			{
				$("#name").prop("disabled",true);
				flag = false;
			}
            var text = $.trim(field.val());
            socket.emit('send', { message: text, username: $.trim(name.val()) });
			field.val("");
        }
    });

	field.keyup(function(e) {
        if(e.keyCode == 13) {
            sendButton.trigger("click");
        }
    });

}
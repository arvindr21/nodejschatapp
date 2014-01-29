window.onload = function() {
 
    var messages = [];
    var socket = io.connect('http://nodejschatapp.herokuapp.com/');
    var field = $("#field");
    var sendButton = $("#send");
    var content = $("#content");
    var name = $("#name");
	var flag = true;
	var f = true;

	content.html("Loading.. Please wait!");
	$("#content").after('<ul id="usersOnline" class="usersOnline"><li>Users Online</li></ul><br style="clear:both;"/>');



    socket.on('message', function (data) {
		if(data.message) {
			var html = '';
			var spid = new Date().getTime();
                html += '<span id="chat_'+spid+'"><b>' + (data.username ? data.username : 'Server') + ': </b>';
                html += '<i id="msg_'+spid+'">'+data.message+'</i></span><br />';
				messages.push(html);
				if($("#autoscroll").prop("checked"))
				$("#content").scrollTop($("#content")[0].scrollHeight);
			if(f) 
			{
				content.html(html);
				f = false;
			}
			else
			{
				content.append(html);
			}
			$("#msg_"+spid).emoticonize();
			
        } else {
            console.log("There is a problem:", data);
        }
		
		if(data.connected_users)
		{
			var ul = $("#usersOnline");
			var html = "<li>Users Online</li>";
			for (var key in data.connected_users) {
			  html += "<li>"+key+"</li>";
			}	
			ul.html(html);
		}
    });
 
    sendButton.click(function() {
        if($.trim(name.val()) == "") {
            alert("Please type your name!");
			name.focus();
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

	
	var html  = '<p class="emos"><span class="css-emoticon animated-emoticon">:-)</span><span class="css-emoticon animated-emoticon">:-)</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:)</span> <span class="css-emoticon animated-emoticon">:o)</span> <span class="css-emoticon animated-emoticon">:c)</span> <span class="css-emoticon animated-emoticon">:^)</span> <span class="css-emoticon animated-emoticon">:-D</span> <span class="css-emoticon animated-emoticon">:-(</span> <span class="css-emoticon animated-emoticon">:-9</span> <span class="css-emoticon animated-emoticon">;-)</span> <span class="css-emoticon animated-emoticon">:-P</span> <span class="css-emoticon animated-emoticon">:-p</span> <span class="css-emoticon animated-emoticon">:-Þ</span> <span class="css-emoticon animated-emoticon">:-b</span> <span class="css-emoticon animated-emoticon">:-O</span> <span class="css-emoticon animated-emoticon">:-/</span> <span class="css-emoticon animated-emoticon">:-X</span> <span class="css-emoticon animated-emoticon">:-#</span> <span class="css-emoticon animated-emoticon">:\'(</span> <span class="css-emoticon animated-emoticon">B-)</span> <span class="css-emoticon animated-emoticon">8-)</span> <span class="css-emoticon animated-emoticon">:-\</span> <span class="css-emoticon animated-emoticon">;*(</span> <span class="css-emoticon animated-emoticon">:-*</span><span class="css-emoticon animated-emoticon spaced-emoticon">:]</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:&gt;</span> <span class="css-emoticon animated-emoticon spaced-emoticon">=]</span> <span class="css-emoticon animated-emoticon spaced-emoticon">=)</span> <span class="css-emoticon animated-emoticon spaced-emoticon">8)</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:}</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:D</span> <span class="css-emoticon animated-emoticon small-emoticon spaced-emoticon">8D</span> <span class="css-emoticon animated-emoticon small-emoticon spaced-emoticon">XD</span> <span class="css-emoticon animated-emoticon small-emoticon spaced-emoticon">xD</span> <span class="css-emoticon animated-emoticon small-emoticon spaced-emoticon">=D</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:(</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:&lt;</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:[</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:{</span> <span class="css-emoticon animated-emoticon spaced-emoticon">=(</span> <span class="css-emoticon animated-emoticon spaced-emoticon">;)</span> <span class="css-emoticon animated-emoticon spaced-emoticon">;]</span> <span class="css-emoticon animated-emoticon spaced-emoticon">;D</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:P</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:p</span> <span class="css-emoticon animated-emoticon spaced-emoticon">=P</span> <span class="css-emoticon animated-emoticon spaced-emoticon">=p</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:b</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:Þ</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:O</span> <span class="css-emoticon animated-emoticon small-emoticon spaced-emoticon">8O</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:/</span> <span class="css-emoticon animated-emoticon spaced-emoticon">=/</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:S</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:#</span> <span class="css-emoticon animated-emoticon spaced-emoticon">:X</span> <span class="css-emoticon animated-emoticon spaced-emoticon">B)</span> <span class="css-emoticon animated-emoticon small-emoticon spaced-emoticon">O:)</span>';
	html += '<span class="css-emoticon animated-emoticon pink-emoticon counter-rotated">&lt;3</span> <span class="css-emoticon animated-emoticon red-emoticon spaced-emoticon">;(</span> <span class="css-emoticon animated-emoticon red-emoticon small-emoticon spaced-emoticon">&gt;:)</span> <span class="css-emoticon animated-emoticon red-emoticon small-emoticon spaced-emoticon">&gt;;)</span> <span class="css-emoticon animated-emoticon red-emoticon small-emoticon spaced-emoticon">&gt;:(</span> <span class="css-emoticon animated-emoticon no-rotate">O_o</span> <span class="css-emoticon animated-emoticon no-rotate">O_O</span> <span class="css-emoticon animated-emoticon no-rotate">o_o</span> <span class="css-emoticon animated-emoticon no-rotate">0_o</span> <span class="css-emoticon animated-emoticon no-rotate">T_T</span> <span class="css-emoticon animated-emoticon no-rotate">^_^</span> <span class="css-emoticon animated-emoticon">?-)</span></p>';
	$("#field").after(html);
	$(".css-emoticon").wrap("<a href='javascript:' class='postEmo'></a>");
	$('.emo').emoticonize();
	$(".postEmo").on("click", function(){
		if($.trim(name.val()) == "") {
            alert("Please type your name!");
			name.focus();
        }
		else
		{
			socket.emit('send', { message: $(this).text(), username: $.trim(name.val()) });
			field.val("");
		}
	});
};
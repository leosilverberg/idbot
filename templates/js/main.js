var channel = "/chat";
var socket = io.connect('http://' + document.domain + ':' + location.port + channel);
var author = "leo";

socket.on('connect', function() {
    socket.on('bot_message', function(msg) {
        console.log(msg.data);
        $('#messages').append($('<li>').text(msg.data));
    });
});


/**
 * Sending message
 */
function sendMessage() {
    console.log("sending");
    socket.emit('message', { data: { message: $('#m').val(), author: author } });
    $('#messages').append($('<li>').text($('#m').val()));
    $('#m').val('');/
    $('#m').focus();
    return false;
};
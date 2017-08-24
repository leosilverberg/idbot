var channel = "/chat";
var socket = io.connect('http://' + document.domain + ':' + location.port + channel);
var author = "leo";

socket.on('connect', function() {
    socket.on('bot_message', function(msg) {
        console.log(msg.data);
        $('#messages').append($('<li>').text(msg.data));
        updateScroll();
    });
});

/**
 * Scroll the messages div to bottom
 */
function updateScroll(){
    
    $(".main").animate({ scrollTop: $('.main').prop("scrollHeight")}, 1000);
    console.log("scrolling");
}

/**
 * Sending message
 */
function sendMessage() {
    console.log("sending");
    socket.emit('message', { data: { message: $('#m').val(), author: author } });
    $('#messages').append($('<li>').text($('#m').val()));
    $('#m').val('');
    $('#m').focus();
    updateScroll();
    return false;
};
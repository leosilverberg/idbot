var channel = "/chat";
var socket = io.connect('http://' + document.domain + ':' + location.port + channel);
var author = "leo";

resizeMain()

socket.on('connect', function() {
    socket.on('bot_message', function(msg) {
        console.log(msg.data);
        $('#messages').append('<li class="bot-message"><div class="b-message">'+msg.data+'</div></li>');
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
    $('#messages').append('<li class="user-message"><div class="u-message">'+$('#m').val()+'</div></li>');
    $('#m').val('');
    $('#m').focus();
    updateScroll();
    return false;
};


$(window).resize(function() {
    resizeMain()
});


function resizeMain(){
    console.log("resize");
    $('.main').height(
        $(window).height() - ($('.header').height()+$('.text-input-form').height())
    );
}
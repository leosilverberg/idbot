var channel = "/chat";
var socket = io.connect('http://' + '192.168.0.28' + ':5000' + channel);
var serversocket = io();
var author = "leo";

// serversocket.on('connect', function(){
//     console.log("connected to the server socket");
// })

console.log("running main");

resizeMain();
// checkAuth();

socket.on('connect', function() {
    socket.on('bot_message', function(msg) {
        console.log(msg.data);
        $('#messages').append('<li class="bot-message"><div class="b-message">'+msg.data+'<br>'+msg.classification+'</div></li>');
        updateScroll();
    });
});

function checkAuth(){
    if(!user){
        console.log("not logged in!!!");
    } else {
        console.log("logged in!!!");
    }
}

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
    // socket.emit('message', { data: { message: $('#m').val(), author: author } });
    serversocket.emit('message',  $('#m').val());
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
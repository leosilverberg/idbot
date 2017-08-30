var channel = "/chat";
var socket = io.connect('http://' + '192.168.0.28' + ':5000' + channel);
var serversocket = io();
var author = "leo";
var user = null;
var headerMenuOpen = false;
var menuState="none";

// serversocket.on('connect', function(){
//     console.log("connected to the server socket");
// })

console.log("running main");

resizeMain();
checkAuth();

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
        openHeaderMenu(200);
        setMenuState("login");
    } else {
        console.log("logged in!!!");
    }
}

function menuButtonPress(){
    if(!headerMenuOpen){
        openHeaderMenu(200);
    } else{
        closeHeaderMenu(200);
    }
    
}

function openHeaderMenu(speed){
    $("#header-menu").animate({ height: "100vh" }, speed);
    $(".menu-content").show();
    headerMenuOpen = true;
}

function closeHeaderMenu(speed){
    $(".menu-content").hide();
    $("#header-menu").animate({ height: "45px" }, speed);
    headerMenuOpen = false;
}

function setMenuState(state){
    menuState = state;
    switch(menuState){
        case 'login':
            $('.menu-item').not('#login-container').hide();
            $("#login-container").show();
            break;
        case 'register':
            $('.menu-item').not('#register-container').hide();
            $("#register-contianer").show();
            break;
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
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.loadVideoById(videoIDs[currentVideoId]);
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        var elementi = '#'+videoIDs[currentVideoId];
      $(elementi).removeClass('current');
        currentVideoId++;
        var elementiRi = '#'+videoIDs[currentVideoId];
        if (currentVideoId < videoIDs.length) {
            player.loadVideoById(videoIDs[currentVideoId]);
        }
      $(elementiRi).addClass('current');
    }
}

function nextVideo(){
      var elementi = '#'+videoIDs[currentVideoId];
      $(elementi).removeClass('current');
      currentVideoId++;
        if (currentVideoId < videoIDs.length) {
            player.loadVideoById(videoIDs[currentVideoId]);
        }
        var elementiRi = '#'+videoIDs[currentVideoId];
        $(elementiRi).addClass('current');
}

var videoIDs = [
        'SzsDHtzx6tI'
    ];

var player, currentVideoId = 0;

var socket = io.connect('http://localhost');
  socket.on('videos', function(data) {
    var titulli = data;

      var vId=data;
    $.getJSON('http://gdata.youtube.com/feeds/api/videos/'+vId+'?v=2&alt=jsonc',function(data,status,xhr){
         $('#uservideos').append('<li id="'+ vId +'"> ' + data.data.title + '</li>');

    });

    videoIDs.push(data);
});

socket.on('volume', function(data) {
    var vol = data;
    player.setVolume(vol);
});

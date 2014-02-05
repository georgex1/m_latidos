var filePaht_ = '';
//var songName = 'Bacon_Pancakes.mp3';
var songName = 'Bacon_Pancakes.wav';

var file = 'http://www.thepastoapps.com/proyectos/georgex/'+songName;

document.addEventListener("deviceready", startup, false);

function startup(){
    console.log('entro a startup');
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    
    setTimeout(function(){
        $.get(filePaht_+'/'+songName).done(function(){
            $('#alert').html('el mp3 ya ha sido descargado');
            $('#audio source').attr('src', filePaht_+'/'+songName);
            $('#rep').html('<audio id="audio" controls="controls">\
                <source src="'+filePaht_+'/'+songName+'" type="audio/mp3" />\
            </audio>');
        });
    }, 100);
}

function gotFS(fileSystem) {
    console.log("got filesystem");
    filePaht_ = fileSystem.root.fullPath;
    console.log('File Path: '+filePaht_);
}
function fail(){
    console.log('fail to get filepath');
}

function downloadFile(){
    $('#alert').html('descargando...');
    //var fileTransfer = new FileTransfer();
    var uri = encodeURI(file);
    var ft = new FileTransfer();
    ft.download(
        uri,
        filePaht_+'/'+songName,
        function(entry) {
            console.log("download complete: " + entry.fullPath);
            $('#alert').html('descarga completa');
            
            $('#rep').html('<audio id="audio" controls="controls">\
                <source src="'+filePaht_+'/'+songName+'" type="audio/mp3" />\
            </audio>');
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
        }
    );
    
    $('#statusUpdV').html('Loading ..');
    ft.onprogress = function(progressEvent) {
        if (progressEvent.lengthComputable) {
            var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
            $('#statusUpdV').html(perc + "% loaded...");
        } else {
            if($('#statusUpdV').html("")) {
                $('#statusUpdV').html("Loading");
            } else {
                $('#statusUpdV').append(".");
            }
        }
    }

    $('#statusUpdV').html('');
    // not exists code
}




// Audio player
//
var my_media = null;
var mediaTimer = null;

// Play audio
//
function playAudio() {
    
    //if (!my_media) {
    
    src = filePaht_+'/'+songName;
    // Create Media object from src
    my_media = new Media(src, onSuccess, onError);

    // Play audio
    my_media.play();
    $('#playAudio').hide();
    $('#pauseAudio').show();
    // Update my_media position every second
    if (mediaTimer == null) {
        mediaTimer = setInterval(function() {
            // get my_media position
            my_media.getCurrentPosition(
                // success callback
                function(position) {
                    if (position > -1) {
                        setAudioPosition((position) + " sec");
                    }
                },
                // error callback
                function(e) {
                    console.log("Error getting pos=" + e);
                    setAudioPosition("Error: " + e);
                }
            );
        }, 1000);
    }
    //}
}

// Pause audio
//
function pauseAudio() {
    if (my_media) {
        $('#playAudio').show();
        $('#pauseAudio').hide();
        my_media.pause();
    }
}

// Stop audio
//
function stopAudio() {
    if (my_media) {
        $('#playAudio').show();
        $('#pauseAudio').hide();
        my_media.stop();
    }
    clearInterval(mediaTimer);
    mediaTimer = null;
}

// onSuccess Callback
//
function onSuccess() {
    console.log("playAudio():Audio Success");
}

// onError Callback
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

// Set audio position
//
function setAudioPosition(position) {
    document.getElementById('audio_position').innerHTML = position;
}



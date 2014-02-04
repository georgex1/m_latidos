var filePaht_ = '';
var file = 'http://www.thepastoapps.com/proyectos/georgex/Bacon_Pancakes.mp3';

document.addEventListener("deviceready", startup, false);

function startup(){
    console.log('entro a startup');
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    
    setTimeout(function(){
        $.get(filePaht_+'/Bacon_Pancakes.mp3').done(function(){
            $('#alert').html('el mp3 ya ha sido descargado');
            $('#audio source').attr('src', filePaht_+'/Bacon_Pancakes.mp3');
            $('#rep').html('<audio id="audio" controls="controls">\
                <source src="'+filePaht_+'/Bacon_Pancakes.mp3" type="audio/mp3" />\
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
    var fileTransfer = new FileTransfer();
    var uri = encodeURI(file);
    fileTransfer.download(
        uri,
        filePaht_+'/Bacon_Pancakes.mp3',
        function(entry) {
            console.log("download complete: " + entry.fullPath);
            $('#alert').html('descarga completa');
            
            $('#rep').html('<audio id="audio" controls="controls">\
                <source src="'+filePaht_+'/Bacon_Pancakes.mp3" type="audio/mp3" />\
            </audio>');
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
        }
    );
    // not exists code
}
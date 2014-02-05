var buttomDom;
var statusDom;
var fileSystem;

document.addEventListener('deviceready', deviceready, false);

function deviceready() {
    $('#logP').html('dv ready');
  
    //step one is to request a file system    
    
    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
        function(fs) {
            fileSystem = fs;
            $('#logP').html('fileSystem: ' + fileSystem);
            //buttonDom = document.querySelector('#startDl');
            //buttonDom.addEventListener('touchend', startDl, false);
            //buttonDom.removeAttribute("disabled");
    
            //statusDom = document.querySelector('#status');
        }, function(e) {
            alert('failed to get fs');
            alert(JSON.stringify(e));
        });
}

function startDl() {
    
    $('#status').html('Iniciando descarga...') ;
    
    var ft = new FileTransfer();
    var uri = encodeURI("http://archive.org/download/Kansas_Joe_Memphis_Minnie-When_Levee_Breaks/Kansas_Joe_and_Memphis_Minnie-When_the_Levee_Breaks.mp3");

    var downloadPath = fileSystem.root.fullPath + "/download.mp3";
    
    $('#logP').html('downloadPath: '+downloadPath);
    $('#logP').html('iniciando progreso descarga');
    
    ft.onprogress = function(progressEvent) {
        if (progressEvent.lengthComputable) {
            var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
            $('#status').html(perc + "% loaded...") ;
        } else {
            if($('#status').html() == "") {
                $('#status').html('loading..') ;
            } else {
                $('#status').append('.');
            }
        }
    };
    
    $('#logP').html('iniciando descarga');
    ft.download(uri, downloadPath, 
    function(entry) {
        $('#logP').html('descarga completada');
        $('#status').html('') ;
        var media = new Media(entry.fullPath, null, function(e) { alert(JSON.stringify(e));});
        media.play();
        
    }, 
    function(error) {
        alert('Crap something went wrong...');    
    });
        
    
}

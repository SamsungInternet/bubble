var passedUrl = '';
var peer = null;
var tconn = '';

document.addEventListener('DOMContentLoaded', function() {
    var ext_res = getUrlParameter('pic');
    if(ext_res != ''){
        var fs = document.getElementById('fileSelector');
        var bm = document.getElementById('btnMenu');
        fs.style.animationName="minimize";
        bm.style.display = 'block';
        createImage(ext_res, true);
    }
    init();
});

function init(){
    peer = new Peer({key: 'bw0dbyumsbz3q5mi'});

    var uploadBtn = document.getElementById('selectButton'),
        fileElem = document.getElementById('fileSelection'),
        btnEllipsis = document.getElementById('btnMenu');

    btnEllipsis.addEventListener('click', function(){
         var fs = document.getElementById('fileSelector');
         var bm = document.getElementById('btnMenu');
        fs.style.animationName='maximize';
        bm.style.display = 'none';
    });

    uploadBtn.addEventListener('click', function (e) {
        var fs = document.getElementById('fileSelector');
        var bm = document.getElementById('btnMenu');

        fs.style.animationName = 'minimize';
        bm.style.display = 'block';

        if (fileElem) {
            fileElem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
        }, false);
}

//handles the file selection form the device
function handleFiles(files){
    if (!files.length) {
        console.log('no file found');
    } else {
        createImage(files[0], false);
    }
}

//creates the aframe structure that holds the sky inside the scene.
//can work with a create url from a file from the device or with "isExternal" to target a url 
function createImage(url, isExternal){
    var placeHolder = document.getElementById('virtualArea');
    placeHolder.innerHTML= "<div class='loadText'>your image is loading</div>"; //must update to change the texture instead
    var img = document.createElement('img');
    img.setAttribute('id', 'texture')
    img.src = (isExternal)?url:window.URL.createObjectURL(url);
    img.onload = function() {
        
        var sky = document.createElement('a-sky');
        var scene = document.createElement('a-scene');
        var assets = document.createElement('a-assets');
        virtualPlaceholder = document.getElementById('virtualArea');
        virtualPlaceholder.innerHTML = "";

        assets.appendChild(img);
        sky.setAttribute('src', '#texture');
        scene.appendChild(assets);
        scene.appendChild(sky);
        virtualPlaceholder.appendChild(scene);

        if(!isExternal)
            window.URL.revokeObjectURL(this.src);
    }
}

/* INSTANT SHARE */

//transforms image to data
var getCurrentImageData = function(){
    var cnv = document.createElement('canvas');
    cnv.setAttribute('width', '4096');
    cnv.setAttribute('height', '4096');
    var ctx = cnv.getContext('2d');
    //uses image loaded in skybox
    var img = document.getElementById('texture');
    ctx.drawImage(img, 0, 0, 4096, 4096);
    var imgData = ctx.getImageData();
    return imgData;
};

var startPeer = function(){
    peer = new Peer({key: 'bw0dbyumsbz3q5mi'});
    peer.on('open', function(id) {
        document.getElementById('peerId').innerText = id;
    });
        
    //wait for conn on second peer
    peer.on('connection', function(conn) {

        console.log('receiving connection from ' + conn.peer);
        tconn = peer.connect(conn.peer);
        tconn.send('gotcha');

        conn.on('open'), function(){
            console.log('opened a conn');
        };

        conn.on('data', function(data){
            console.log('received: ' + data);
        });
    });
}

var send = function(conn, msg){
    conn.send(msg);
};



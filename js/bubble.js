var passedUrl = '';
var peer = null;
var conn = null;
var conns = [];
var imgDataToSend = [];

document.addEventListener('DOMContentLoaded', function() {
    var ext_res = getUrlParameter('pic');
    if(ext_res != ''){
        var fs = document.getElementById('fileSelector');
        var bm = document.getElementById('btnEllipsis');
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
        btnEllipsis = document.getElementById('btnEllipsis');

    var shareBtn = document.getElementById('shareButton');
    // shareBtn.addEventListener('click', function (e){
    //      imgDataToSend = getCurrentImageData();
    //      startPeer();
    //});

    btnEllipsis.addEventListener('click', function(){
         var fs = document.getElementById('fileSelector');
         var bm = document.getElementById('btnEllipsis');
        if(fs.style.animationName=='minimize')
            fs.style.animationName='maximize';
        else
            fs.style.animationName='minimize';

        //bm.style.display = 'none';
    });

    uploadBtn.addEventListener('click', function (e) {
        var fs = document.getElementById('fileSelector');
        //var bm = document.getElementById('btnEllipsis');

        fs.style.animationName = 'minimize';
        //bm.style.display = 'block';

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
    var imgData = ctx.getImageData(0,0,4096,4096);
    return imgData;
};

var startPeer = function(){
    
    peer = new Peer({key: 'bw0dbyumsbz3q5mi'});
    peer.on('open', function(id) {
        document.getElementById('peerId').innerText = 'bubble.pictures/share.html?id='+id;
        document.getElementById('shareBtnText').innerText = 'share this link:';

    });

    peer.on('connection', function(con){
        conns.push(con.peer);
        
        con.on('open', function(){
            con.send(imgDataToSend.data);
            console.log('incoming connection from '+ con.peer);
        });
        
        con.on('data', function(data){
            console.log('in: ' + data);
            con.send('received ' + peer.id);
        });
        
    });
};



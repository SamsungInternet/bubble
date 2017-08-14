var peer = null;
conn = null;
var iData = null;
document.addEventListener('DOMContentLoaded', function() {
    var peerid = getUrlParameter('id');
    peer = new Peer({key: 'bw0dbyumsbz3q5mi'});
    conn = peer.connect(peerid);
    conn.on('data', function(data){
        console.log('in: ' + data );
        iData = new Uint8ClampedArray(data);
        reconstructImage(iData, 4096, 4096);
    });
    //conn.send('HELLO WORLD');
});

var reconstructImage = function(data, width, height){
    console.log('reconstructing image')
    var imgData = new ImageData(data, width, height);

    var cnv = document.createElement('canvas');
    cnv.setAttribute('width', 4096);
    cnv.setAttribute('height', 4096);
    cnv.setAttribute('crossorigin', 'anonymous');
    var ctx = cnv.getContext('2d');
    ctx.putImageData(imgData, 0, 0);
    var dataUrl = cnv.toDataURL();
    var fimg = document.createElement('img');
    fimg.setAttribute('id', 'texture')
    fimg.src = dataUrl;

    fimg.onload = function() {
        var sky = document.createElement('a-sky');
        var scene = document.createElement('a-scene');
        var assets = document.createElement('a-assets');
        virtualPlaceholder = document.getElementById('virtualArea');
        virtualPlaceholder.innerHTML = "";

        assets.appendChild(fimg);
        sky.setAttribute('src', '#texture');
        scene.appendChild(assets);
        scene.appendChild(sky);
        virtualPlaceholder.appendChild(scene);
    }
};


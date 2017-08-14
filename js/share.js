var peer = null;
conn = null;
document.addEventListener('DOMContentLoaded', function() {
    var peerid = getUrlParameter('id');
    peer = new Peer({key: 'bw0dbyumsbz3q5mi'});
    conn = peer.connect(peerid);
    conn.on('data', function(data){
        console.log('in: ' + data );
        reconstructImage(data, 4096, 4096);
    });
    //conn.send('HELLO WORLD');
});

var reconstructImage = function(data, width, height){
    console.log('reconstructing image')
    //var imgData = new ImageData(data, width, height);
};


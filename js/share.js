var peer = null;
conn = null;
document.addEventListener('DOMContentLoaded', function() {
    var peerid = getUrlParameter('id');
    peer = new Peer({key: 'bw0dbyumsbz3q5mi'});
    conn = peer.connect(peerid);
    conn.on('data', function(data){
        console.log('received: ' + data );
    });
    conn.send('HELLO WORLD');
});


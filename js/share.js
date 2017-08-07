var peer2 = null;
c = null;
document.addEventListener('DOMContentLoaded', function() {
    var peerid = getUrlParameter('id');
    if(peerid != ''){
        peer2 = new Peer({key: 'bw0dbyumsbz3q5mi'});
        c = peer2.connect(peerid);
        c.on('data', function(data){
            console.log('received: ' + data);

            peer2.on('connection', function(conn) {

                console.log('receiving connection from ' + conn.peer);

                conn.on('open'), function(){
                    console.log('opened a conn');
                };

                conn.on('data', function(data){
                    console.log('received: ' + data);
                });
            });
        });
        
    }
});

var send = function(conn, msg){
    conn.send(msg);
};
document.addEventListener('DOMContentLoaded', function() {
    var g_scene = document.querySelector('a-scene');

    g_scene.addEventListener('loaded', function() {
        console.log('loaded scene');
        deviceDetection();
    });    
});


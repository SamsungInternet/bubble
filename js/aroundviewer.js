var passedUrl = '';

document.addEventListener('DOMContentLoaded', function() {
    var ext_res = getUrlParameter('pic');
    if(ext_res != ''){
        var fs = document.getElementById('fileSelector');
        
        fs.style.animationName="minimize";
        
        createImage(ext_res, true);
    }
    init();
});


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

function init(){
    var uploadBtn = document.getElementById('selectButton'),
        fileElem = document.getElementById('fileSelection'),
        btnEllipsis = document.getElementById('btnMenu');

    btnEllipsis.addEventListener('click', function(){
         var fs = document.getElementById('fileSelector');
         var bm = document.getElementById('btnMenu');
        fs.style.animationName='maximize';
        bm.style.display = 'none';
    });

    uploadBtn.addEventListener("click", function (e) {
        var fs = document.getElementById('fileSelector');
        var bm = document.getElementById('btnMenu');

        fs.style.animationName = "minimize";
        bm.style.display = 'block';

        if (fileElem) {
            fileElem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
        }, false);
}

//gets a query string parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
var filSelBtnState = false;
var passedUrl = '';

function handleFiles(files){
    if (!files.length) {
        
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
        fs.style.animationName="maximize";
    });

    uploadBtn.addEventListener("click", function (e) {
        var fs = document.getElementById('fileSelector');
        if(filSelBtnState)
            fs.style.animationName="maximize";
        else
            fs.style.animationName="minimize";
        filSelBtnState = !filSelBtnState;

        if (fileElem && filSelBtnState) {
            fileElem.click();
        }
        e.preventDefault(); // prevent navigation to "#"
        }, false);
}

document.addEventListener('DOMContentLoaded', function() {
    var ext_res = getUrlParameter('pic');
    if(ext_res != ''){
        var fs = document.getElementById('fileSelector');
        
        fs.style.animationName="minimize";
        
        createImage(ext_res, true);
    }
    init();
});

//gets a query string parameter
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};
var filSelBtnState = false;

function handleFiles(files){
    if (!files.length) {
        fileList.innerHTML = "<p>No files selected!</p>";
    } else {
        var placeHolder = document.getElementById('virtualArea');
        placeHolder.innerHTML= ""; //must update to change the texture instead
        var img = document.createElement('img');
        img.setAttribute('id', 'texture')
        img.src = window.URL.createObjectURL(files[0]);
        var skys = document.getElementsByTagName('a-sky');
        img.onload = function() {
           
            var sky = document.createElement('a-sky');
            var scene = document.createElement('a-scene');
            var assets = document.createElement('a-assets');
            var virtualPlaceholder = document.getElementById('virtualArea');

            assets.appendChild(img);
            sky.setAttribute('src', '#texture');
            scene.appendChild(assets);
            scene.appendChild(sky);
            virtualPlaceholder.appendChild(scene);

            window.URL.revokeObjectURL(this.src);
        }
        document.body.appendChild(img);
    }
}

function init(){
    var uploadBtn = document.getElementById("selectButton"),
        fileElem = document.getElementById("fileSelection");

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

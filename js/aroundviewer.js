function handleFiles(fileNames){
    console.log(fileNames);
    
    var createdImage = new Image();
    createdImage.src = fileNames[0].name;

    var myImage = document.getElementById('myimage');
    
    myImage.src = fileNames[0].name;
}
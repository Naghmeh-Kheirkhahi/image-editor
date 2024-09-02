const chooseImage = document.getElementById('chooseImage');
const saveImage = document.getElementById('saveImage');
const displayImage = document.getElementById('displayImage');
const displayImgDiv = document.getElementById('displayImgDiv');
const imgBtnDiv = document.getElementById('imgBtnDiv');
let filterName = document.getElementById('filterName');
let myInput = document.getElementById('myInput');
const rangeInput = document.getElementById('rangeInput');
let percent = document.getElementById('percent');
rangeInput.addEventListener('input' , rangeFilter);



function uploadImage(){
        let clickEvent = new MouseEvent("click", {
            "view": window, "bubbles": true, "cancelable": false
    });
        document.getElementById("myInput").dispatchEvent(clickEvent);
}

function loadImage(){
    let file = myInput.files[0]; 
    if (file) {
        displayImage.src = URL.createObjectURL(file);
        displayImage.style.display = 'flex';
        displayImgDiv.style.border = 'none';
        displayImgDiv.style.backgroundColor = 'white';
        imgBtnDiv.style.margin = '4% 0 4% 41%';
    }
}


    function downloadImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext ('2d');
    canvas.width = displayImage.naturalWidth;
    canvas.height = displayImage.naturalHeight;


    ctx.filter = `brightness(${brightnessValue}%) saturate(${saturationValue}%) invert(${inversionValue}%) grayscale(${grayscaleValue}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotateValue !== 0) {
        ctx.rotate(rotateValue * Math.PI / 180);
    }
    ctx.scale(flipHoriValue , flipVerValue);
    ctx.drawImage(displayImage, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

    const link = document.createElement('a');
    link.download = 'image.jpg';
    link.href = canvas.toDataURL();
    link.click();

}



function brightnessFunction(){
    filterName.innerHTML = 'Brightness'
}

function saturationFunction(){
    filterName.innerHTML = 'Saturation'
}

function inversionFunction(){
    filterName.innerHTML = 'Inversion'
}

function grayscaleFunction(){
    filterName.innerHTML = 'Grayscale'
}


let brightnessValue = 100;
let saturationValue = 100;
let inversionValue = 0;
let grayscaleValue = 0;

function rangeFilter(){
    let value = rangeInput.value;

    if (filterName.innerHTML === 'Brightness') {
        brightnessValue = value;
        percent.innerHTML = value;
        percent.innerHTML = percent.innerHTML + '%';
        updateTransform();
    }
    else if (filterName.innerHTML === 'Saturation') {
        saturationValue = value;
        percent.innerHTML = value;
        percent.innerHTML = percent.innerHTML + '%';
        updateTransform();
    }
    else if (filterName.innerHTML === 'Inversion') {
        inversionValue = value;
        percent.innerHTML = value;
        percent.innerHTML = percent.innerHTML + '%';
        updateTransform();
    }
    else if (filterName.innerHTML === 'Grayscale') {
        grayscaleValue = value;
        percent.innerHTML = value;
        percent.innerHTML = percent.innerHTML + '%';
        updateTransform();
    }
}


let rotateValue = 0;

function rotateLeft(){
    rotateValue = rotateValue - 90;
    updateTransform();
}

function rotateRight(){
    rotateValue = rotateValue + 90;
    updateTransform();
}

function updateTransform(){
    displayImage.style.transform = `rotate(${rotateValue}deg) scale(${flipHoriValue} , ${flipVerValue})`;
    displayImage.style.filter = `brightness(${brightnessValue}%) saturate(${saturationValue}%) invert(${inversionValue}%) grayscale(${grayscaleValue}%)`;
}


let flipVerValue = 1;
let flipHoriValue = 1;

function flipHerizontal(){
    if (flipHoriValue === 1) {
        flipHoriValue = -1;
    }
    else{
        flipHoriValue = 1;
    }
    updateTransform();
}

function flipVertical(){
    if (flipVerValue === 1) {
        flipVerValue = -1;
    }
    else{
        flipVerValue = 1;
    }
    updateTransform();
}




function resetFilters(){
    filterName.innerHTML = 'Brightness'
    displayImage.style.filter = 'none';
    displayImage.style.transform = 'none';
    rotateValue = 0;
    flipVerValue = 1;
    flipHoriValue = 1;
    brightnessValue = 100;
    saturationValue = 100;
    inversionValue = 0;
    grayscaleValue = 0;
}

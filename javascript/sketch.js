let img;
let newImg;
let a = new ImageProcess();
let data;

function preload() {
    img = loadImage("../resources/dog_1.jpg");
}

function setup() {
    createCanvas(img.width, img.height);
    background(51);

    // img = ImageProcess.operate(img, a.filter4, 1)
    data = ImageProcess.hitogram(img);
    image(img, 0, 0);

    let r = new graph("chartContainer", "Histogram", "Brightness", "Value", data);
    r.initialise();
}

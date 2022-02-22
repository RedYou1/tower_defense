let lol;
let img;
let te = [];
let g = true;
let canvas;
let savefile;

function setup() {
  canvas = createCanvas(700, 520);
  lol = createFileInput(handleFile);
  savefile = createButton('save');
  savefile.mousePressed(savegame);
}

function draw() {
  background(220);
  if (img) {
    image(img, 0, 0);

    let d = 10;
    if(te.length > 0) {
      circle(te[0][0],te[0][1],d);
      if(te.length > 1) {
        for (let i = 1; i < te.length; i++) {
          circle(te[i][0], te[i][1], d);
          line(te[i - 1][0], te[i - 1][1], te[i][0], te[i][1]);
        }
      }
    }
  }
}

function keyPressed(){
  te.pop();
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data, '');
    img.hide();
  } else {
    img = null;
  }
}

function mousePressed(){
  if(img) {
    te.push([mouseX, mouseY]);
  }
}

function savegame(){
  let hol = [];
  for(let i = 0 ; i < te.length; i ++){
    let j = te[i];
    hol.push(j[0]+','+j[1]);
  }
  saveStrings(hol,"nodes.txt");
}
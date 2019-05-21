// Animation request
let requestId;
// Canvas and context
let canvas;
let ctx;
let canvasWidth = 500;
let canvasHeight = 100;
// Floors
let floors = {
  floor1 : 0,
  floor2 : canvasHeight * 1 / 4,
  floor3 : canvasHeight * 2 / 4,
  floor4 : canvasHeight * 3 / 4
}
// Keys
let Keys = {
  // up : false,
  // down : false,
  left : false,
  right : false
}
// Keys Listener 
window.onkeydown = function(e) {
  let kc = e.keyCode;
  e.preventDefault();

  if      (kc === 37) Keys.left = true; 
  // else if (kc === 38) Keys.up = true;    
  else if (kc === 39) Keys.right = true;
  // else if (kc === 40) Keys.down = true;
};

window.onkeyup = function(e) {
  let kc = e.keyCode;
  e.preventDefault();

  if      (kc === 37) Keys.left = false;
  // else if (kc === 38) Keys.up = false;
  else if (kc === 39) Keys.right = false;
  // else if (kc === 40) Keys.down = false;
};
// SpriteSheets and SpriteData variables
let spritesheet = new Image();
spritesheet.src = '../img/conrad_alpha_back.png';
let spritesheet_mono = new Image();
spritesheet_mono.src = '../img/walk.png';
let spritedata = [
  { x: 19, y: 49, w: 10, h: 39 },
  { x: 35, y: 50, w: 15, h: 38 },
  { x: 59, y: 50, w: 22, h: 38 },
  { x: 87, y: 50, w: 20, h: 38 },
  { x: 114, y: 49, w: 17, h: 39 },
  { x: 141, y: 49, w: 11, h: 39 },
  { x: 163, y: 49, w: 9, h: 39 },
  { x: 180, y: 50, w: 17, h: 38 },
  { x: 203, y: 50, w: 21, h: 38 },
  { x: 229, y: 51, w: 20, h: 37 },
  { x: 255, y: 50, w: 16, h: 38 },
  { x: 279, y: 50, w: 11, h: 38 }
];
let spritedata_back = [
  {x: 571, y: 49, w: 10, h: 39},
  {x: 550, y: 50, w: 15, h: 38},
  {x: 519, y: 50, w: 22, h: 38},
  {x: 493, y: 50, w: 20, h: 38},
  {x: 469, y: 49, w: 17, h: 39},
  {x: 448, y: 49, w: 11, h: 39},
  {x: 428, y: 49, w: 9, h: 39},
  {x: 403, y: 50, w: 17, h: 38},
  {x: 376, y: 50, w: 21, h: 38},
  {x: 351, y: 51, w: 20, h: 37},
  {x: 329, y: 50, w: 16, h: 38},
  {x: 310, y: 50, w: 11, h: 38}
];
let walk_right = [
  {x:13, y:12, w:11, h:49},
  {x:33, y:12, w:20, h:49},
  {x:62, y:12, w:29, h:48},
  {x:98, y:12, w:26, h:48},
  {x:132, y:12, w:21, h:49},
  {x:165, y:12, w:15, h:49}
];
let walk_left = [
  {x:368, y:12, w:11, h:49},
  {x:339, y:12, w:20, h:49},
  {x:301, y:12, w:29, h:48},
  {x:268, y:12, w:26, h:48},
  {x:239, y:12, w:21, h:49},
  {x:212, y:12, w:15, h:49}
];

// Instatiates a Character
let conrad_character_01;
let conrad_character_02;
let conrad_character_03;
let conrad_character_04;
let conrad_character_05;

let characterSprites;
// Sets SpriteSheets and SpriteData
function preload() {
  spritesheet = new Image();
  spritesheet.src = '../img/conrad.png';
}

// Sets canvas and context
function setup() {
  canvas = document.getElementById('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx = canvas.getContext('2d');
}

// Starts animation
function start() {
  setup();
  // preload();
  // getJSON();
}

function drawCharacters(charact) {
  charact.draw(ctx);
}

start();

//setInterval(function() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  drawCharacters(conrad_character_01);
  // drawCharacters(conrad_character_02);
  // drawCharacters(conrad_character_03);
  // drawCharacters(conrad_character_04);
  // drawCharacters(conrad_character_05);
}, 1000/12);

class character {
  constructor(speed, x, y) {
    this.scaleH = 1;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.frame_speed = 1;
    this.sprite_Sheet = spritesheet_mono;
    // this.sprite_Sheet = new Image(); 
    // this.sprite_Sheet.src = '../img/walk.png';
    this.sprite_Data = walk_right;
    this.index = 0;
    this.len = this.sprite_Data.length;
  }

  draw(ctx) {

    if(Keys.left){
      this.sprite_Data = walk_left;
      if(this.speed > 0) this.speed *= -1;
    }
    if(Keys.right){
      this.sprite_Data = walk_right;
      if(this.speed < 0) this.speed *= -1;
    }
    let i = this.index % this.len;
    let x = this.sprite_Data[i].x;
    let y = this.sprite_Data[i].y;
    let w = this.sprite_Data[i].w;
    let h = this.sprite_Data[i].h;

    ctx.drawImage(
      this.sprite_Sheet,
      x,
      y,
      w,
      h,
      this.x - w/2,
      this.y,
      w,
      h
    );

    this.animate();
  }

  animate() {
    this.index += this.frame_speed;
    if(this.x >= canvas.width){
      this.x = 0;
    } else if(this.x < 0){
      this.x = canvas.width;
    } 
    this.x += this.speed;
    /*
    if(this.x >= canvas.width || this.x < 0){
      this.speed *= -1; 
      this.x += this.speed;
    }
    if(this.speed < 0){
      this.sprite_Data = spritedata_back;
    } else {
      this.sprite_Data = spritedata;
    }
    */
  }
}

conrad_character_01 = new character(2, 30, 50);
// conrad_character_02 = new character(3, 30, 55);
// conrad_character_03 = new character(1, 30, 105);
// conrad_character_04 = new character(5, 30, 155);
// conrad_character_05 = new character(2, 30, 205);



/*
// Loads JSON local file
function loadJSON(callback) {
  let xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', '../img/conrad.json', true); // Replace 'appDataServices' with the path to your file
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == '200') {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function getJSON() {
  loadJSON(function(response) {
    let actual_JSON = JSON.parse(response);
    //console.log(actual_JSON.walk[0].position);
    let objectKeys = Object.keys(actual_JSON);
    console.log(actual_JSON.walk.length);
    for (i = 0; i < actual_JSON.walk.length; i++) {
      let data = actual_JSON.walk[i];
      console.log('x = ' + data.position.x);
      let x = data.position.x;
      console.log('y = ' + data.position.y);
      let y = data.position.y;
      console.log('w = ' + data.position.w);
      let w = data.position.w;
      console.log('h = ' + data.position.h);
      let h = data.position.h;
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(spritesheet, x, y, w, h, 0, 0, w, h);
      let imageData = ctx.getImageData(0, 0, w, h);
      //characterSprites.push(canvas.toDataURL());
      characterSprites.push(imageData);
      console.log('Number sprites :' + characterSprites.length);
    }

    console.log('Numero de Sprites : ' + characterSprites.length);
    conrad_character = new character(1, 100, 100, characterSprites);
    console.log(objectKeys[0]);
    console.log(objectKeys[0].length);
    console.log(objectKeys[0].position);
    let imagesArray = [];
    // for(data in actual_JSON){
    //   console.log(data);
    // }

    console.log(Object.keys(actual_JSON));
    console.log(actual_JSON.walk.length);
    // for(let i = 0; i < actual_JSON.length; i++){
    //   console.log(actual_JSON[i]);
    // }
    console.log(actual_JSON);
    // drawSprites(conrad_character);
  });
  canvasWidth = 600;
  canvasHeight = 600;
  setup();
  // console.log(actual_JSON);
  // return actual_JSON;
}
*/

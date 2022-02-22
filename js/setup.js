let mymap;

let dartssprite;
let shurikensprite;
let spikes = [];

let lives = 100;
let money = 650;

const RBE = 1;

let rounds = [];
let yourround = -1;
let currentround;

let maps = [];
let dificulty;
let gamespeed = 0;
let fusc = false;

let sx = 1;
let sy = 1;

let statictowers = [];
let towers = [];
let selected = null;
let darts = [];
let selected2 = null;

let abilities = [];

let playbut = [];
let bananes=[];
let dept=0;
let boosts=[];

let towertypes = {
    primaire:"primaire",
    militaire:"militaire",
    magique:"magique",
    support:"support"
}

const speeds = {
    pause:0,
    normal:1,
    fast:2
}

let maxupgrade;

const damagetype = {
    explosions:"explosions",
    fire:"fire",
    energy:"energy",
    plasma:"plasma",
    freezing:"freezing",
    darts:"darts",
    null:"null"
}

const dificulties = {
    sandbox:-1,
    easy:0,
    medium:1,
    hard:2,
    impossible:3
}

const basicprios = [
    ["First",function(balloon,a){return balloon.node < a.node}],
    ["Strong",function(balloon,a){return getstaticbloonindex(balloon.bal.name) < getstaticbloonindex(a.bal.name)}],
    ["Last",function(balloon,a){return balloon.node > a.node}],
    ["Close",function(balloon,a,x,y){return dist(balloon.x,balloon.y,x,y) > dist(a.x,a.y,x,y);}]
]

function preload(){
    for(let i = 0; i < 2; i++){
        let s = "maps/"+i;
        maps.push(FileToMap(s));
    }

    for(let i = 1; i <= 10; i++){
        spikes[i] = loadImage('sprites/spikes/'+i+'.png');
    }

    shurikensprite = loadImage('sprites/shuriken.png');
    dartssprite = loadImage('sprites/darts.png');

    maxupgrade = loadImage('sprites/maxupgrade.png');

    bloonssprites();
    pageinit();
    upgradepage.x=0;
}

function setup(){
    bloonsinit();
    getrounds();
    createCanvas(1200,700);
}
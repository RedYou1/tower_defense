class Page{
    constructor(name,buttons) {
        this.name = name;
        this.buttons = buttons;
        this.draw = function(){
            background(255);
            text("no draw function in "+this.name,60*sx,350*sy);
        }
    }
}
class Button{
    constructor(x,y,w,h,name) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.name = name;
        this.draw = function(){
            rect(this.x*sx,this.y*sy,this.w*sx,this.h*sy);
            text(this.name,this.x*sx,this.y*sy,this.w*sx+this.x*sx,this.h*sy+this.y*sy);
        }
        this.mousePressed = function(){

        }
        this.mouseDown = function(){

        }
        this.mouseReleased = function(){

        }
        this.mouseHover = function(){

        }
        this.checkin = function(x,y){
            return this.x <= x && this.x+this.w >= x && this.y <= y && this.y+this.h >= y;
        }
    }
}

class statictower{
    constructor(name,w,h,r,speed,sprite,cost,sol,type){
        this.name = name;
        this.sol = sol;
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.sprite = sprite;
        this.cost = cost;
        this.type = type;
        this.camo = false;
        this.levelingup = function(wich){
            if(wich[0]===1){
                this.upgrade[0][this.levels[0]].action(this);
                this.levels = [this.levels[0]+1,this.levels[1],this.levels[2]];
            }
            if(wich[1]===1){
                this.upgrade[1][this.levels[1]].action(this);
                this.levels = [this.levels[0],this.levels[1]+1,this.levels[2]];
            }
            if(wich[2]===1){
                this.upgrade[2][this.levels[2]].action(this);
                this.levels = [this.levels[0],this.levels[1],this.levels[2]+1];
            }
        }
        this.draw = function(){
            rotate(this.dir+Math.PI/2);
            image(this.sprite, -this.w/2*sx, -this.h/2*sy,this.w*sx,this.h*sy);
        }
        this.r = r;
        this.step = function(){
            if(this.tempspeed >= this.speed) {
                let balloon = bloonswithprio(this.x,this.y,this.r,this.prio,this.prios,this.camo);
                if (balloon != null) {
                    this.shoot(balloon);
                    this.shooted++;
                    if(this.shooted>=1000000000){this.shooted=0;}
                    this.tempspeed -= this.speed;
                }
            } else {
                this.tempspeed++;
            }
        }
        this.shoot = function(b){
            this.dir = getdir(this.x, this.y, b.x, b.y);
            let d = new Dart(this.x, this.y, this.dir, this.dart, this);
            darts.push(d);
        }
        this.init = function(mon){

        }
    }
}
class Tower{
    constructor(x,y,tower) {
        this.x = x;
        this.y = y;
        this.shooted = 0;
        this.tower = tower;
        this.w = tower.w;
        this.h = tower.h;
        this.levelingup = tower.levelingup;
        this.r = tower.r;
        this.step = tower.step;
        this.shoot = tower.shoot;
        this.speed = tower.speed;
        this.tempspeed = 0;
        this.sprite = tower.sprite;
        this.levels = [0,0,0];
        this.upgrade = tower.levels;
        this.type = tower.type;
        this.tdraw = tower.draw;
        this.prio = 0;
        this.prios = [basicprios[0],basicprios[1],basicprios[2],basicprios[3]];
        this.dart = new DartsContainer(tower.dart.speed,tower.dart.type,tower.dart.dam,tower.dart.sprite,tower.dart.w,tower.dart.h,tower.dart.turn,tower.dart.lives);
        if(tower.dart.effects!==undefined){
            this.dart.effects = [];
            let ef = this.dart.effects;
            tower.dart.effects.forEach(function(a){
                ef.push(a);
            })
        }
        this.dart.step = tower.dart.step;
        this.camo = tower.camo;
        this.damcont = 0;
        this.totalmoney = cost(tower.cost);
        tower.init(this);
    }
    draw(){
        push();
        translate(this.x*sx,this.y*sy);
        this.tdraw();
        pop();
    }
}

class staticballoon{
    constructor(normsprit,camosprit,regensprit,camoregensprit,fortsprit,fortcamosprit,fortregensprit,fortregencamosprit,w,h,name,resist,hp,speed,childs,gain){
        this.name = name;
        this.w = w;
        this.h = h;
        this.resist = resist;
        this.hp = hp;
        this.speed = speed;
        this.camo = false;
        this.childs = childs;
        this.gain = gain;
        this.fort = false;
        this.moab=false;
        this.normsprit = normsprit;
        this.camosprit = camosprit;
        this.regensprit = regensprit;
        this.camoregensprit = camoregensprit;
        this.fortsprit = fortsprit;
        this.fortcamosprit = fortcamosprit;
        this.fortregensprit = fortregensprit;
        this.fortregencamosprit = fortregencamosprit;
        this.regen = function(){
            return false;
        };
        this.draw = function(){
            let regen = this.regen();
            let camo = this.camo;
            let fort = this.fort;
            let img;
            if(this.fortsprit!==null){
                if(regen){
                    if(camo){
                        if(fort){
                            img = this.fortregencamosprit;
                        } else {
                            img = this.camoregensprit;
                        }
                    } else {
                        if(fort){
                            img = this.fortregensprit;
                        } else {
                            img = this.regensprit;
                        }
                    }
                } else {
                    if(camo){
                        if(fort){
                            img = this.fortcamosprit;
                        } else {
                            img = this.camosprit;
                        }
                    } else {
                        if(fort){
                            img = this.fortsprit;
                        } else {
                            img = this.normsprit;
                        }
                    }
                }
            } else {
                if (regen) {
                    if (camo) {
                        img = this.camoregensprit;
                    } else {
                        img = this.regensprit;
                    }
                } else {
                    if (camo) {
                        img = this.camosprit;
                    } else {
                        img = this.normsprit;
                    }
                }
            }
            image(img, -this.w / 2 * sx, -this.h / 2 * sy, this.w * sx, this.h * sy);
        }
        this.hitted = function(dart,damage){
            if(!iteminlist(dart.id,this.darts)||dart==="void") {
                if (iteminlist(dart.type,this.bal.resist)) {
                    return "resisted"
                } else {
                    this.hp -= damage;
                    if(dart!=="void"&&dart.stower.tower.name!=="factory"&&dart.stower.tower.name!=="spike"){
                        this.darts.push(dart.id);
                    }
                    if (this.hp <= 0) {
                        let temp = damage+this.hp;
                        if (this.childs.length > 0) {
                            let p = (this.hp * -1);
                            let rest = p%this.childs.length;
                            p-=rest;
                            let h = p / this.childs.length;
                            let x = this.x;
                            let y = this.y;
                            let regen = this.regen;
                            let camo = this.camo;
                            let fort = this.fort;
                            let node = this.node;
                            let darts = this.darts;
                            let effe = this.effects;
                            let dir = this.dir;
                            this.childs.forEach(function (o) {
                                let bl = new ballon(x, y, o);
                                bl.regen = regen;
                                bl.camo = camo;
                                bl.fort = fort;
                                bl.node = node;
                                bl.darts = darts;
                                bl.dir = dir;

                                bl.effects=[]
                                effe.forEach(function(e){
                                    if(e.layer>0){
                                        bl.effects.push(new Effects(e.name,e.duration,e.layer-1,e.func,e.afunc));
                                    }
                                })

                                if(fort){bl.hp*=2;if(bl.bal.name==="lead"){bl.hp*=2}}
                                balloons.push(bl);
                                if(h+rest>0) {
                                    if (rest > 0) {
                                        temp += bl.hitted("void", h + 1);
                                        rest--;
                                    } else {
                                        temp += bl.hitted("void", h);
                                    }
                                }
                            });
                        }
                        earn(this.gain);
                        balloons.splice(getbloonsindex(this), 1);
                        return temp;
                    } else {
                        return damage;
                    }
                }
            }
            return "no";
        }
    }
}

class ballon{
    constructor(x,y,bal){
        this.x = x;
        this.y = y;
        this.tbal = bal;

        this.bal = new staticballoon(bal.normsprit,bal.camosprit,bal.regensprit,bal.camoregensprit,bal.fortsprit,bal.fortcamosprit,bal.fortregensprit,bal.fortregencamosprit,bal.w,bal.w,bal.name,bal.resist,bal.hp,bal.speed,duplicatelist(bal.childs),bal.gain);
        this.bal.camo = bal.camo;
        this.bal.hitted = bal.hitted;
        this.bal.speed = bal.speed;
        this.bal.fort = bal.fort;
        this.bal.regen = bal.regen;
        this.bal.bdraw = bal.draw;

        this.hitted = bal.hitted;
        this.speed = bal.speed;
        this.bspeed = bal.speed;
        this.camo = bal.camo;
        this.fort = bal.fort;
        this.regen = bal.regen;
        this.bdraw = bal.draw;
        this.effects = [];
        this.w = bal.w;
        this.h = bal.h;
        this.darts = [];
        this.gain = bal.gain;
        this.hp = bal.hp;
        this.childs = bal.childs;
        this.normsprit = bal.normsprit;
        this.camosprit = bal.camosprit;
        this.regensprit = bal.regensprit;
        this.camoregensprit = bal.camoregensprit;
        this.fortsprit = bal.fortsprit;
        this.fortcamosprit = bal.fortcamosprit;
        this.fortregensprit = bal.fortregensprit;
        this.fortregencamosprit = bal.fortregencamosprit;
        this.moab = bal.moab;
    }
    draw(){
        push();
        translate(this.x*sx,this.y*sy);
        this.bdraw();
        pop();
    }
    step(){
        if(this.node === mymap.nodes.length-1){
            lives--;
            balloons[getbloonsindex(this)].hitted("void",Infinity);
            if(lives<=0){
                selected2=null;
                rederect("main");
                let but = new Button(700,400,100,100,"you lose the map");
                page.buttons.push(but);
            }
            return;
        }
        let nextnode = mymap.nodes[this.node+1];
        let x2 = map(nextnode[0],0,mymap.width()-1,0,1199);
        let y2 = map(nextnode[1],0,mymap.heigth()-1,0,699);
        this.dir = getdir(this.x,this.y, x2,y2);
        this.x += this.speed * cos(this.dir);
        this.y += this.speed * sin(this.dir);
        if(dist(this.x,this.y,x2,y2) < this.speed){
            this.node++;
        }
    }
}

class mapclass{
    constructor(img,holder,nodes){
        this.img = img;
        this.holder = holder;
        this.nodes = nodes;
    }
    width(){
        return this.holder[0].length;
    }
    heigth(){
        return this.holder.length;
    }
    getsol(x,y){
        return this.holder[round(map(y, 0, 699, 0, mymap.heigth() - 1))][round(map(x, 0, 1199, 0, mymap.width() - 1))];
    }
}

class Dart{
    constructor(x,y,dir,dartcont,tower) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.tower = gettowerindex(tower);
        this.stower = tower;
        this.id = tower.tower.name+""+tower.damcont+""+tower.x+""+tower.y+""+dartcont.dam+""+tower.shooted;
        this.speed = dartcont.speed;
        this.type = dartcont.type;
        this.dam = dartcont.dam;
        this.effects=dartcont.effects;
        this.sprite = dartcont.sprite;
        this.w = dartcont.w;
        this.h = dartcont.h;
        this.turn = dartcont.turn;
        this.turning = 0
        this.lives = dartcont.lives;
        this.step = dartcont.step;
    }
    draw(){
        push();
        translate(this.x*sx,this.y*sy);
        rotate(this.dir+Math.PI/2+this.turning);
        image(this.sprite,-this.w/2*sx,-this.h/2*sy,this.w*sx,this.h*sy);
        if(this.turn){ this.turning += Math.PI/4;}
        pop();
    }
}

class Upgrade{
    constructor(name,sprite,description,cost,action) {
        this.name = name;
        this.sprite = sprite;
        this.description = description;
        this.cost = cost;
        this.action = action;
    }
}

class DartsContainer{
    constructor(speed,type,dam,sprite,w,h,turn,lives) {
        this.speed = speed;
        this.type = type;
        this.dam = dam;
        this.sprite = sprite;
        this.effects=[];
        this.w = w;
        this.h = h;
        this.turn = turn;
        this.lives = lives;
        this.step = function(){
            this.x += this.speed*cos(this.dir);
            this.y += this.speed*sin(this.dir);

            if(this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 700){
                darts.splice(getdartsindex(this),1);
            }
        }
    }
}

class Ability{
    constructor(name,sprite,cooldown,duration,func,afunc) {
        this.name = name;
        this.sprite = sprite;
        this.cooldown = cooldown;
        this.duration = duration;
        this.dremain = 0;
        this.remain = 0;
        this.func = func;
        this.afunc = afunc;
    }
}

class Boosts{
    constructor(name,func,afunc,tower) {
        this.name=name;
        this.func=func;
        this.afunc=afunc;
        this.tower = tower;
    }
}

class Effects{
    constructor(name,duration,layer,func,afunc) {
        this.name = name;
        this.duration = duration;
        this.func = func;
        this.afunc = afunc;
        this.layer = layer;
    }
}
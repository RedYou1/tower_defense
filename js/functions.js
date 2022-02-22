
function getpage(name){
    for(let i = 0; i < pages.length; i++){
        let a = pages[i];
        if(name.toUpperCase() === a.name.toUpperCase()){
            return a;
        }
    }
    return undefined;
}

function rederect(name){
    let t = getpage(name);
    if(t !== undefined){
        page = t;
    }
}

function mousePressed(){
    for(let i = 0; i < page.buttons.length; i++){
        let a = page.buttons[i];
        if(a.checkin(mouseX/sx,mouseY/sy)){
            if(a.mousePressed()){
                break;
            }
        }
    }

    if(selected2 != null){
        upgradepage.buttons.forEach(function(a){
            if(a.x <= mouseX/sx && a.x+a.w >= mouseX/sx && a.y <= mouseY/sy && a.y+a.h >= mouseY/sy){
                a.mousePressed();
            }
        });
    }

    let temp = null;
    towers.forEach(function(a){
        if(a.tower.name !== "spike" && a.x-a.tower.w/2 <= mouseX/sx && a.x+a.tower.w/2 >= mouseX/sx && a.y-a.tower.h/2 <= mouseY/sy && a.y+a.tower.h/2 >= mouseY/sy){
            temp = a;
        }
    });
    if(mouseX/sx < upgradepage.x || mouseX/sx > upgradepage.x+140 || mouseY/sy < 0 || mouseY/sy > 700){
        selected2 = null;
        upgradepage.x=0;
    }
    if(temp!==null){
        selected2 = temp;
        if(temp.x<600){
            upgradepage.x=1060;
        }
        upgradepage.buttons=upgradebuttons();
    }
}
function mouseDragged() {
    page.buttons.forEach(function(a){
        if(a.x <= mouseX/sx && a.x+a.w >= mouseX/sx && a.y <= mouseY/sy && a.y+a.h >= mouseY/sy){
            a.mouseDown(sx,sy);
        }
    });
}

function mouseReleased(){
    page.buttons.forEach(function(a){
        if(a.x <= mouseX/sx && a.x+a.w >= mouseX/sx && a.y <= mouseY/sy && a.y+a.h >= mouseY/sy){
            a.mouseReleased(sx,sy);
        }
    });
    if(selected != null){
        selected.mouseReleased();
        if(selected.name !== "spike"){
            selected = null;
        } else {
            towers[towers.length-1].step();
        }
    }
}

function gettowerindex(tower){
    for(let i = 0; i < towers.length; i++){
        let b = towers[i];
        if(tower.x === b.x && tower.y === b.y && tower.tower.name === b.tower.name){
            return i;
        }
    }
    return -1;
}

function getbloonsindex(ballon){
    for(let i = 0; i < balloons.length; i++){
        let b = balloons[i];
        if(ballon.x === b.x && ballon.y === b.y && ballon.ballon === b.ballon){
            return i;
        }
    }
    return -1;
}

function getdartsindex(dart){
    for(let i = 0; i < darts.length; i++){
        let b = darts[i];
        if(dart.x === b.x && dart.y === b.y && dart.dir === b.dir && dart.s === b.s){
            return i;
        }
    }
    return -1;
}

function addbloons(bloons){
    let bl = new ballon(map(mymap.nodes[0][0],0,mymap.width()-1,0,1199),map(mymap.nodes[0][1],0,mymap.heigth()-1,0,699),bloons);
    bl.node = 0;
    if(bloons.moab&&dificulty===dificulties.easy){bl.hp*=.9}
    balloons.push(bl);
}

function FileToMap(filepath){
    let holder = [];
    loadStrings(filepath+"/monkeyplace.txt",function(st){
        for(let y = 0; y < st.length; y++){
            let nline = [];
            // print(st[y]);
            let line = split(st[y],'');
            // print(line);
            for(let x = 0; x < line.length; x++){
                let pix = line[x];
                nline.push(parseInt(pix));
            }
            holder.push(nline);
        }
    });
    let nodes = [];
    loadStrings(filepath+"/bloons.txt",function(st){
        for(let line = 0; line < st.length; line++){
            let t = split(st[line],',');
            nodes.push([parseInt(t[0]),parseInt(t[1])]);
        }
    });
    let img = loadImage(filepath+"/img.png");
    let m = new mapclass(img,holder,nodes);
    return m;
}

function getdir(x1,y1,x2,y2){
    return atan2(y2 - y1,x2 - x1);
}

function getrounds(){
    rounds = [];
    loadStrings('rounds.txt',function(st){
        for(let line = 0; line < st.length; line++){
            let bloons = split(st[line],'/');
            let rd = [];
            for(let o = 0; o < bloons.length; o++){
                let ln = split(bloons[o],':');
                let od = getbloon(ln[1]);
                if(od !== null) {
                    let nb = new staticballoon(od.normsprit,od.camosprit,od.regensprit,od.camoregensprit,od.fortsprit,od.fortcamosprit,od.fortregensprit,od.fortregencamosprit,od.w, od.h, od.name, od.resist, od.hp, od.speed,od.childs,od.gain);
                    nb.draw = od.draw;
                    nb.hitted = od.hitted;
                    nb.moab = od.moab;
                    rd[o] = [parseInt(ln[0]), nb];
                    for (let h = 2; h < ln.length; h++) {
                        switch (ln[h]) {
                            case "fort":
                                rd[o][1].fort = true;
                                rd[o][1].hp *=2;
                                if(rd[o][1].name === "lead"){rd[o][1].hp *=2;}
                                break;
                            case "regen":
                                rd[o][1].regen = function () {
                                    if (this.ko === undefined) {
                                        this.ko = 0;
                                    }
                                    if (getstaticbloonindex(rounds[line][o][1].name) > getstaticbloonindex(this.bal.name)) {
                                        this.ko++;
                                        if (this.ko >= 100) {
                                            let b = new ballon(this.x, this.y, staticballons[getstaticbloonindex(this.bal.name) + 1]);
                                            b.regen = this.regen;
                                            b.camo = this.camo
                                            b.node = this.node;
                                            balloons.splice(getbloonsindex(this), 1);
                                            balloons.push(b);
                                            this.ko -= 100;
                                        }
                                    } else {
                                        this.ko = 0;
                                    }
                                    return true;
                                };
                                break;
                            case "camo":
                                rd[o][1].camo = true;
                                break;
                        }
                    }
                }
            }
            rounds[line] = rd;
        }
    });
}

function getbloon(name){
    for(let i = 0; i < staticballons.length;i++){
        let b = staticballons[i];
        if(b.name === name){
            return b;
        }
    }
    return null;
}
function getstaticbloonindex(name){
    for(let i = 0; i < staticballons.length;i++){
        let b = staticballons[i];
        if(b.name === name){
            return i;
        }
    }
    return null;
}

function nextround(){
    yourround++;
    currentround = [];
    if(rounds.length <= yourround){
        //no preincoded round
        page = pages[0];

        let but = new Button(700,400,100,100,"you won the map");
        page.buttons.push(but);
    } else {
        for (let i = 0; i < rounds[yourround].length; i++) {
            currentround[i] = [rounds[yourround][i][0], rounds[yourround][i][1]];
        }
    }
}

function factpos(x,y,r){
    let pos = [];

    for(let i = 0; i < mymap.nodes.length-1; i++){
        let h = mymap.nodes[i];
        if(dist(x,y,h[0],h[1]) <= r*3) {
            let dir = getdir(h[0], h[1], mymap.nodes[i+1][0], mymap.nodes[i+1][1]);
            let di = dist(h[0], h[1], mymap.nodes[i+1][0], mymap.nodes[i+1][1]);

            for (let i = 0; i <= 1; i += 0.0001) {
                let nx = h[0] + (di * i * cos(dir));
                let ny = h[1] + (di * i * sin(dir));
                if (dist(nx*1200/mymap.width(), ny*700/mymap.heigth(), x, y) <= r) {
                    pos.push([nx*1200/mymap.width(), ny*700/mymap.heigth()]);
                }
            }
        }
    }

    return pos;
}

function cost(cost){
    switch (dificulty) {
        case -1:
            return cost;
        case dificulties.easy:
            return Math.round(cost*0.85);
        case dificulties.medium:
            return cost;
        case dificulties.hard:
            return Math.round(cost*1.08);
        case dificulties.impossible:
            return Math.round(cost*1.2);
    }
}

function removeabi(name){
    let a=0;
    for(let i = 0; i < abilities.length;i++){
        if(abilities[i].name===name){
            a=i;
            break;
        }
    }
    abilities.splice(a,1);
}
function removeboo(name){
    let a=0;
    for(let i = 0; i < boosts.length;i++){
        if(boosts[i].name===name){
            a=i;
            break;
        }
    }
    boosts.splice(a,1);
}

function earn(cash){
    if(dept<=0){
        money+=cash;
    } else {
        let m = cash;
        dept-=parseInt(m/2);
        m-=parseInt(m/2);
        cash+=m;
        if(dept<0){
            cash+=dept*-1;
            dept=0;
        }
    }
}

function iteminlist(id,li){
    for(let i = 0; i < li.length; i++){
        if(id===li[i]){
            return true;
        }
    }
    return false;
}

function canplace(tower){
    for(let i = 0; i < towers.length;i++){
        let t = towers[i];
        if((t.x+t.w/3>=tower.x-tower.w/3&&t.x-t.w/3<=tower.x+tower.w/3)&&(t.y+t.h/3>=tower.y-tower.h/3&&t.y-t.h/3<=tower.y+tower.h/3)){
            return false;
        }
    }
    return true;
}

function ArcticWind(x,y){
    let re = false;
    towers.forEach(function(to){
        if(to.tower.name==="icemon"&&to.levels[1]>2) {
            let xx = x - to.x;
            let yy = y - to.y;
            if (xx * xx + yy * yy <= to.r * to.r) {
                re = true;
            }
        }
    })
    return re;
}

function bloonswithprio(x,y,r,prio,prios,camo){
    let balloon = null;
    balloons.forEach(function (a) {
        if(dist(a.x,a.y,x,y) <= r && (a.camo===false||camo===true)) {
            if (balloon === null) {
                balloon = a;
            } else if(prios[prio][1](balloon,a,x,y)){
                balloon = a;
            }
        }
    });
    return balloon;
}

function bloonswithprio2(x,y,r,prio,prios,camo,dart){
    let balloon = null;
    balloons.forEach(function (a) {
        if(dist(a.x,a.y,x,y) <= r && (a.camo===false||camo===true)&&!iteminlist(dart.id,a.darts)) {
            if (balloon === null) {
                balloon = a;
            } else if(prios[prio][1](balloon,a,x,y)){
                balloon = a;
            }
        }
    });
    return balloon;
}

function duplicatelist(list){
    let nl = [];
    for(let i = 0; i < list.length;i++){
        nl[i] = list[i];
    }
    return nl;
}

function helifis(heli,x,y){
    let tx = heli.hx-x;
    let ty = heli.hy-y;
    if(tx*tx+ty*ty>heli.hspeed*heli.hspeed){
        let dir = getdir(heli.hx,heli.hy,x,y);
        heli.hx+=heli.hspeed*cos(dir);
        heli.hy+=heli.hspeed*sin(dir);
    } else {
        heli.hx=x;
        heli.hy=y;
    }
}
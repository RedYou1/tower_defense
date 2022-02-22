let page;
let pages = [];
let upgradepage;

function pageinit() {
    let mainbutton = [];

    let buts = function() {
        for (let y = 0; y < 2; y++) {
            for (let x = 0; x < 5; x++) {
                let index = x + (y * 5);
                let m = maps[index];
                let bx = 150 + (x * 100);
                let by = 150 + (y * 100);
                if(selected !== null){
                    if(y > selected.by) {
                        by += 100
                    }
                }
                let playbutton = new Button(bx, by, 60, 60, "PLAY");
                playbutton.by = y;
                playbutton.draw = function(){
                    try{
                        image(m.img,this.x*sx,this.y*sy,80*sx,80*sy);
                    }catch(e){
                        print("the map's images "+index+" didn't loaded up");
                        maps.splice(index,1);
                    }
                }
                playbutton.mousePressed = function () {
                    let erase = function(){
                        let h = 0;
                        let fuy = 0;
                        for(let i = page.buttons.length-1; i >= 0;i--){
                            if(page.buttons[i].name === "difis"){
                                fuy = page.buttons[i].y;
                                h++;
                            } else {
                                break;
                            }
                        }

                        if(h !== 0){
                            for(let i = 0; i < page.buttons.length; i++){
                                if(page.buttons[i].name !== "difis" && page.buttons[i].y >= fuy){
                                    page.buttons[i].y -= 100;
                                }
                            }
                        }

                        for(let i = 0; i < page.buttons.length; i++){
                            if(page.buttons[i].name !== "difis" && page.buttons[i].y >= this.y+100){
                                page.buttons[i].y += 100;
                            }
                        }

                        page.buttons.splice(page.buttons.length-h,h);
                    }

                    erase();

                    for(let difi = -1; difi <= 3; difi++){
                        let dif = new Button(bx-100+((difi+.75)*100),by+100,60,60,"difis");
                        dif.draw = function(){
                            push();
                            let r = 0;
                            let g = 0;
                            if(difi === dificulties.easy || difi === dificulties.medium){
                                g = 255;
                            }
                            if(difi === dificulties.hard || difi === dificulties.medium){
                                r = 255;
                            }
                            fill(r,g,0);
                            if(difi===dificulties.impossible){
                                fill(0);
                            }
                            if(difi===dificulties.sandbox){
                                fill(255);
                            }
                            rect(this.x*sx,by*sy+100*sy,this.w*sx,this.h*sy);
                            pop();
                        }
                        dif.mousePressed = function(){
                            yourround = -1;
                            lives = 200-(difi*50);
                            if(difi===dificulties.impossible){
                                lives=1;
                            }
                            money = 650;
                            balloons = [];
                            towers = [];
                            bananes=[];
                            abilities=[];
                            selected = null;
                            darts = [];
                            selected2 = null;
                            dificulty = difi;

                            towerinit();

                            erase();

                            gamespeed = speeds.pause;
                            mymap = m;
                            page.buttons = mainbutton;
                            playbut = playbuttons();
                            rederect("PLAY");
                            if(difi===dificulties.sandbox){
                                lives=Number.MAX_SAFE_INTEGER;
                                money=Number.MAX_SAFE_INTEGER;
                                currentround=[];
                                bloonsbuttons();
                                balloons=[];
                            } else {
                                nextround();
                            }
                            page.buttons = duplicatelist(playbut);
                        }
                        page.buttons.push(dif);
                    }
                    return true;
                };
                mainbutton.push(playbutton);
                if (index >= maps.length-1) {
                    return;
                }
            }
        }
    }
    buts();

    let mainpage = new Page("main", mainbutton);
    mainpage.draw = function () {
        background(255);
    }
    page = mainpage;
    pages.push(mainpage);

    let oui = 0;

    let playpage = new Page("play", []);
    playpage.draw = function () {
        page.buttons = duplicatelist(playbut);
        image(mymap.img, 0, 0, 1200*sx, 700*sy);
        if(selected2 != null){
            push();
            fill(191, 191, 191, 170);
            ellipse(selected2.x*sx, selected2.y*sy, selected2.r * 2*sx,selected2.r * 2*sy);
            pop();
        }
        boosts.forEach(function(a){
            a.func(a);
        })
        for(let sp = 0; sp < gamespeed;sp++) {
            towers.forEach(function (a) {
                a.step();
            });
            balloons.forEach(function (a) {
                a.effects.forEach(function(m){
                    m.func(a);
                })
                a.step();
            });
            darts.forEach(function (a) {
                a.step();
                let n = [];
                let dr = (a.w>a.h?a.w:a.h)/2;
                balloons.forEach(function (b) {
                    let br = (b.w>b.h?b.w+b.speed:b.h+b.speed)/2;
                    if ((b.x-a.x)*(b.x-a.x)+(b.y-a.y)*(b.y-a.y)<=(dr+br)*(dr+br)) {
                        if(!iteminlist(a.type,b.bal.resist)) {
                            a.effects.forEach(function (j) {
                                if(j!==undefined) {
                                    let g = true
                                    for (let i = 0; i < b.effects.length; i++) {
                                        if (b.effects[i].name === j.name) {
                                            b.effects[i].duration = j.duration;
                                            g = false;
                                        }
                                    }
                                    if (g) {
                                        b.effects.push(new Effects(j.name, j.duration, j.layer, j.func, j.afunc));
                                    }
                                }
                            })
                        }
                        n.push(b);
                    }
                });
                if(a.stower.tower.name==="BombTower"||a.type===damagetype.explosions){
                    // if(n.length>0){
                    //     a.stower.tower.explode(a);
                    // }
                } else {
                    for (let i = 0; i < n.length; i++) {
                        let b = n[i];
                        let h = b.hitted(a, a.dam);
                        if (h !== "resisted" && a.stower.tower.name !== "spike") {
                            towers[a.tower].damcont += (isNaN(h)?0:h);
                        }
                        if (h !== "no") {
                            a.lives--;
                        }
                        if (a.lives <= 0 || h === "resisted") {
                            darts.splice(getdartsindex(a), 1);
                            break;
                        }
                    }
                }
            });
            bananes.forEach(function(a){
                a.step();
            })
            abilities.forEach(function(a){
                if(a.dremain>0) {
                    a.dremain--;
                    if (a.dremain === 0) {
                        a.afunc(a);
                    }
                }
                if(a.remain>0){
                    a.remain--;
                }
            })
            balloons.forEach(function(a){
                let h = [];
                a.effects.forEach(function(m){
                    m.afunc(a);
                    m.duration--;
                    if(m.duration<=0){
                        h.push(m);
                    }
                })
                h.forEach(function(o){
                    for(let i = 0; i < a.effects.length;i++){
                        let j = a.effects[i];
                        if(o.name===j.name&&o.duration===j.duration){
                            a.effects.splice(i,1);
                            break;
                        }
                    }
                })
            })
        }
        towers.forEach(function (a) {
            a.draw();
            if(a.tower.name==="farm"&&a.levels[1]>2&&a.money===a.maxmoney){
                if(a.ez===1) {
                    push();
                    fill(255, 255, 0, 150);
                    rect(a.x * sx - a.w / 2 * sx, a.y * sy - a.h / 2 * sy, a.w * sx, a.h * sy);
                    pop();
                }
                if(a.ez===2){
                    earn(Math.round(a.money));
                    a.money = 0;
                }
            }
        });
        balloons.forEach(function (a) {
            a.draw();
        });
        darts.forEach(function (a) {
            if(isNaN(a.x)||isNaN(a.y)){
                darts.splice(getdartsindex(a),1);
                return;
            }
            a.draw();
        });
        bananes.forEach(function(a){
            let button;
            if(a.stower.ez>=1){
                button = new Button(a.x-a.w-a.w/2,a.y-a.h-a.h/2,a.w*3,a.h*3,"Banane");
            } else {
                button = new Button(a.x-a.w,a.y-a.h,a.w*2,a.h*2,"Banane");
            }
            button.draw = function(){
                image(a.sprite,this.x*sx+this.w*sx/2,this.y*sy+this.h*sy/2,this.w*sx/2,this.h*sy/2);
            }
            button.mouseHover = function(){
                earn(a.dam);
                towers[a.tower].damcont+=a.dam;
                bananes.splice(getbananeindex(a));
            }
            page.buttons.push(button);
        })
        let ab = [];
        let fu = function(a){
            for(let i = 0; i < ab.length;i++){
                if(ab[i][0].name===a.name){
                    return i;
                }
            }
            return -1;
        }
        abilities.forEach(function(a){
            let i = fu(a);
            if(i===-1){
                ab.push([a,a.remain,1]);
            } else {
                if(ab[i][1]===0&&a.remain===0){
                    ab[i][2]++;
                }
                if(ab[i][1]>a.remain){
                    ab[i][1]=a.remain;
                }
            }
        });
        for(let i = 0; i < ab.length;i++){
            let a = ab[i];
            let button = new Button(i*100+20,600,80,80,a[0].name);
            button.draw = function(){
                if(selected2===null) {
                    push();
                    fill(0, 0, 255);
                    rect(this.x * sx, this.y * sy, this.w * sx, this.h * sy);
                    image(a[0].sprite, this.x * sx, this.y * sy, this.w * sx, this.h * sy);
                    if (a[2] > 1) {
                        fill(255)
                        rect(this.x * sx + this.w * sx - 15 * sx, this.y * sy, 30 * sx, -30 * sy);
                        fill(0)
                        strokeWeight(5);
                        text(a[2], this.x * sx + this.w * sx - 10 * sx, this.y * sy)
                    }
                    if (a[1] > 0) {
                        fill(100, 100, 100, 200);
                        arc(this.x * sx + this.w / 2 * sx, this.y * sy + this.h / 2 * sy, this.w * sx, this.h * sy, 0, (a[1] / a[0].cooldown) * TWO_PI, PIE);
                    }
                    pop();
                }
            }
            button.mousePressed = function(){
                if(selected2===null) {
                    let n = a[0].name;
                    let b = null;
                    abilities.forEach(function (h) {
                        if (h.name === n && h.remain === 0) {
                            b = h;
                        }
                    })
                    if (b !== null) {
                        b.remain = b.cooldown;
                        b.dremain = b.duration;
                        b.func(a[0]);
                    }
                }
            }
            page.buttons.push(button);
        }
        if (selected != null) {
            try {
                selected.mouseDown();
                selected.draw();
            }catch(e){}
        }
        for(let sp = 0; sp < gamespeed;sp++) {
            let ui = Math.round(random(5, 50));
            if (oui >= ui) {
                if (currentround.length === 0) {
                    if (balloons.length === 0&&dificulty!==dificulties.sandbox) {
                        if(yourround+1===40+(dificulty*20)){

                            let nofreeplay = new Button(0,0,1200,700,"no freeplay");
                            nofreeplay.draw=function(){

                            }
                            nofreeplay.mousePressed = function(){
                                if(!(mouseX/sx>1200/4&&mouseX/sx<1200/4+1200/2&&mouseY/sy>700/4&&mouseY/sy<700/4+700/2)){
                                    selected2 = null;
                                    rederect("main");
                                    let but = new Button(700,400,100,100,"you won the map");
                                    page.buttons.push(but);
                                }
                            }
                            let freeplay = new Button(1200/4,700/4,1200/2,700/2,"freeplay");
                            freeplay.draw = function(){
                                push();
                                fill(165,42,42);
                                rect(this.x*sx,this.y*sy,this.w*sx,this.h*sy);

                                fill(0);
                                text("freeplay?",(this.x+10)*sx,(this.y+20)*sy);
                                text("click on me for yes\nclick outside of me to retur to the main menu",(this.x+this.w/4)*sx,(this.y+25)*sy);
                                pop();
                            }
                            freeplay.mousePressed = function(){
                                gamespeed=0;
                                nextround();
                                page.buttons.pop();
                                page.buttons.pop();
                            }
                            gamespeed=1;
                            page.buttons.push(nofreeplay);
                            page.buttons.push(freeplay);
                        } else {
                            nextround();
                        }
                    }
                } else {
                    let b = Math.round(random(0, currentround.length - 1));
                    addbloons(currentround[b][1]);
                    currentround[b][0]--;
                    if (currentround[b][0] === 0) {
                        currentround.splice(b, 1);
                    }
                }
                oui -= ui;
            }
        }
        if(dificulty!==dificulties.sandbox) {
            push();
            textSize(20);
            fill(0);
            let h = 0;
            if (upgradepage.x === 0 && selected2 !== null) {
                h = 880
            }
            text(lives + " lives", h * sx + 20 * sx, 20 * sy);
            text(money + "$", h * sx + 20 * sx, 40 * sy);
            if (dept > 0) {
                fill(255, 0, 0)
                text("-" + dept + "$", h * sx + 20 * sx, 60 * sy);
                fill(0)
            }
            text((yourround + 1) + (yourround + 1 > (40 + dificulty * 20) ? "" : "/" + (40 + dificulty * 20)) + " round", h * sx + 20 * sx, 80 * sy);
            pop();
        }
        oui++;
        boosts.forEach(function(a){
            a.afunc(a);
        })
    }
    pages.push(playpage);


    upgradepage = new Page("upgrade", []);
    upgradepage.draw = function () {
        push();
        fill(193,154,107);
        rect(this.x*sx,0,140*sx,700*sy);
        fill(0);

        if(selected2.tower.name==="farm"){
            if(selected2.money!==undefined){
                text(Math.round(selected2.money)+"$", (this.x+30) * sx, 20 * sy, 50 * sx, 50 * sy);
            }
        } else {
            if(selected2.tower.name==="boat"&&selected2.levels[2]>=3){
                text(selected2.marc2+"x",(selected2.x-5)*sx,(selected2.y-20)*sy)
            }
            text(selected2.prios[selected2.prio][0], this.x * sx + 40 * sx, 20 * sy, 50 * sx, 50 * sy);
            text(selected2.damcont+" pop",this.x*sx+40*sx,55*sy);
        }
        pop();
    }
}

function playbuttons() {
    let xs = 2;
    let ys = 8;
    if(statictowers.length < 8*2 && statictowers.length > 8){
        ys = Math.round(statictowers.length/2);
    }
    let fs = new Button(1000,600,50,50,"fullscreen");
    fs.mousePressed = function(){
        fullscreen(!fusc);
        fusc=!fusc;
        if(fusc){
            resizeCanvas(displayWidth, displayHeight);
            sx=displayWidth/1200;
            sy=displayHeight/700;
        } else {
            resizeCanvas(1200, 700);
            sx=1;
            sy=1;
        }
    }

    let pauseb = new Button(1100,600,50,50,"pause/play");
    pauseb.hov = false;
    pauseb.draw = function(){
        push();
        stroke(0);
        fill(0,0,255);
        ellipse(this.x*sx,this.y*sy,this.w*sx,this.h*sy);
        stroke(0,0,255);
        if(this.hov){
            this.hov = false;
            fill(255);
        } else {
            fill(200);
        }
        if(gamespeed === speeds.fast){
            //fast
            triangle(this.x*sx-15*sx,this.y*sy-15*sy,this.x*sx-15*sx,this.y*sy+15*sy,this.x*sx,this.y*sy);
            triangle(this.x*sx,this.y*sy-15*sy,this.x*sx,this.y*sy+15*sy,this.x*sx+15*sx,this.y*sy);
        }else if(gamespeed === speeds.normal){
            //play
            triangle(this.x*sx-15*sx,this.y*sy-15*sy,this.x*sx-15*sx,this.y*sy+15*sy,this.x*sx+15*sx,this.y*sy);
        } else {
            //paused
            rect(this.x*sx-15*sx,this.y*sy-15*sy,8*sx,34*sy);
            rect(this.x*sx+5*sx,this.y*sy-15*sy,8*sx,34*sy);
        }
        pop();
    }
    pauseb.mousePressed = function(){
        gamespeed++;
        if(gamespeed>speeds.fast){gamespeed=speeds.pause;}
    }
    pauseb.mouseHover = function(){
        this.hov = true;
    }
    pauseb.checkin = function(x,y){
        return dist(x,y,this.x,this.y) <= 25;
    }
    let but = [pauseb,fs];
    let ax = 0;
    let ay = 0;
    for(let i = 0; i < statictowers.length;i++){
            let to = statictowers[i];
            let x = ax;
            let y = ay;
            let add = new Button(1050 + x, 10 + y, 50, 50, "add " + to.name);
            add.mousePressed = function () {
                if(upgradepage.x!==1060) {
                    let temp = new Button(1050 + x, 10 + y, 50, 50, to.name);
                    temp.mouseDown = function () {
                        selected.x = mouseX - selected.w / 2;
                        selected.y = mouseY - selected.h / 2;
                        if (mouseX/sx < 0 || mouseX/sx >= 1200 || mouseY/sy < 0 || mouseY/sy >= 700) {
                            selected = null;
                        }
                    }
                    temp.mouseReleased = function () {
                        let mon = new Tower((selected.x + selected.w / 2)/sx, (selected.y + selected.h / 2)/sy, to);
                        let re = mymap.getsol(mon.x, mon.y);
                        if ((re === to.sol||(re===1&&ArcticWind(mon.x,mon.y))) && money >= cost(to.cost) && canplace(mon)) {
                            towers.push(mon);
                            money -= cost(to.cost);
                        }
                    }
                    temp.draw = function () {
                        let mon = new Tower((selected.x + selected.w / 2)/sx, (selected.y + selected.h / 2)/sy, to);
                        let re = mymap.getsol(mon.x, mon.y);
                        push();
                        if (!(re === to.sol||(re===1&&ArcticWind(mon.x,mon.y))) || !canplace(mon)) {
                            //pas bon terrain
                            fill(255, 0, 0, 200);
                        } else {
                            //bon terrain
                            if (money >= cost(to.cost)) {
                                //assez d'argent
                                fill(191, 191, 191, 200);
                            } else {
                                //pas assez d'argent
                                fill(255, 255, 0, 200);
                            }
                        }
                        ellipse(mon.x*sx, mon.y*sy, to.r * 2*sx,to.r * 2*sy);
                        translate(mon.x*sx, mon.y*sy);
                        to.draw(-PI/2);
                        pop();
                    }
                    selected = temp;
                }
            }
            add.mouseHover = function(){
                if(upgradepage.x!==1060) {
                    push();
                    fill(200, 200, 200, 220);
                    stroke(0);
                    rect(1050*sx + x*sx - 150*sx, 10*sy + y*sy, 150*sx, 100*sy);

                    fill(0);
                    text(to.description.replace('$',cost(to.cost)+'$'), 1050*sx + x *sx - 140*sx, 20*sy + y *sy, 130*sx, 80*sy);
                    pop();
                }
            }
            add.draw = function () {
                if(upgradepage.x!==1060) {
                    push();
                    switch(to.type){
                        case towertypes.primaire:
                            fill(0,255,255);
                            break;
                        case towertypes.militaire:
                            fill(0,255,0);
                            break;
                        case towertypes.magique:
                            fill(128,0,128);
                            break;
                        case towertypes.support:
                            fill(255,215,0);
                            break;
                    }
                    rect(this.x*sx, this.y*sy, this.w*sx, this.h*sy);
                    pop();
                    text(name, this.x*sx, this.y*sy, this.w*sx + this.x*sx, this.h*sy + this.y*sy);
                    image(to.sprite, this.x*sx, this.y*sy, this.w*sx, this.h*sy);
                }
            }
            but.push(add);
            ax+=60;
            if(ax>60){
                ax=0;
                ay+=60;
            }
    }
    playbut = but;
    return but;
}

function upgradebuttons(){
    let buttons = [];

    let h = 0;
    if(upgradepage.x===1060){
        h=-290
    }

    let levelfunc = function(who,w){
        let other = [0,1,2];
        other.splice(who,1);
        return (selected2.levels[other[0]] > 0 && selected2.levels[other[1]] > 0) || ((selected2.levels[other[0]] > 2 || selected2.levels[other[1]] > 2) && !(w<2));
    }
    let lvl1 = new Button(upgradepage.x+20,80,100,100,"lvl1");
    lvl1.mousePressed = function(){
        let up = selected2.tower.levels[0][selected2.levels[0]];
        if(up === undefined||up===null||levelfunc(0,selected2.levels[0])){
            up=new Upgrade("max upgrade",maxupgrade,"no more upgrade",Infinity,function(mon){});
        }
        if(money >= cost(up.cost)&&up.cost!==Infinity){
            selected2.totalmoney+=cost(up.cost);
            selected2.levelingup([1,0,0]);
            money-=cost(up.cost);
        }
    }
    lvl1.draw = function(){
        push();
        let up = selected2.tower.levels[0][selected2.levels[0]];
        if(up === undefined||up===null||levelfunc(0,selected2.levels[0])){
            up=new Upgrade("max upgrade",maxupgrade,"no more upgrade",Infinity,function(mon){});
        }
        if(money >= cost(up.cost)&&up.cost!==Infinity){
            fill(0,255,0);
        } else {
            fill(255,0,0);
        }
        rect(this.x*sx,this.y*sy,this.w*sx,this.h*sy);
        image(up.sprite,this.x*sx+5*sx,this.y*sy+10*sy,this.w*sx-5*sx,this.h*sy-10*sy);
        fill(0);
        text(up.name,this.x*sx+5*sx,this.y*sy+5*sy,this.w*sx+this.x*sx-5*sx,this.h*sy+this.y*sy-5*sy);

        for(let i = 1; i <= 5; i++){
            if(i<=selected2.levels[0]){
                fill(0,255,0);
            } else if(!levelfunc(0,i-1)){
                fill(255,100,100);
            } else {
                fill(100);
            }
            rect(this.x*sx+((i-1)*this.w/5*sx),this.y*sy+this.h*sy,this.w*sx/5,this.w*sx/5);
        }
        pop();
    }
    lvl1.mouseHover = function(){
        let up = selected2.tower.levels[0][selected2.levels[0]];
        if(up === undefined||up===null||levelfunc(0,selected2.levels[0])){
            up=new Upgrade("max upgrade",maxupgrade,"no more upgrade",Infinity,function(mon){});
        }
        push();
        fill(200,200,200,220);
        stroke(0);
        rect(this.x*sx+120*sx+h*sx, this.y*sy,150*sx,100*sy);

        fill(0);
        text(cost(up.cost)+"$\n"+up.description,this.x*sx+125*sx+h*sx, this.y*sy+5*sy,140*sx,80*sy);
        pop();
    }
    buttons.push(lvl1);
    let lvl2 = new Button(upgradepage.x+20,240,100,100,"lvl2");
    lvl2.mousePressed = function(){
        let up = selected2.tower.levels[1][selected2.levels[1]];
        if(up === undefined||up===null||levelfunc(1,selected2.levels[1])){
            up=new Upgrade("max upgrade",maxupgrade,"no more upgrade",Infinity,function(mon){});
        }
        if(money >= cost(up.cost)&&up.cost!==Infinity){
            selected2.totalmoney+=cost(up.cost);
            selected2.levelingup([0,1,0]);
            money-=cost(up.cost);
        }
    }
    lvl2.draw = function(){
        push();
        let up = selected2.tower.levels[1][selected2.levels[1]];
        if(up === undefined||up===null||levelfunc(1,selected2.levels[1])){
            up=new Upgrade("max upgrade",maxupgrade,"no more upgrade",Infinity,function(mon){});
        }
        if(money >= cost(up.cost)&&up.cost!==Infinity){
            fill(0,255,0);
        } else {
            fill(255,0,0);
        }
        rect(this.x*sx,this.y*sy,this.w*sx,this.h*sy);
        image(up.sprite,this.x*sx+5*sx,this.y*sy+10*sy,this.w*sx-5*sx,this.h*sy-10*sy);
        fill(0);
        text(up.name,this.x*sx+5*sx,this.y*sy+5*sy,this.w*sx+this.x*sx-5*sx,this.h*sy+this.y*sy-5*sy);

        for(let i = 1; i <= 5; i++){
            if(i<=selected2.levels[1]){
                fill(0,255,0);
            } else if(!levelfunc(1,i-1)){
                fill(255,100,100);
            } else {
                fill(100);
            }
            rect(this.x*sx+((i-1)*this.w/5*sx),this.y*sy+this.h*sy,this.w*sx/5,this.w*sx/5);
        }
        pop();
    }
    lvl2.mouseHover = function(){
        let up = selected2.tower.levels[1][selected2.levels[1]];
        if(up === undefined||up===null||levelfunc(1,selected2.levels[1])){
            up=new Upgrade("max upgrade",maxupgrade,"no more upgrade",Infinity,function(mon){});
        }
        push();
        fill(200,200,200,220);
        stroke(0);
        rect(this.x*sx+120*sx+h*sx, this.y*sy,150*sx,100*sy);

        fill(0);
        text(cost(up.cost)+"$\n"+up.description,this.x*sx+125*sx+h*sx, this.y*sy+5*sy,140*sx,80*sy);
        pop();
    }
    buttons.push(lvl2);
    let lvl3 = new Button(upgradepage.x+20,400,100,100,"lvl3");
    lvl3.mousePressed = function(){
        let up = selected2.tower.levels[2][selected2.levels[2]];
        if(up === undefined||up===null||levelfunc(2,selected2.levels[2])){
            up=new Upgrade("max upgrade",maxupgrade,"no more upgrade",Infinity,function(mon){});
        }
        if(money >= cost(up.cost)&&up.cost!==Infinity){
            selected2.totalmoney+=cost(up.cost);
            selected2.levelingup([0,0,1]);
            money-=cost(up.cost);
        }
    }
    lvl3.draw = function(){
        push();
        let up = selected2.tower.levels[2][selected2.levels[2]];
        if(up === undefined||up===null||levelfunc(2,selected2.levels[2])){
            up=new Upgrade("max upgrade",maxupgrade,"no more upgrade",Infinity,function(mon){});
        }
        if(money >= cost(up.cost)&&up.cost!==Infinity){
            fill(0,255,0);
        } else {
            fill(255,0,0);
        }
        rect(this.x*sx,this.y*sy,this.w*sx,this.h*sy);
        image(up.sprite,this.x*sx+5*sx,this.y*sy+10*sy,this.w*sx-5*sx,this.h*sy-10*sy);
        fill(0);
        text(up.name,this.x*sx+5*sx,this.y*sy+5*sy,this.w*sx+this.x*sx-5*sx,this.h*sy+this.y*sy-5*sy);

        for(let i = 1; i <= 5; i++){
            if(i<=selected2.levels[2]){
                fill(0,255,0);
            } else if(!levelfunc(2,i-1)){
                fill(255,100,100);
            } else {
                fill(100);
            }
            rect(this.x*sx+((i-1)*this.w/5*sx),this.y*sy+this.h*sy,this.w*sx/5,this.w*sx/5);
        }
        pop();
    }
    lvl3.mouseHover = function(){
        let up = selected2.tower.levels[2][selected2.levels[2]];
        if(up === undefined||up===null||levelfunc(2,selected2.levels[2])){
            up=new Upgrade("max upgrade",maxupgrade,"no more upgrade",Infinity,function(mon){});
        }
        push();
        fill(200,200,200,220);
        stroke(0);
        rect(this.x*sx+120*sx+h*sx, this.y*sy,150*sx,100*sy);

        fill(0);
        text(cost(up.cost)+"$\n"+up.description,this.x*sx+125*sx+h*sx, this.y*sy+5*sy,140*sx,80*sy);
        pop();
    }
    buttons.push(lvl3);

    let sell = new Button(upgradepage.x+20,650,100,20,"sell");
    sell.mousePressed = function(){
        earn(Math.round(selected2.totalmoney*.7))
        if(selected2.tower.name==="farm"&&selected2.money!==undefined){earn(Math.round(selected2.money));}
        towers.splice(gettowerindex(selected2),1);
        if(selected2.ab!==""){
            removeabi(selected2.ab)
        }
        if(selected2.bo!==""){
            removeboo(selected2.bo);
        }
        selected2 = null;
    }
    sell.draw = function(){
        push();
        fill(255,0,0);
        rect(this.x*sx,this.y*sy,this.w*sx,this.h*sy);
        fill(240);
        text("sell for "+Math.round(selected2.totalmoney*.7)+"$",this.x*sx+5*sx,this.y*sy+5*sy,this.w*sx+this.x*sx-5*sx,this.h*sy+this.y*sy-5*sy);
        pop();
    }
    buttons.push(sell);

    if(selected2.tower.name==="farm") {
        if(selected2.money!==undefined) {
            let withdraw = new Button(upgradepage.x + 30, 60, 50, 20, "withdraw");
            withdraw.draw = function () {
                push();
                fill(200);
                rect(this.x * sx, this.y * sy, this.w * sx, this.h * sy);
                fill(0);
                text("withdraw", (this.x + 5) * sx, (this.y + 5) * sy);
                pop();
            }
            withdraw.mousePressed = function () {
                earn(Math.round(selected2.money));
                selected2.money = 0;
            }
            buttons.push(withdraw);
        }
    } else {
        let prioless = new Button(upgradepage.x + 10, 20, 20, 20, "prioless");
        prioless.mousePressed = function () {
            selected2.prio--;
            if (selected2.prio < 0) {
                selected2.prio = selected2.prios.length-1;
            }
        }
        prioless.draw = function () {
            push();
            fill(200);
            translate(this.x * sx + this.w * sx / 2, this.y * sy + this.h * sy / 2);
            triangle(-this.w / 2 * sx, 0, this.w / 2 * sx, -this.h / 2 * sy, this.w / 2 * sx, this.h / 2 * sy);
            pop();
        }
        buttons.push(prioless);

        let prioadd = new Button(upgradepage.x + 100, 20, 20, 20, "prioadd");
        prioadd.mousePressed = function () {
            selected2.prio++;
            if (selected2.prio >= selected2.prios.length) {
                selected2.prio = 0;
            }
        }
        prioadd.draw = function () {
            push();
            fill(200);
            translate(this.x * sx + this.w / 2 * sx, this.y * sy + this.h / 2 * sy);
            triangle(this.w / 2 * sx, 0, -this.w / 2 * sx, -this.h / 2 * sy, -this.w / 2 * sx, this.h / 2 * sy);
            pop();
        }
        buttons.push(prioadd);
    }

    return buttons;
}
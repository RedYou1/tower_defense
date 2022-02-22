function bloonsbuttons(){

    yourround=0;
    many = 1;

    let yl10 = new Button(10,450,50,50,"yl10");
    yl10.mousePressed = function(){
        if (selected2 === null) {
            if (yourround > 9) {
                yourround -= 10;
            }
        }
    }
    playbut.push(yl10);
    let ya10 = new Button(130,450,50,50,"ya10");
    ya10.mousePressed = function(){
        if (selected2 === null) {
            if (yourround < 90) {
                yourround += 10;
            }
        }
    }
    playbut.push(ya10);
    let yl = new Button(10,510,50,50,"yl");
    yl.mousePressed = function(){
        if (selected2 === null) {
            if (yourround > 0) {
                yourround--;
            }
        }
    }
    playbut.push(yl);
    let ya = new Button(130,510,50,50,"ya");
    ya.mousePressed = function(){
        if (selected2 === null) {
            if (yourround < 99) {
                yourround++;
            }
        }
    }
    playbut.push(ya);
    let ys = new Button(70,480,50,50,"ys");
    ys.draw = function(){
        rect(this.x*sx,this.y*sy,this.w*sx,this.h*sy);
        text((yourround+1)+" "+this.name,this.x*sx,this.y*sy,this.w*sx+this.x*sx,this.h*sy+this.y*sy);
    }
    ys.mousePressed = function(){
        if (selected2 === null) {
            for (let i = 0; i < rounds[yourround].length; i++) {
                currentround.push([rounds[yourround][i][0], rounds[yourround][i][1]]);
            }
        }
    }
    playbut.push(ys);



    let camo = false;
    let regen = false;
    let fort = false;
    let but = new Button(10,10,50,50,"camo");
    but.mousePressed = function(){
        if (selected2 === null) {
            camo = !camo;
        }
    }
    playbut.push(but);
    but = new Button(70,10,50,50,"regen");
    but.mousePressed = function(){
        if (selected2 === null) {
            regen = !regen;
        }
    }
    playbut.push(but);
    but = new Button(130,10,50,50,"fort");
    but.mousePressed = function(){
        if (selected2 === null) {
            fort = !fort;
        }
    }
    playbut.push(but);

    but = new Button(190,10,50,50,"-bl");
    but.mousePressed = function(){
        if(many>1){many--;}
    }
    playbut.push(but);
    but = new Button(250,10,50,50,"many+inf");
    but.draw = function(){
        rect(this.x*sx,this.y*sy,this.w*sx,this.h*sy);
        text(many+'\nset/unset\nInfinity',this.x*sx,this.y*sy,this.w*sx+this.x*sx,this.h*sy+this.y*sy);
    }
    but.mousePressed = function(){
        if(many===Infinity){
            many=1;
        } else {
            many=Infinity;
        }
    }
    playbut.push(but);
    but = new Button(310,10,50,50,"+bl");
    but.mousePressed = function(){
        many++;
    }
    playbut.push(but);

    but = new Button(70,540,50,50,"reset");
    but.mousePressed = function(){
        if (selected2 === null) {
            balloons = [];
            currentround = [];
        }
    }
    playbut.push(but);
    for(let y = 0;y<6;y++) {
        for (let x = 0; x < 3; x++) {
            if (x + (y * 3) < staticballons.length) {
                let b = staticballons[x + (y * 3)];
                but = new Button(10 + x * 60, 70 + y * 60, 50, 50, b.name);
                but.mousePressed = function () {
                    if (selected2 === null) {
                        let nb = new staticballoon(b.normsprit, b.camosprit, b.regensprit, b.camoregensprit,b.fortsprit,b.fortcamosprit,b.fortregensprit,b.fortregencamosprit, b.w, b.h, b.name, b.resist, b.hp, b.speed, b.childs, b.gain)
                        nb.camo = camo;
                        nb.fort=fort;
                        nb.moab=b.moab;
                        if(fort){
                            nb.hp*=2;
                            if(b.name==="lead"){
                                nb.hp*=2;
                            }
                        }
                        if (regen) {
                            nb.regen = function () {
                                if (this.ko === undefined) {
                                    this.ko = 0;
                                }
                                if (getstaticbloonindex(nb.name) > getstaticbloonindex(this.bal.name)) {
                                    this.ko++;
                                    if (this.ko >= 100) {
                                        let b = new ballon(this.x, this.y, staticballons[getstaticbloonindex(this.bal.name) + 1]);
                                        b.regen = this.regen;
                                        b.camo = this.camo;
                                        b.fort = this.fort;
                                        b.node = this.node;
                                        balloons.splice(getbloonsindex(this), 1);
                                        balloons.push(b);
                                        this.ko -= 100;
                                    }
                                } else {
                                    this.ko = 0;
                                }
                                return true;
                            }
                        } else {
                            nb.regen = function () {
                                return false
                            };
                        }
                        nb.draw = b.draw;
                        currentround.push([many,nb]);
                    }
                }
                but.draw = function () {
                    push();
                    fill(255, 255, 255, 100);
                    rect(this.x * sx, this.y * sy, this.w * sx, this.h * sy);
                    translate(this.x * sx + this.w / 2 * sx, this.y * sy + this.h / 2 * sy);
                    let img;
                    if(b.fortsprit!==null){
                        if(regen&&b.moab!==true){
                            if(camo){
                                if(fort){
                                    img = b.fortregencamosprit;
                                } else {
                                    img = b.camoregensprit;
                                }
                            } else {
                                if(fort){
                                    img = b.fortregensprit;
                                } else {
                                    img = b.regensprit;
                                }
                            }
                        } else {
                            if(camo&&b.moab!==true){
                                if(fort){
                                    img = b.fortcamosprit;
                                } else {
                                    img = b.camosprit;
                                }
                            } else {
                                if(fort&&b.moab!==true){
                                    img = b.fortsprit;
                                } else {
                                    img = b.normsprit;
                                }
                            }
                        }
                    } else {
                        if (regen&&b.moab!==true) {
                            if (camo) {
                                img = b.camoregensprit;
                            } else {
                                img = b.regensprit;
                            }
                        } else {
                            if (camo&&b.moab!==true) {
                                img = b.camosprit;
                            } else {
                                img = b.normsprit;
                            }
                        }
                    }
                    image(img, -this.w / 2 * sx, -this.h / 2 * sy, this.w * sx, this.h * sy);
                    pop();
                }
                playbut.push(but);
            }
        }
    }
}
let supermon,ninjamon;

function toursmagique(){
    let supermonsprite = loadImage('sprites/monkey/super monkey.png');
    supermon = new statictower("super", 50, 50, 300, 5, supermonsprite,2500,2,towertypes.magique);
    supermon.dart = new DartsContainer(20,damagetype.darts, 1,dartssprite,8,40,false,1);
    let up = [[],[],[]];
    let EpicRangeUpgradeIcon = loadImage('sprites/EpicRangeUpgradeIcon.png');
    let LaserBlastsUpgradeIcon = loadImage('sprites/LaserBlastsUpgradeIcon.png');
    let PlasmaBlastUpgradeIcon = loadImage('sprites/PlasmaBlastUpgradeIcon.png');
    let SunAvatarUpgradeIcon = loadImage('sprites/SunAvatarUpgradeIcon.png');
    let SunTempleUpgradeIcon = loadImage('sprites/SunTempleUpgradeIcon.png');
    up[0][0] = new Upgrade("Laser Blasts",LaserBlastsUpgradeIcon,"Shoots powerful blasts of laser instead of darts.",2500,function(mon){mon.dart.type=damagetype.plasma;mon.dart.lives++;mon.laser=1;let img = createImage(8, 30);img.loadPixels();for (let i = 0; i < img.width; i++) {for (let j = 0; j < img.height; j++) {img.set(i, j, color(255, 0, 0));}}img.updatePixels();mon.dart.sprite = img;mon.dart.h=30;})
    up[0][1] = new Upgrade("Plasma Vision",PlasmaBlastUpgradeIcon,"Plasma vaporizes almost everything it touches!",4500,function(mon){
        mon.speed/=2;
        mon.dart.lives++;
        mon.laser=0;
        let img = createImage(30, 30);
        img.loadPixels();
        for (let i = 0; i < img.width; i++) {
            for (let j = 0; j < img.height; j++) {
                let d = (i-15)*(i-15)+(j-15)*(j-15)
                if(d<=225&&d>=-225){
                    img.set(i, j, color(128,0,128));
                }
            }
        }
        img.updatePixels();
        mon.dart.sprite = img;
        mon.dart.w=30;
        mon.dart.h=30;
    })
    up[0][2]=new Upgrade("Sun Avatar",SunAvatarUpgradeIcon,"Channels power from the core of the Sun.",22000,function(mon){
        mon.dart.lives+=3;
        mon.dart.type=damagetype.null;
        mon.laser=2;
        let img = createImage(24, 15);
        img.loadPixels();
        for (let i = 0; i < img.width; i++) {
            for (let j = 0; j < img.height; j++) {
                img.set(i, j, color(255,255,0));
            }
        }
        img.updatePixels();
        mon.dart.sprite = img;
        mon.dart.w=24;
        mon.dart.h=15;
    })
    // up[0][3] = new Upgrade("Sun Temple",SunTempleUpgradeIcon,"Tower sacrifices enhance and modify the Temple's attacks.",100000,function(mon){
    //     mon.dart.dam=5;
    //     mon.dart.lives=20;
    //     mon.r*=1.3;
    //     mon.laser=0;
    //     let img = createImage(40, 40);
    //     img.loadPixels();
    //     for (let i = 0; i < img.width; i++) {
    //         for (let j = 0; j < img.height; j++) {
    //             let d = (i-20)*(i-20)+(j-20)*(j-20)
    //             if(d<=20*20&&d>=-20*20){
    //                 img.set(i, j, color(255,255,0));
    //             }
    //         }
    //     }
    //     img.updatePixels();
    //     mon.dart.sprite = img;
    //     mon.dart.w=40;
    //     mon.dart.h=40;
    //     let pri = 0;
    //     let mili = 0;
    //     let mag = 0;
    //     let sup = 0;
    //     towers.forEach(function(to){
    //         switch (to.tower.type){
    //             case towertypes.primaire:
    //                 pri+=to.totalmoney;
    //                 break;
    //             case towertypes.militaire:
    //                 mili+=to.totalmoney;
    //                 break;
    //             case towertypes.magique:
    //                 mag+=to.totalmoney;
    //                 break;
    //             case towertypes.support:
    //                 sup+=to.totalmoney;
    //                 break;
    //         }
    //     });
    //     if(pri>300){
    //         mon.lives+=5;
    //         if(pri>1000){
    //             mon.dart.dam++;
    //             mon.pikespeed = 120;
    //             mon.piketspeed = 0;
    //             mon.pike = new DartsContainer(12,damagetype.darts, 15, tackssprite, 10, 20, false, 10);
    //             if(pri>2000){
    //                 mon.speed*=.75;
    //                 if(pri>4000){
    //                     mon.speed*=0.75;
    //                     mon.pikespeed-=30;
    //                     mon.pike.dam=25;
    //                     mon.pike.lives=20;
    //                     if(pri>7500){
    //                         mon.dart.dam++;
    //                         if(pri>10000){
    //                             mon.dart.lives+=5;
    //                             mon.speed*=0.75;
    //                             if(pri>15000){
    //                                 mon.dart.lives+=5;
    //                                 mon.dart.dam++;
    //                                 if(pri>25000){
    //                                     mon.dart.lives+=5;
    //                                     mon.dart.dam++;
    //                                     if(pri>50000){
    //                                         mon.speed*=0.75;
    //                                         mon.dart.dam++;
    //                                     }
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //             mon.shoot = function (ballon) {
    //                 let speed = this.dart.speed;
    //                 let dir = getdir(this.x, this.y, ballon.x, ballon.y);
    //                 let t = (ballon.x - this.x) / ((speed / 5 * ballon.speed) * cos(dir));
    //                 t *= ballon.speed / 4;
    //                 this.dir = getdir(this.x, this.y, ballon.x + (t * ballon.speed * cos(ballon.dir)), ballon.y + (t * ballon.speed * sin(ballon.dir)));
    //                 darts.push(new Dart(this.x, this.y, this.dir, this.dart,this));
    //                 if(this.piketspeed >= this.pikespeed) {
    //                     let x = this.x;
    //                     let y = this.y;
    //                     let r = this.r;
    //                     for (let dir = 0; dir < PI * 2; dir += PI / 4) {
    //                         let pike = new Dart(x, y, dir, this.pike, this);
    //                         pike.id += "" + dir;
    //                         pike.step = function () {
    //                             this.x += this.speed * cos(this.dir);
    //                             this.y += this.speed * sin(this.dir);
    //
    //                             if (dist(this.x, this.y, x, y) > r) {
    //                                 darts.splice(getdartsindex(this), 1);
    //                             }
    //                         }
    //                         darts.push(pike);
    //                     }
    //                     this.piketspeed-=this.pikespeed;
    //                 } else {
    //                     this.piketspeed++;
    //                 }
    //             };
    //         }
    //     }
    //     if(mili>300){
    //     }
    // })
    let LongRangeDarts = loadImage('sprites/LongRangeDarts.png');
    up[1][0] = new Upgrade("Super Range",LongRangeDarts,"Super Monkeys need Super Range.",1000,function(mon){mon.r+=mon.r/5});
    up[1][1] = new Upgrade("Epic Range",EpicRangeUpgradeIcon,"Why settle for super when you can have EPIC?",1400,function(mon){mon.dart.speed+=mon.dart.speed/4;mon.r+=mon.r/4})
    supermon.shoot = function (ballon) {
        let speed = this.dart.speed;
        let dir = getdir(this.x, this.y, ballon.x, ballon.y);
        let t = (ballon.x - this.x) / ((speed / 5 * ballon.speed) * cos(dir));
        t *= ballon.speed / 4;
        dir = getdir(this.x, this.y, ballon.x + (t * ballon.speed * cos(ballon.dir)), ballon.y + (t * ballon.speed * sin(ballon.dir)));
        if(isNaN(dir)){
            return;
        } else {
            this.dir = dir;
        }
        if(this.laser===1){
            let d1 = new Dart(this.x-((this.w/6)*cos(this.dir+PI/2)), this.y-((this.h/6)*sin(this.dir+PI/2)), this.dir, this.dart,this)
            let d2 = new Dart(this.x+((this.w/6)*cos(this.dir+PI/2)), this.y+((this.h/6)*sin(this.dir+PI/2)), this.dir, this.dart,this)
            d1.id+="d1";
            d2.id+="d2";
            darts.push(d1);
            darts.push(d2);
        } else if(this.laser===2){
            let d1 = new Dart(this.x, this.y, this.dir-PI/48, this.dart,this);
            let d2 = new Dart(this.x, this.y, this.dir, this.dart,this);
            let d3 = new Dart(this.x, this.y, this.dir+PI/48, this.dart,this);
            d1.id+="d1";
            d2.id+="d2";
            d3.id+="d3";
            darts.push(d1);
            darts.push(d2);
            darts.push(d3);
        }else{
            darts.push(new Dart(this.x, this.y, this.dir, this.dart,this));
        }
    };
    supermon.levels = up;
    supermon.description = "Super monkey for $\nThe best tower/monkey";
    statictowers.push(supermon);

    let ninjamonsprite = loadImage('sprites/monkey/ninja.png');
    ninjamon = new statictower("ninja", 45, 45, 200, 50, ninjamonsprite,500,2,towertypes.magique);
    ninjamon.camo=true;
    ninjamon.dart = new DartsContainer(12,damagetype.darts, 1,shurikensprite,30,30,true,2);
    up = [[],[],[]];
    let NinjaDiscipline = loadImage('sprites/NinjaDiscipline.png');
    let SharpShurikensUpgradeIcon = loadImage('sprites/SharpShurikensUpgradeIcon.png');
    let NinjaDoubleShotUpgradeIcon = loadImage('sprites/NinjaDoubleShotUpgradeIcon.png');
    let Bloonjitsu = loadImage('sprites/Bloonjitsu.png');
    let GrandmasterNinja = loadImage('sprites/GrandmasterNinja.png');
    let SeekingShurikenUpgradeIcon = loadImage('sprites/SeekingShurikenUpgradeIcon.png');
    up[0][0] = new Upgrade("Ninja Discipline",NinjaDiscipline,"Increases attack range and attack speed.",300,function(mon){mon.speed-=mon.speed/5;mon.r+=mon.r/5})
    up[0][1] = new Upgrade("Sharp Shurikens",SharpShurikensUpgradeIcon,"Shurikens can pop 4 Bloons each.",350,function(mon){mon.dart.lives+=2})
    up[0][2] = new Upgrade("Double Shot",NinjaDoubleShotUpgradeIcon,"Throws 2 shurikens at once.",850,function(mon){mon.dartamont=2});
    up[0][3] = new Upgrade("Bloonjitsu",Bloonjitsu,"Throws 5 shurikens at once!",2750,function(mon){mon.dartamont=5;});
    up[0][4] = new Upgrade("Grandmaster Ninja",GrandmasterNinja,"Throws incredibly fast, 8 shurikens per shot!",35000,function(mon){mon.dartamont=8;});
    up[2][0] = new Upgrade("Seeking Shuriken",SeekingShurikenUpgradeIcon,"Shurikens will seek out and pop Bloons automatically.",250,function(mon){let prio = mon.prio;let r = mon.r;mon.dart.step = function(){let balloon = null;let x = this.x;let y = this.y;let id = this.id;balloons.forEach(function (a) {if (dist(a.x, a.y, x, y) <= r&&!iteminlist(id,a.darts)) {if (balloon === null) {balloon = a;} else {switch (prio) {case 1:if(balloon.node < a.node){balloon = a;}break;case 2:if(getstaticbloonindex(balloon.bal.name) < getstaticbloonindex(a.bal.name)){balloon = a;}break;case 3:if(balloon.node > a.node){balloon = a;}break;case 4:if(dist(balloon.x,balloon.y,x,y) > dist(a.x,a.y,x,y)){balloon = a;}break;}}}});if(balloon!==null) {this.dir = getdir(this.x, this.y, balloon.x, balloon.y);}this.x += this.speed*cos(this.dir);this.y += this.speed*sin(this.dir);if(this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 700){darts.splice(getdartsindex(this),1);}}});
    ninjamon.init = function (mon){
        mon.dartamont = 1;
    }
    ninjamon.shoot = function (ballon) {
        let speed = this.dart.speed;
        let dir = getdir(this.x, this.y, ballon.x, ballon.y);
        let t = (ballon.x - this.x) / ((speed / 5 * ballon.speed) * cos(dir));
        t *= ballon.speed / 4;
        this.dir = getdir(this.x, this.y, ballon.x + (t * ballon.speed * cos(ballon.dir)), ballon.y + (t * ballon.speed * sin(ballon.dir)));
        for(let i = 0; i < this.dartamont;i++) {
            let d = new Dart(this.x, this.y, this.dir, this.dart, this);
            d.id+=""+i;
            darts.push(d);
        }
    };
    ninjamon.levels=up;
    ninjamon.description = "Ninja monkey for $\nthe ballons can't see him";
    statictowers.push(ninjamon);
}
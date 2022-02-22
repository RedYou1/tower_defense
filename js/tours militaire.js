let sniper,boat,heli;

function toursmilitaire(){
    let snipermonsprite = loadImage('sprites/monkey/sniper monkey.png');
    sniper = new statictower("sniper", 45, 45, 55, 100, snipermonsprite,350,2,towertypes.militaire);
    let up=[[],[],[]];
    sniper.dart = new DartsContainer(Infinity,damagetype.darts,2,null,1,1,false,1);
    let FullMetalJacketUpgradeIcon = loadImage('sprites/FullMetalJacketUpgradeIcon.png');
    let LargeCalibreUpgradeIcon = loadImage('sprites/LargeCalibreUpgradeIcon.png');
    let DeadlyPrecisionUpgradeIcon = loadImage('sprites/DeadlyPrecisionUpgradeIcon.png');
    let NightVisionGogglesUpgradeIcon = loadImage('sprites/NightVisionGogglesUpgradeIcon.png');
    let FastFiringUpgradeIcon = loadImage('sprites/FastFiringUpgradeIcon.png');
    let EvenFasterFiringUpgradeIcon = loadImage('sprites/EvenFasterFiringUpgradeIcon.png');
    let SemiAutomaticUpgradeIcon = loadImage('sprites/SemiAutomaticUpgradeIcon.png');
    let FullAutoRifleUpgradeIcon = loadImage('sprites/FullAutoRifleUpgradeIcon.png');
    let ShrapnelShotUpgradeIcon = loadImage('sprites/ShrapnelShotUpgradeIcon.png');
    let FragPiece = loadImage('sprites/FragPiece.png');
    let BouncingBulletUpgradeIcon = loadImage('sprites/BouncingBulletUpgradeIcon.png');
    let CashDropUpgradeIcon = loadImage('sprites/CashDropUpgradeIcon.png');
    let crate1 = loadImage('sprites/crate1.png');
    let crate2 = loadImage('sprites/crate2.png');
    let EliteSniperUpgradeIcon = loadImage('sprites/EliteSniperUpgradeIcon.png');
    let MaimMOABUpgradeIcon = loadImage('sprites/MaimMOABUpgradeIcon.png');
    let CrippleMoabUpgradeIcon = loadImage('sprites/CrippleMoabUpgradeIcon.png');
    let EliteDefenderUpgradeIcon = loadImage('sprites/EliteDefenderUpgradeIcon.png');
    up[0][0] = new Upgrade("Full Metal Jacket",FullMetalJacketUpgradeIcon,"Shots pop through 4 layers of bloon, and both bullets and shrapnel can pop Lead and Frozen Bloons.",350,function(mon){
        mon.dart.dam=4;
        mon.dart.type=damagetype.null;
        if(mon.levels[1]>1){
            mon.shipestdart.dam*=2;
            mon.shipestdart.type=damagetype.null;
        }
    })
    up[0][1] = new Upgrade("Large Calibre",LargeCalibreUpgradeIcon,"Shots can pop through 7 layers of Bloon.",1500,function(mon){
        mon.dart.dam=7;
        if(mon.levels[1]>1){
            mon.shipestdart.dam*=2;
        }
    })
    up[0][2] = new Upgrade("Deadly Precision",DeadlyPrecisionUpgradeIcon,"20 damage per shot, plus bonus damage to Ceramics.",3000,function(mon){
        mon.dart.dam=20;
        if(mon.levels[1]>1){
            mon.shipestdart.lives*=2;
        }
    })
    up[0][3] = new Upgrade("Maim MOAB",MaimMOABUpgradeIcon,"Immobilizes MOAB-Class Bloons for a short time.",5000,function(mon){
        mon.dart.effects[0] = new Effects("Maim MOAB",90,1,function(b){
            if(b.moab){b.speed=0;}
        },function(b){
            if(b.moab){b.speed=b.bspeed;}
        })
        mon.dam+=10;
    })
    up[0][4] = new Upgrade("Cripple MOAB",CrippleMoabUpgradeIcon,"Crippled MOABs are immobilized for longer and take extra damage from all other attacks.",40000,function(mon){
        mon.dart.effects[0].duration*=2;
        mon.dart.dam*=2;
    })
    up[1][0] = new Upgrade("Night Vision Goggles",NightVisionGogglesUpgradeIcon,"Allows the sniper to detect and do an additional 2 damage to Camo Bloons.",300,function(mon){
        mon.camo=true;
    })
    up[1][1] = new Upgrade("Shrapnel Shot",ShrapnelShotUpgradeIcon,"Damaged bloons spray out a cone of sharp shrapnel.",450,function(mon){
        mon.shipest=5;
        mon.shipestdart = new DartsContainer(24,mon.dart.type,Math.round(mon.dart.dam),FragPiece,20,20,false,(mon.levels[0]>2?4:2));
    })
    up[1][2] = new Upgrade("Bouncing Bullet",BouncingBulletUpgradeIcon,"Shots bounce to new targets up to 3 times.",3200,function(mon){
        mon.step = function(){
            if(this.tempspeed >= this.speed) {
                let balloon = bloonswithprio(this.x,this.y,Infinity,this.prio,this.prios,this.camo);
                if (balloon != null) {
                    this.shooted++;
                    if(this.shooted>=1000000000){this.shooted=0;}
                    this.shoot(balloon);
                    this.tempspeed -= this.speed;
                }
                balloon = bloonswithprio(this.x,this.y,Infinity,this.prio,this.prios,this.camo);
                if (balloon != null) {
                    this.shooted++;
                    if(this.shooted>=1000000000){this.shooted=0;}
                    this.shoot(balloon);
                    this.tempspeed -= this.speed;
                }
                balloon = bloonswithprio(this.x,this.y,Infinity,this.prio,this.prios,this.camo);
                if (balloon != null) {
                    this.shooted++;
                    if(this.shooted>=1000000000){this.shooted=0;}
                    this.shoot(balloon);
                    this.tempspeed -= this.speed;
                }
            } else {
                this.tempspeed++;
            }
        }
    })
    up[1][3] = new Upgrade("Supply Drop",CashDropUpgradeIcon,"Supply Drop ability: Drops a crate full of cash.",7200,function(mon){
        let ab = new Ability("Supply Drop",CashDropUpgradeIcon,3600,1,function(){
            let ban = new Dart(random(0,1200),random(0,700),0,new DartsContainer(0,null,Math.round(random(500,1000)),crate1,40,40,false,Infinity),mon)
            bananes.push(ban);
        },function(){

        })
        mon.ab = ab.name;
        abilities.push(ab);
    })
    up[1][4] = new Upgrade("Elite Sniper",EliteSniperUpgradeIcon,"Supply Drop gives much more cash. Grants Elite targeting prio and faster reload to all snipers.",13000,function(mon){
        removeabi("Supply Drop");
        let ab = new Ability("Elite Sniper",EliteSniperUpgradeIcon,3600,1,function(){
            let ban = new Dart(random(0,1200),random(0,700),0,new DartsContainer(0,null,Math.round(random(1500,2500)),crate2,40,40,false,Infinity),mon)
            bananes.push(ban);
        },function(){

        })
        mon.ab = ab.name;
        abilities.push(ab);
        let boo = new Boosts("Elite Sniper",function(bo){
            let to = towers[gettowerindex(bo.tower)];
            to.speed*=.6;
            to.mons=[];
            towers.forEach(function(a){
                if(a.tower.name==="sniper"){
                    to.mons.push(a);
                }
            })
            to.mons.forEach(function(a){
                a.speed*=2;
                a.speed/=3;
            })
        },function(bo){
            let to = towers[gettowerindex(bo.tower)];
            to.speed/=.6;
            to.mons.forEach(function(a){
                a.speed*=3;
                a.speed/=2;
            })
        },mon)
        mon.bo = boo.name;
        boosts.push(boo);
    })
    up[2][0] = new Upgrade("Fast Firing",FastFiringUpgradeIcon,"Shoots faster than normal.",400,function(mon){
        mon.speed=75
    })
    up[2][1] = new Upgrade("Even Faster Firing",EvenFasterFiringUpgradeIcon,"Shoots even faster!",400,function(mon){
        mon.speed=50
    })
    up[2][2] = new Upgrade("Semi-Automatic",SemiAutomaticUpgradeIcon,"Attacks 3x as fast!",3500,function(mon){
        mon.speed=16
    })
    up[2][3] = new Upgrade("Full Auto Rifle",FullAutoRifleUpgradeIcon,"Fully automatic weapon with incredible popping power",4750,function(mon){
        mon.speed=8;
        mon.dart.type=damagetype.null
    })
    up[2][4] = new Upgrade("Elite Defender",EliteDefenderUpgradeIcon,"A lost life gives this Sniper 4x attack speed for a short time in retaliation. Also attacks faster the further the Bloons are along the track.",14000,function(mon){
        mon.speed=4;
        mon.step = function(){
            if(this.tempspeed >= this.speed) {
                let balloon = bloonswithprio(this.x,this.y,Infinity,this.prio,this.prios,this.camo);
                if (balloon != null) {
                    this.shooted++;
                    if(this.shooted>=1000000000){this.shooted=0;}
                    this.shoot(balloon);
                    this.tempspeed+=4*((balloon.node+1)/mymap.nodes.length);
                    this.tempspeed -= this.speed;
                }
            } else {
                this.tempspeed++;
            }
        }
    })
    sniper.shoot = function (ballon) {
        this.dir = getdir(this.x, this.y, ballon.x, ballon.y);
        let dam = this.dart.dam;
        if(dam>=20&&ballon.bal.name==="ceramique"){dam+=15;}
        if(ballon.camo){dam+=2;}
        let a = ballon.hitted(new Dart(this.x,this.y,0,this.dart,this), dam);
        if(a!=="resisted") {
            this.damcont += a;
        }
        if(this.shipest===undefined){this.shipest=0}
        if(this.shipest>0){
            for(let i = -PI/8;i<=PI/8;i+=PI/(8*(this.shipest-1))){
                let dart = new Dart(ballon.x,ballon.y,getdir(this.x,this.y,ballon.x,ballon.y)+i,this.shipestdart,this);
                dart.id+=''+i;
                darts.push(dart);
            }
        }
    };
    sniper.step = function(){
        if(this.tempspeed >= this.speed) {
            let balloon = bloonswithprio(this.x,this.y,Infinity,this.prio,this.prios,this.camo);
            if (balloon != null) {
                this.shooted++;
                if(this.shooted>=1000000000){this.shooted=0;}
                this.shoot(balloon);
                this.tempspeed -= this.speed;
            }
        } else {
            this.tempspeed++;
        }
    }
    sniper.levels=up;
    sniper.description = "Sniper monkey for $\nCan see the ballon\nfrom every were";
    statictowers.push(sniper);

    let boatmonsprite = loadImage('sprites/monkey/boat monkey.png');
    boat = new statictower("boat", 50, 50, 225, 60, boatmonsprite,500,1,towertypes.militaire);
    boat.dart = new DartsContainer(12,damagetype.darts, 1,dartssprite,8,40,false,1);
    let GrapeShot = loadImage('sprites/GrapeShot.png');
    boat.grape = new DartsContainer(12,damagetype.darts,1,GrapeShot,15,15,false,1);

    up = [[],[],[]];
    let FasterShootingUpgradeIcon = loadImage('sprites/FasterShootingUpgradeIcon.png');
    let DoubleShotUpgradeIcon = loadImage('sprites/DoubleShotUpgradeIcon.png');
    let GrapeShotUpgradeIcon = loadImage('sprites/GrapeShotUpgradeIcon.png');
    let DestroyerUpgradeIcon = loadImage('sprites/DestroyerUpgradeIcon.png');
    let HotShotUpgradeIcon = loadImage('sprites/HotShotUpgradeIcon.png');
    let HotShot = loadImage('sprites/HotShot.png');
    let LongRangeUpgradeIcon = loadImage('sprites/LongRangeUpgradeIcon.png');
    let CrowsNestUpgradeIcon = loadImage('sprites/CrowsNestUpgradeIcon.png');
    let MerchantmanUpgradeIcon = loadImage('sprites/MerchantmanUpgradeIcon.png');
    let AircraftCarrierUpgradeIcon = loadImage('sprites/AircraftCarrierUpgradeIcon.png');
    let MonkeyAce = loadImage('sprites/MonkeyAce.png');
    let CarrierFlagshipUpgradeIcon = loadImage('sprites/CarrierFlagshipUpgradeIcon.png');
    up[0][0] = new Upgrade("Faster Shooting",FasterShootingUpgradeIcon,"All weapons on board shoot 33% faster.",350,function(mon){
        mon.speed-=mon.speed/3
    })
    up[0][1] = new Upgrade("Double Shot",DoubleShotUpgradeIcon,"Double ship weapons fired.",500,function(mon){
        mon.time = 1;
    })
    up[0][2] = new Upgrade("Destroyer",DestroyerUpgradeIcon,"Attacks super duper fast!",2950,function(mon){
        mon.speed/=5;
    })
    up[0][3] = new Upgrade("Aircraft Carrier",AircraftCarrierUpgradeIcon,"Launches waves of fighter planes that strafe their targets and fire missiles at MOAB class Bloons.",7500,function(mon){
        mon.acc = new DartsContainer(12,damagetype.darts, 15,dartssprite,8,40,false,3);
        let planes = new Boosts("planes",function(bo){
            let to = towers[gettowerindex(bo.tower)];
            for(let i = 0; i < gamespeed;i++){
                bo.x1+=bo.speed*cos(bo.dir1);
                bo.x2+=bo.speed*cos(bo.dir2);
                bo.x3+=bo.speed*cos(bo.dir3);
                bo.y1+=bo.speed*sin(bo.dir1);
                bo.y2+=bo.speed*sin(bo.dir2);
                bo.y3+=bo.speed*sin(bo.dir3);
                if(bo.x1<100||bo.x1>1100||bo.y1<100||bo.y1>600){
                    bo.d1=true;
                }
                let fn = function(x,y){
                    return x+.05>=y&&x-.05<=y;
                }
                if(bo.d1===true){
                    if(fn(bo.dir1,getdir(bo.x1,bo.y1,to.x,to.y))){
                        bo.d1=false;
                    } else {
                        bo.dir1+=.1;
                        if(bo.dir1>=PI){
                            bo.dir1-=TWO_PI
                        }
                    }
                }
                if(bo.x2<100||bo.x2>1100||bo.y2<100||bo.y2>600){
                    bo.d2=true;
                }
                if(bo.d2===true){
                    if(fn(bo.dir2,getdir(bo.x2,bo.y2,to.x,to.y))){
                        bo.d2=false;
                    } else {
                        bo.dir2+=.1;
                        if(bo.dir2>=PI){
                            bo.dir2-=TWO_PI
                        }
                    }
                }
                if(bo.x3<100||bo.x3>1100||bo.y3<100||bo.y3>600){
                    bo.d3=true;
                }
                if(bo.d3===true){
                    if(fn(bo.dir3,getdir(bo.x3,bo.y3,to.x,to.y))){
                        bo.d3=false;
                    } else {
                        bo.dir3+=.1;
                        if(bo.dir3>=PI){
                            bo.dir3-=TWO_PI
                        }
                    }
                }

                bo.ts--;
                if(bo.ts<=0){
                    for(let di = 0; di<TWO_PI;di+=TWO_PI/12){
                        let dart = new Dart(bo.x1,bo.y1,bo.dir1+di,to.acc,to);
                        dart.id+=''+bo.dir1+di;
                        darts.push(dart);
                        dart = new Dart(bo.x2,bo.y2,bo.dir2+di,to.acc,to);
                        dart.id+=''+bo.dir2+di;
                        darts.push(dart);
                        dart = new Dart(bo.x3,bo.y3,bo.dir3+di,to.acc,to);
                        dart.id+=''+bo.dir3+di;
                        darts.push(dart);
                    }
                    bo.ts+=to.acc.s;
                }
            }
            push();
            translate(bo.x1*sx,bo.y1*sy);
            rotate(bo.dir1);
            image(MonkeyAce,-15*sx,-15*sy,30*sx,30*sy);
            pop();
            push();
            translate(bo.x2*sx,bo.y2*sy);
            rotate(bo.dir2);
            image(MonkeyAce,-15*sx,-15*sy,30*sx,30*sy);
            pop();
            push();
            translate(bo.x3*sx,bo.y3*sy);
            rotate(bo.dir3);
            image(MonkeyAce,-15*sx,-15*sy,30*sx,30*sy);
            pop();
        },function(bo){
        },mon);
        planes.speed=5;
        planes.x1=mon.x;
        planes.x2=mon.x;
        planes.x3=mon.x;
        planes.y1=mon.y;
        planes.y2=mon.y;
        planes.y3=mon.y;
        mon.acc.s = 120;
        planes.ts = 120;
        planes.dir1 = 0;
        planes.dir2 = -PI+(PI/4);
        planes.dir3 = PI-(PI/4);
        mon.bo=planes.name;
        boosts.push(planes);
    })
    up[0][4] = new Upgrade("Carrier Flagship",CarrierFlagshipUpgradeIcon,"Does extra damage. Can place other Monkeys on the upper decks of the ship and increases attack speed of all water based Monkeys and Monkey Aces.",25000,function(mon){
        mon.acc.lives++;
        mon.acc.s/=2;
        mon.acc.dam*=2;
    })
    up[1][0] = new Upgrade("Grape Shot",GrapeShotUpgradeIcon,"Adds a spray of 5 sharpened grapes to the ship.",500,function(mon){
        mon.shoot = function(ballon){
            if(this.time===undefined){this.time=0;}
            let speed = this.dart.speed;
            let dir = getdir(this.x, this.y, ballon.x, ballon.y);
            let t = (ballon.x - this.x) / ((speed / 5 * ballon.speed) * cos(dir));
            t *= ballon.speed / 4;
            this.dir = getdir(this.x, this.y, ballon.x + (t * ballon.speed * cos(ballon.dir)), ballon.y + (t * ballon.speed * sin(ballon.dir)));
            for(let t = -this.time;t<=this.time;t+=1+this.time) {
                for (let i = 0; i <= PI; i += PI) {
                    let d = new Dart(this.x, this.y, this.dir + i+ (t*PI/30), this.dart, this);
                    d.id+="dart"+i+""+t
                    darts.push(d);
                    for (let a = PI / 6; a < PI - PI / 10; a += PI / 6) {
                        let s = new Dart(this.x, this.y, this.dir + a + i+ (t*PI/30) + PI / 2, this.grape, this)
                        s.id+="grape"+i+""+a+""+t;
                        darts.push(s);
                    }
                }
            }
            this.dir += PI/2;
        }
    })
    let CannonShipUpgradeIcon = loadImage('sprites/CannonShipUpgradeIcon.png');
    up[1][1] = new Upgrade("Hot Shot",HotShotUpgradeIcon,"Burning hot grape shot can pop Lead Bloons and set Bloons on fire.",500,function(mon){
        mon.grape.type = damagetype.fire;
        mon.grape.sprite = HotShot;
    })
    up[1][2] = new Upgrade("Cannon Ship",CannonShipUpgradeIcon,"Adds a powerful cannon that shoots out powerful bombs.",900,function(mon){
        mon.bombe = new DartsContainer(12,damagetype.explosions, 1, BombSprite, 15, 20, false, 28);
        mon.lbombe = new DartsContainer(12,damagetype.darts,1,FragPiece,10,10,false,1);
        mon.shoot = function(ballon){
            if(this.time===undefined){this.time=0;}
            let speed = this.dart.speed;
            let dir = getdir(this.x, this.y, ballon.x, ballon.y);
            let dart = new Dart(this.x,this.y,dir,this.bombe,this);
            dart.dx = ballon.x;
            dart.dy = ballon.y;
            dart.step = function(){
                this.x += this.speed*cos(this.dir);
                this.y += this.speed*sin(this.dir);
                let dx = this.dx-this.x;
                let dy = this.dy-this.y;
                if(dx*dx+dy*dy<=this.speed*this.speed){
                    this.stower.explode(this);
                }
                if(this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 700){
                    this.stower.explode(this);
                }
            }
            darts.push(dart);
            let t = (ballon.x - this.x) / ((speed / 5 * ballon.speed) * cos(dir));
            t *= ballon.speed / 4;
            this.dir = getdir(this.x, this.y, ballon.x + (t * ballon.speed * cos(ballon.dir)), ballon.y + (t * ballon.speed * sin(ballon.dir)));
            for(let t = -this.time;t<=this.time;t+=1+this.time) {
                for (let i = 0; i <= PI; i += PI) {
                    let d = new Dart(this.x, this.y, this.dir + i+ (t*PI/30), this.dart, this);
                    d.id+="dart"+i+""+t
                    darts.push(d);
                    for (let a = PI / 6; a < PI - PI / 10; a += PI / 6) {
                        let s = new Dart(this.x, this.y, this.dir + a + i+ (t*PI/30) + PI / 2, this.grape, this)
                        s.id+="grape"+i+""+a+""+t;
                        darts.push(s);
                    }
                }
            }

            this.dir += PI/2;
        }
        mon.explode = function(dart){
            let x = dart.x;
            let y = dart.y;
            let n = [];
            balloons.forEach(function (b) {
                let dx = b.x-x;
                let dy = b.y-y;
                if (dx*dx+dy*dy<=BombTower.dart.range*BombTower.dart.range) {
                    n.push(b);
                }
            });
            if(n.length>dart.lives) {
                n.sort(function (a, b) {
                    let ax = a.x - x;
                    let ay = a.y - y;
                    let bx = b.x - x;
                    let by = b.y - y;
                    return (ax * ax + ay * ay) - (bx * bx + by * by);
                });
            }
            for(let i = 0;i<n.length&&i<dart.lives;i++){
                let b = n[i];
                let h = b.hitted(dart, dart.dam);
                towers[dart.tower].damcont += (isNaN(h)?0:h);
            }
            let r = random(0,2*PI);
            for(let i = 0; i < PI*2;i+=(2*PI)/8){
                let d = new Dart(dart.x,dart.y,i+r,this.lbombe,this);
                d.id+="sec"+i;
                darts.push(d);
            }
            darts.splice(getdartsindex(dart), 1);
        }
    })
    let MonkeyPiratesUpgradeIcon = loadImage('sprites/MonkeyPiratesUpgradeIcon.png');
    let MonkeyPiratesUpgradeIconAA = loadImage('sprites/MonkeyPiratesUpgradeIconAA.png');
    up[1][3] = new Upgrade("Monkey Pirates",MonkeyPiratesUpgradeIcon,"Adds 2 cannons to the ship and cannon attacks do more damage. MOAB Takedown Ability: harpoons a MOAB class Bloon and brings it down.",4500,function(mon){
        mon.bombe.dam++;
        let ab = new Ability("Monkey Pirates",MonkeyPiratesUpgradeIconAA,3000,1,function(a){
            let b = null;
            balloons.forEach(function (a) {
                if(a.moab===true&&a.bal.name!=="ZOMG"&&a.bal.name!=="BAD") {
                    if (b === null) {
                        b = a;
                    } else if (getstaticbloonindex(b.bal.name) < getstaticbloonindex(a.bal.name)) {
                        b = a;
                    }
                }
            });
            if(b!==null){
                let to = towers[gettowerindex(a.tower)];
                to.damcont+=b.hp;
                balloons.splice(getbloonsindex(b),1);
                switch(b.bal.name){
                    case "DDT":
                    case "MOAB":
                        money+=381;
                        break;
                    case "BFB":
                        money+=1524;
                        break;
                }
            } else {
                a.remain=0;
                a.dremain=0;
            }
        },function(a){

        })
        ab.tower = mon;
        mon.ab = ab.name;
        abilities.push(ab);
    })
    let PirateLordUpgradeIcon = loadImage('sprites/PirateLordUpgradeIcon.png');
    let PirateLordUpgradeIconAA = loadImage('sprites/PirateLordUpgradeIconAA.png');
    up[1][4] = new Upgrade("Pirate Lord",PirateLordUpgradeIcon,"Can shoot 3 grappling hooks at once, and plunder extra cash from each MOAB-Class Bloon brought down with them.",21000,function(mon){
        removeabi("Monkey Pirates");
        mon.speed/=2;
        mon.dart.dam+=5;
        mon.grape.dam+=5;
        mon.bombe.dam+=5;
        let ab = new Ability("Pirate Lord",PirateLordUpgradeIconAA,3000,1,function(a){
            for(let i =0;i<3;i++) {
                let b = null;
                balloons.forEach(function (a) {
                    if (a.moab === true &&(a.bal.name !== "ZOMG"||i<2)&& a.bal.name !== "BAD") {
                        if (b === null) {
                            b = a;
                        } else if (getstaticbloonindex(b.bal.name) < getstaticbloonindex(a.bal.name)) {
                            b = a;
                        }
                    }
                });
                if (b !== null) {
                    if(b.bal.name === "ZOMG"){
                        i++;
                    }
                    let to = towers[gettowerindex(a.tower)];
                    to.damcont += b.hp;
                    balloons.splice(getbloonsindex(b), 1);
                    switch(b.bal.name){
                        case "DDT":
                        case "MOAB":
                            money+=762;
                            break;
                        case "BFB":
                            money+=3048;
                            break;
                        case "ZOMG":
                            money+=12193;
                            break;
                    }
                } else {
                    a.remain -= a.cooldown/3;
                    a.dremain -= a.duration/3;
                }
            }
        },function(a){

        })
        ab.tower = mon;
        mon.ab = ab.name;
        abilities.push(ab);
    })
    up[2][0] = new Upgrade("Merchantman",LongRangeUpgradeIcon,"Much longer range.",180,function(mon){mon.r*=7/6;mon.dart.speed*=1.25;mon.grape.speed*=1.25;})
    up[2][1] = new Upgrade("Crow's Nest",CrowsNestUpgradeIcon,"Allows the ship to hit Camo Bloons.",400,function(mon){mon.camo=true;})
    up[2][2] = new Upgrade("Merchantman",MerchantmanUpgradeIcon,"Generates cash each round automatically.",2300,function(mon){
        mon.marc=0;
        mon.marc2=0;
        mon.morx=0;
        mon.money=200;
        mon.round=yourround
        mon.step = function(){
            this.marc2=this.marc+this.morx;
            if(this.round<yourround){
                this.round=yourround;
                earn(this.money*(this.marc2*0.1+1));
            }
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
    })
    let FavoredTradesUpgradeIcon = loadImage('sprites/FavoredTradesUpgradeIcon.png');
    let TradeEmpireUpgradeIcon = loadImage('sprites/TradeEmpireUpgradeIcon.png');
    up[2][3] = new Upgrade("Favored Trades",FavoredTradesUpgradeIcon,"Attacks faster and generates lots of money per round. Monkeys in radius have increased sell value.",5500,function(mon){
        mon.money=500;
        mon.speed/=2;
        let boo = new Boosts("Favored Trades",function(bo){
            let to = towers[gettowerindex(bo.tower)];
            to.mons=[];
            towers.forEach(function(a){
                if(a.tower.name==="boat"&&a.levels[2]>=3){
                    if(to.mons.length<10){
                        a.marx++;
                        to.mons.push(a);
                    }
                }
            })
        },function(bo){
            towers[gettowerindex(bo.tower)].mons.forEach(function(a){
                a.marx=0;
            })
        },mon)
        mon.bo = boo.name;
        boosts.push(boo);
    })
    up[2][4] = new Upgrade("Trade Empire",TradeEmpireUpgradeIcon,"Generates more cash per round",23000,function(mon){
        mon.money=900;
    })
    boat.init=function(mon){
        mon.time=0;
        mon.grape=new DartsContainer(mon.tower.grape.speed,mon.tower.grape.type,mon.tower.grape.dam,mon.tower.grape.sprite,mon.tower.grape.w,mon.tower.grape.h,mon.tower.grape.turn,mon.tower.grape.lives);
    }
    boat.shoot = function (ballon) {
        let speed = this.dart.speed;
        let dir = getdir(this.x, this.y, ballon.x, ballon.y);
        let t = (ballon.x - this.x) / ((speed / 5 * ballon.speed) * cos(dir));
        t *= ballon.speed / 4;
        this.dir = getdir(this.x, this.y, ballon.x + (t * ballon.speed * cos(ballon.dir)), ballon.y + (t * ballon.speed * sin(ballon.dir)));
        for(let t = -this.time;t<=this.time;t+=1+this.time) {
            for (let i = 0; i <= PI; i += PI) {
                let d = new Dart(this.x, this.y, this.dir + i + (t*PI/30), this.dart, this);
                d.id+="dart"+i+""+t;
                darts.push(d);
            }
        }
        this.dir += PI/2;
    };
    boat.levels=up;
    boat.description = "Boat for $\nA great maritime tower";
    statictowers.push(boat);

    let helipad = loadImage('sprites/monkey/heli port.gif');
    let helipilot = loadImage('sprites/monkey/Heli Pilot.png');
    heli = new statictower("heli", 75, 75, 75, 60, helipilot,1600,2,towertypes.militaire);
    heli.dart = new DartsContainer(12,damagetype.darts, 1,dartssprite,8,40,false,2);
    up = [[],[],[]];

    let QuadDartsUpgradeIcon = loadImage('sprites/QuadDartsUpgradeIcon.png');
    let PursuitUpgradeIcon = loadImage('sprites/PursuitUpgradeIcon.png');
    up[0][0] = new Upgrade("Quad Darts",QuadDartsUpgradeIcon,"Shoots 4 darts per volley instead of 2.",800,function(mon){
        mon.time=4;
    })
    up[0][1] = new Upgrade("Pursuit",PursuitUpgradeIcon,"A new targeting option enables Heli to seek and pursue the Bloons automatically.",500,function(mon){
        mon.prios.push(["Pursuit",function(balloon,a){
            if(balloon.node < a.node){
                this.x = a.x;
                this.y = a.y;
                this.dir = a.dir;
                return true;
            } else {
                this.x = balloon.x;
                this.y = balloon.y;
                this.dir = balloon.dir;
                return false;
            }
        }]);
        mon.step = function(){
            let x = mouseX;
            let y = mouseY;
            if(this.prio===4) {
                bloonswithprio(600,350,700,4,this.prios,this.camo)
                let fu = this.prios[4];
                if(fu.x!==undefined&&fu.y!==undefined&&fu.dir!==undefined) {
                    x = fu.x + 10 * cos(fu.dir);
                    y = fu.y + 10 * sin(fu.dir);
                }
            }
            helifis(this,x,y)
            if(this.tempspeed >= this.speed) {
                let balloon = bloonswithprio(this.hx,this.hy,this.r*3,this.prio,this.prios,this.camo);
                if (balloon != null) {
                    this.shooted++;
                    if(this.shooted>=1000000000){this.shooted=0;}
                    this.shoot(balloon);
                    this.tempspeed -= this.speed;
                }
            } else {
                this.tempspeed++;
            }
        }
    })
    let RazorRotorsUpgradeIcon = loadImage('sprites/RazorRotorsUpgradeIcon.png');
    up[0][2] = new Upgrade("Razor Rotors",RazorRotorsUpgradeIcon,"Razor Rotor blades rip up Bloons on contact, including Lead and Frozen Bloons.",1750,function(mon){
        mon.helic = 45;
        mon.step = function(){
            let x = mouseX;
            let y = mouseY;
            if(this.prio===4) {
                bloonswithprio(600,350,700,4,this.prios,this.camo)
                let fu = this.prios[4];
                if(fu.x!==undefined&&fu.y!==undefined&&fu.dir!==undefined) {
                    x = fu.x + 10 * cos(fu.dir);
                    y = fu.y + 10 * sin(fu.dir);
                }
            }
            helifis(this,x,y)
            if(this.helic<=0){
                let n = [];
                let c = this.hx;
                let b = this.hy;
                let r = this.w*3/4;
                balloons.forEach(function(a){
                    let dx = a.x-c;
                    let dy = a.y-b;
                    if(dx*dx+dy*dy<=r*r&&n.length<=10){
                        n.push(a)
                    }
                })
                n.forEach(function(a){
                    a.hitted("void",1);
                })
                this.helic=45;
            }
            if(this.tempspeed >= this.speed) {
                let balloon = bloonswithprio(this.hx,this.hy,this.r*3,this.prio,this.prios,this.camo);
                if (balloon != null) {
                    this.shooted++;
                    if(this.shooted>=1000000000){this.shooted=0;}
                    this.shoot(balloon);
                    this.tempspeed -= this.speed;
                }
            } else {
                this.tempspeed++;
            }
        }
    })

    let ApacheDartshipUpgradeIcon = loadImage('sprites/ApacheDartshipUpgradeIcon.png');
    let ApacheMissile = loadImage('sprites/ApacheMissile.png');
    up[0][3] = new Upgrade("Apache Dartship",ApacheDartshipUpgradeIcon,"Adds a large missile array and powerful machine guns.",19600,function(mon){
        mon.dart.dam=2;
        mon.dart.lives=40;
        mon.dart.sprite=ApacheMissile

        mon.mini = new DartsContainer(12,damagetype.darts, 1,dartssprite,8,40,false,5);
        mon.speed=3;

        mon.tmspeed=0;
        mon.mspeed=20;

        mon.shoot = function(ballon){
            let speed = this.dart.speed;
            let dir = getdir(this.hx, this.hy, ballon.x, ballon.y);
            let t = (ballon.x - this.hx) / ((speed / 5 * ballon.speed) * cos(dir));
            t *= ballon.speed / 4;
            this.dir = getdir(this.hx, this.hy, ballon.x + (t * ballon.speed * cos(ballon.dir)), ballon.y + (t * ballon.speed * sin(ballon.dir)));

            let dart = new Dart(this.hx,this.hy,this.dir,this.mini,this);
            dart.id+="mini";
            darts.push(dart);

            this.tmspeed++;
            if(this.tmspeed>=this.mspeed){
                for(let i = 0; i < this.time;i++){
                    let a = (-10*cos(this.dir+PI/2))+(20*i*(cos(this.dir+PI/2)/(this.time-1)));
                    let b = (-10*sin(this.dir+PI/2))+(20*i*(sin(this.dir+PI/2)/(this.time-1)));
                    dart = new Dart(this.hx+a,this.hy+b,this.dir,this.dart,this);
                    dart.id+=""+i;
                    darts.push(dart)
                }
                this.tmspeed-=this.mspeed;
            }
        }
    })
    let ApachePrimeUpgradeIcon = loadImage('sprites/ApachePrimeUpgradeIcon.png');
    let ApacheLaserPulse = loadImage('sprites/ApacheLaserPulse.png');
    let PlasmaBullet = loadImage('sprites/PlasmaBullet.png');
    up[0][4] = new Upgrade("Apache Prime",ApachePrimeUpgradeIcon,"The Apache Prime leaves most Bloons wishing they'd never been inflated.",45000,function(mon){
        mon.dart.lives=11;
        mon.mini.lives=23;
        mon.dart.dam=6;
        mon.mini.dam=5;
        mon.dart.sprite=ApacheLaserPulse
        mon.mini.sprite=PlasmaBullet
        mon.dart.type=damagetype.null
        mon.mini.type=damagetype.plasma;
    })
    let BiggerJetsUpgradeIcon = loadImage('sprites/BiggerJetsUpgradeIcon.png');
    up[1][0] = new Upgrade("Bigger Jets",BiggerJetsUpgradeIcon,"Powerful jets make Heli move much faster.",300,function(mon){
        mon.hspeed*=1.75;
    })
    let IFRUpgradeIcon = loadImage('sprites/IFRUpgradeIcon.png');
    up[1][1] = new Upgrade("IFR",IFRUpgradeIcon,"Allows Heli Pilot to detect and shoot Camo Bloons.",600,function(mon){
        mon.camo=true;
    })

    heli.draw = function(){
        image(helipad,-this.w/2*sx,-this.h/2*sy,this.w*sx,this.w*sx);
        pop();
        push();
        translate(this.hx,this.hy);
        rotate(this.dir+PI);
        image(helipilot,-this.w*3/4*sx,-this.h/2*sy,this.w*3/2*sx,this.h*sy);
    }
    heli.init = function(mon){
        mon.time=2;
        mon.hx=mon.x;
        mon.hy=mon.y;
        mon.hspeed=4;
    }
    heli.shoot = function (ballon) {
        let speed = this.dart.speed;
        let dir = getdir(this.hx, this.hy, ballon.x, ballon.y);
        let t = (ballon.x - this.hx) / ((speed / 5 * ballon.speed) * cos(dir));
        t *= ballon.speed / 4;
        this.dir = getdir(this.hx, this.hy, ballon.x + (t * ballon.speed * cos(ballon.dir)), ballon.y + (t * ballon.speed * sin(ballon.dir)));

        for(let i = 0; i < this.time;i++){
            let a = (-10*cos(this.dir+PI/2))+(20*i*(cos(this.dir+PI/2)/(this.time-1)));
            let b = (-10*sin(this.dir+PI/2))+(20*i*(sin(this.dir+PI/2)/(this.time-1)));
            let dart = new Dart(this.hx+a,this.hy+b,this.dir,this.dart,this);
            dart.id+=""+i;
            darts.push(dart)
        }
    };
    heli.step = function(){
        helifis(this,mouseX,mouseY)
        if(this.tempspeed >= this.speed) {
            let balloon = bloonswithprio(this.hx,this.hy,this.r*3,this.prio,this.prios,this.camo);
            if (balloon != null) {
                this.shooted++;
                if(this.shooted>=1000000000){this.shooted=0;}
                this.shoot(balloon);
                this.tempspeed -= this.speed;
            }
        } else {
            this.tempspeed++;
        }
    }
    heli.levels=up;
    heli.description = "helicopter for $\nA flying machine";
    statictowers.push(heli);
}
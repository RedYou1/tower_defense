let dartsmon,Boomerang,BombTower,tacksmon,icemon,gluegunner,BombSprite;

function toursprimaire(){
    let dartsmonsprite = loadImage('sprites/monkey/darts monkey.png');
    dartsmon = new statictower("dart", 45, 45, 125, 60, dartsmonsprite,200,2,towertypes.primaire);
    dartsmon.shoot = function (ballon) {
        let speed = this.dart.speed;
        let dir = getdir(this.x, this.y, ballon.x, ballon.y);
        let t = (ballon.x - this.x) / ((speed / 5 * ballon.speed) * cos(dir));
        t *= ballon.speed / 4;
        this.dir = getdir(this.x, this.y, ballon.x + (t * ballon.speed * cos(ballon.dir)), ballon.y + (t * ballon.speed * sin(ballon.dir)));
        let dart = new Dart(this.x, this.y, this.dir, this.dart,this);
        if(this.nocera===true&&ballon.bal.name==="ceramique"){dart.dam*=3;}
        darts.push(dart);
    };
    dartsmon.description = "Darts monkey for $\nShoots darts slowly,\nbut can be usefull in early game";
    dartsmon.dart = new DartsContainer(12,damagetype.darts, 1,dartssprite,8,40,false,2);
    let up = [[],[],[]];
    let SharpShots = loadImage('sprites/SharpShots.png');
    let RazorSharpShots = loadImage('sprites/RazorSharpShots.png');
    let SpikeOPult = loadImage('sprites/SpikeOPult.png');
    let JuggernautUpgradeIcon = loadImage('sprites/JuggernautUpgradeIcon.png');
    let UltraJuggernautUpgradeIcon = loadImage('sprites/UltraJuggernautUpgradeIcon.png');
    let QuickShotsUpgradeIcon = loadImage('sprites/QuickShotsUpgradeIcon.png');
    let VeryQuickShotsUpgradeIcon = loadImage('sprites/VeryQuickShotsUpgradeIcon.png');
    let TripleShotUpgradeIcon = loadImage('sprites/TripleShotUpgradeIcon.png');
    let SuperMonkeyFanClubUpgradeIcon = loadImage('sprites/SuperMonkeyFanClubUpgradeIcon.png');
    let LongRangeDarts = loadImage('sprites/LongRangeDarts.png');
    let EnhancedEyesight = loadImage('sprites/EnhancedEyesight.png');
    let PMFCUpgradeIcon = loadImage('sprites/PMFCUpgradeIcon.png');
    let CrossbowUpgradeIcon = loadImage('sprites/CrossbowUpgradeIcon.png');
    let SharpShooterUpgradeIcon = loadImage('sprites/SharpShooterUpgradeIcon.png');
    let CrossbowMasterUpgradeIcon = loadImage('sprites/CrossbowMasterUpgradeIcon.png');
    up[0][0] = new Upgrade("Sharp Shots",SharpShots,"Can pop 1 extra Bloon per shot. (3)",140,function(mon){mon.dart.lives++;});
    up[0][1] = new Upgrade("Razor Sharp Shots",RazorSharpShots,"Can pop 2 more Bloons per shot. (5)",220,function(mon){mon.dart.lives+=2;})
    up[0][2] = new Upgrade("Spike-O-Pult",SpikeOPult,"Good range, but slower attack speed. Each dart can pop lots of Bloons. (22)",300,function(mon){mon.dart.lives+=17;mon.dart.sprite=SpikeOPult;mon.dart.w=20;mon.dart.h=20;});
    up[0][3] = new Upgrade("Juggernaut",JuggernautUpgradeIcon,"Hurls a giant spiked ball that excels at crushing Ceramic Bloons.",1800,function(mon){mon.dart.type=damagetype.null;mon.dart.lives = 100;mon.dart.sprite = JuggernautUpgradeIcon;mon.dart.w=25;mon.dart.h=25;this.nocera=true;mon.r+=mon.r*.15;mon.speed*=.87})
    up[0][4] = new Upgrade("Ultra-Juggernaut",UltraJuggernautUpgradeIcon,"Gigantic spiked ball splits twice into 6 Juggernaut balls for even more destructive power.",15000,function(mon){
        mon.dart.dam*=4;
        mon.dart.lives=200;
        mon.dart.sprite=UltraJuggernautUpgradeIcon;
        mon.dart.w=35;
        mon.dart.h=35;
        mon.dart.step = function(){
            this.x += this.speed*cos(this.dir);
            this.y += this.speed*sin(this.dir);

            if(this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 700){
                for(let i = 0; i < PI*2;i+=PI/3){
                    let d = new Dart(this.x,this.y,i,this.stower.dart,this.stower);
                    d.id+="small"+i
                    d.a = 0;
                    d.step = function(){
                        this.x += this.speed*cos(this.dir);
                        this.y += this.speed*sin(this.dir);

                        if(this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 700){
                            if(this.a<6){
                                this.a++;
                                if(this.x < 0){
                                    this.dir=(PI-this.dir);
                                    this.x*=-1;
                                } else if(this.x > 1200){
                                    this.dir=(PI-this.dir)
                                    this.x=1200-(this.x-1200)
                                } else if(this.y < 0){
                                    this.dir*=-1;
                                    this.y*=-1;
                                } else {
                                    this.dir*=-1;
                                    this.y=700-(this.y-700)
                                }
                            } else {
                                darts.splice(getdartsindex(this), 1);
                            }
                        }
                    }
                    darts.push(d);
                }
                darts.splice(getdartsindex(this),1);
            }
        }
    })
    up[1][0] = new Upgrade("Quick Shots",QuickShotsUpgradeIcon,"Shoots 15% faster.",100,function(mon){mon.speed-=round(mon.speed/100*15)});
    up[1][1] = new Upgrade("Very Quick Shots",VeryQuickShotsUpgradeIcon,"Shoots 33% faster!",190,function(mon){mon.speed-=round(mon.speed/85*33)});
    up[1][2] = new Upgrade("Triple Shot",TripleShotUpgradeIcon,"Throws 3 darts at a time instead of 1.",400,function(mon){
        mon.shoot = function(ballon) {
            let speed = this.dart.speed;
            let dir = getdir(this.x, this.y, ballon.x, ballon.y);
            let t = (ballon.x - this.x) / ((speed / 5 * ballon.speed) * cos(dir));
            t *= ballon.speed / 4;
            this.dir = getdir(this.x, this.y, ballon.x + (t * ballon.speed * cos(ballon.dir)), ballon.y + (t * ballon.speed * sin(ballon.dir)));
            let d1 = new Dart(this.x, this.y, this.dir, this.dart,this);
            let d2 = new Dart(this.x, this.y, this.dir - PI / 12, this.dart,this);
            let d3 = new Dart(this.x, this.y, this.dir + PI / 12, this.dart,this);
            d1.id+="d1";
            d2.id+="d2";
            d3.id+="d3";
            darts.push(d1);
            darts.push(d2);
            darts.push(d3);
        }
    });
    up[1][3] = new Upgrade("Super Monkey Fan Club",SuperMonkeyFanClubUpgradeIcon,"Super Monkey Fan Club ability: Converts up to 10 nearby Dart Monkeys including himself into Super Monkeys for 15 seconds.",8000,function(mon){
        let mons = [];
        let ab = new Ability("Super Monkey Fan Club",SuperMonkeyFanClubUpgradeIcon,3000,900,function(){
            towers.forEach(function(a){
                if(a.tower.name==="dart"){
                    if(mons.length<10){
                        mons.push(a);
                    } else {
                        mons.sort(function(b,c){return dist(b.x,b.y,mon.x,mon.y)>dist(c.x,c.y,mon.x,mon.y);})
                        mons.splice(0,1,[a])
                    }
                }
            })
            mons.forEach(function(a){
                a.speed/=3;
            })
        },function(){
            mons.forEach(function(a){
                try {
                    a.speed *= 3;
                }catch(e){}
            })
        });
        mon.ab=ab.name;
        abilities.push(ab);
    })
    up[1][4] = new Upgrade("Plasma Monkey Fan Club",PMFCUpgradeIcon,"Elite membership of this club grants the Dart Monkeys even more power.",50000,function(mon){
        removeabi("Super Monkey Fan Club");
        let mons = [];
        let m2 = [];
        let ab = new Ability("Plasma Monkey Fan Club",PMFCUpgradeIcon,3000,900,function(){
            mons=[];
            m2=[];
            towers.forEach(function(a){
                if(a.tower.name==="dart"){
                    if(mons.length<20){
                        mons.push(a);
                    } else {
                        mons.sort(function(b,c){return dist(b.x,b.y,mon.x,mon.y)>dist(c.x,c.y,mon.x,mon.y);})
                        mons.splice(0,1,[a])
                    }
                }
            })
            mons.forEach(function(a){
                towers.splice(gettowerindex(a),1);
            })
            mons.forEach(function(a){
                m2.push(towers.length);
                let to = new Tower(a.x,a.y,supermon);
                to.levelingup([1,0,0]);
                to.levelingup([1,0,0]);
                to.speed=2;
                to.dam=2;
                to.lives=40
                towers.push(to);
            })
        },function(){
            for(let i = 0; i < m2.length;i++){
                towers.splice(m2[i]-i,1);
            }
            mons.forEach(function(a){
                towers.push(a);
            })
        });
        mon.ab=ab.name;
        abilities.push(ab);
    })
    up[2][0] = new Upgrade("Long Range Darts",LongRangeDarts,"Makes the Dart Monkey shoot further than normal.",90,function(mon){mon.r*=1.15});
    up[2][1] = new Upgrade("Enhanced Eyesight",EnhancedEyesight,"Shoots even further and can detect Camo Bloons.",200,function(mon){mon.r*=1.1;mon.camo=true;});
    up[2][2] = new Upgrade("Crossbow",CrossbowUpgradeIcon,"Uses a long range Crossbow that can pop 3 layers of Bloon for every hit.",625,function(mon){mon.dart.dam=3;mon.dart.lives=3;mon.dart.speed*=1.25;mon.r*=1.15})
    up[2][3] = new Upgrade("Sharp Shooter",SharpShooterUpgradeIcon,"Sharp Shooter does powerful Crit Shots every few seconds that do a lot more damage.",2000,function(mon){
        mon.dart.dam=6;mon.dart.speed*=1.25;mon.speed*=.9;mon.dart.lives++;
        mon.shoot = function (ballon) {
            let speed = this.dart.speed;
            let dir = getdir(this.x, this.y, ballon.x, ballon.y);
            let t = (ballon.x - this.x) / ((speed / 5 * ballon.speed) * cos(dir));
            t *= ballon.speed / 4;
            this.dir = getdir(this.x, this.y, ballon.x + (t * ballon.speed * cos(ballon.dir)), ballon.y + (t * ballon.speed * sin(ballon.dir)));
            let dart = new Dart(this.x, this.y, this.dir, this.dart,this);

            if(Math.round(random(0,5))===4){
                dart.dam*=10;
            }
            darts.push(dart);
        };
    })
    up[2][4] = new Upgrade("Crossbow Master",CrossbowMasterUpgradeIcon,"Crossbow Master shoots really fast and devastates most Bloon types with ease.",25000,function(mon){
        mon.speed*=.18;mon.r*=2.3;mon.dart.lives+=7;mon.dart.type=damagetype.null;
        mon.shoot = function (ballon) {
            let speed = this.dart.speed;
            let dir = getdir(this.x, this.y, ballon.x, ballon.y);
            let t = (ballon.x - this.x) / ((speed / 5 * ballon.speed) * cos(dir));
            t *= ballon.speed / 4;
            this.dir = getdir(this.x, this.y, ballon.x + (t * ballon.speed * cos(ballon.dir)), ballon.y + (t * ballon.speed * sin(ballon.dir)));
            let dart = new Dart(this.x, this.y, this.dir, this.dart,this);
            if(Math.round(random(0,2))===2){
                dart.dam*=10;
            }
            darts.push(dart);
        };
    })
    dartsmon.levels=up;
    statictowers.push(dartsmon);

    let Boomerangtower = loadImage('sprites/monkey/Boomerangtower.png');
    let BoomerangSprite = loadImage('sprites/BoomerangSprite.png');
    Boomerang = new statictower("Boomerang", 35, 45, 125, 85, Boomerangtower,325,2,towertypes.primaire);
    Boomerang.dart = new DartsContainer(12,damagetype.darts, 1, BoomerangSprite, 20, 15, true, 4);
    up = [[],[],[]];
    let ImprovedRangsUpgradeIcon = loadImage('sprites/ImprovedRangsUpgradeIcon.png');
    let GlaivesUpgradeIcon = loadImage('sprites/GlaivesUpgradeIcon.png');
    let glaive = loadImage('sprites/glaive.png');
    let GlaiveRicochetUpgradeIcon = loadImage('sprites/GlaiveRicochetUpgradeIcon.png');
    let MoarGlaivesUpgradeIcon = loadImage('sprites/MoarGlaivesUpgradeIcon.png');
    let GlaiveLordUpgradeIcon = loadImage('sprites/GlaiveLordUpgradeIcon.png');
    up[0][0] = new Upgrade("Improved Rangs",ImprovedRangsUpgradeIcon,"Can pop up to 8 Bloons per throw.",200,function(mon){
        mon.dart.lives+=4;
        mon.r*=1.05;
    })
    up[0][1] = new Upgrade("Glaives",GlaivesUpgradeIcon,"Throws sharper and faster glaives instead of boomerangs.",280,function(mon){
        mon.dart.lives+=5;
        mon.speed*=.824
        mon.dart.sprite = glaive;
        mon.dart.w=30;
        mon.dart.h=30;
    })
    up[0][2] = new Upgrade("Glaive Ricochet",GlaiveRicochetUpgradeIcon,"Glaives will bounce from Bloon to Bloon automatically and aggressively.",1300,function(mon){
        mon.dart.lives+=37;
        mon.dart.step = function(){
            let balloon = bloonswithprio2(this.x,this.y,this.stower.r,this.stower.prio,this.stower.prios,this.stower.camo,this);
            if (balloon != null) {
                this.dir = getdir(this.x,this.y,balloon.x,balloon.y);
            }
            this.x += this.speed*cos(this.dir);
            this.y += this.speed*sin(this.dir);

            if(this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 700){
                darts.splice(getdartsindex(this),1);
            }
        }
    })
    up[0][3] = new Upgrade("M.O.A.R. Glaives",MoarGlaivesUpgradeIcon,"Multiple Object Advanced Ricochet greatly enhances the already extraordinary powers of the Glaive Ricochet Monkey.",3000,function(mon){
        mon.speed/=2;
        mon.dart.lives*=2;
    })
    up[0][4] = new Upgrade("Glaive Lord",GlaiveLordUpgradeIcon,"Glaive Lord surrounds itself with 3 permanent glaives that shred anything that comes near.",40000,function(mon){
        mon.no = 0;
        mon.step = function(){
            if(this.tempspeed >= this.speed) {
                let balloon = bloonswithprio(this.x,this.y,this.r,this.prio,this.prios,this.camo);
                if (balloon != null) {
                    this.shooted++;
                    if(this.shooted>=1000000000){this.shooted=0;}
                    this.shoot(balloon);
                    this.tempspeed -= this.speed;
                }
            } else {
                this.tempspeed++;
            }
            let range = 100;
            for(let i = 0; i < 3; i++){
                let dc = new DartsContainer(this.dart.speed,this.dart.type,this.dart.dam+1,this.dart.sprite,this.dart.w,this.dart.h,true,Infinity);
                let dart = new Dart(this.x+(Math.cos(this.no+((2*Math.PI/3)*i))*range),this.y+(Math.sin(this.no+((2*Math.PI/3)*i))*range),0,dc,this);
                dart.draw = function(){

                }
                dart.step = function(){
                    darts.splice(getdartsindex(this), 1);
                }
                darts.push(dart);
            }
            this.draw = function(){
                push();
                let dc = new DartsContainer(this.dart.speed,this.dart.type,this.dart.dam+1,this.dart.sprite,this.dart.w,this.dart.h,true,Infinity);
                for(let i = 0; i < 3; i++) {
                    let dart = new Dart(this.x + (Math.cos(this.no + ((2*Math.PI / 3) * i)) * range), this.y + (Math.sin(this.no + ((2*Math.PI / 3) * i)) * range), 0, dc, this);
                    dart.id+=""+i;
                    dart.turn=true;
                    dart.turning = this.no * 5;
                    dart.draw();
                }
                translate(this.x*sx,this.y*sy);
                this.tdraw();
                pop();
            }
            this.no+=PI/50;
            if(this.no>=2*PI){
                this.no-=2*PI;
            }
        }
    })
    let FasterThrowingUpgradeIcon_BoomerangMonkey = loadImage('sprites/FasterThrowingUpgradeIcon_BoomerangMonkey.png');
    let FasterRangsUpgradeIcon = loadImage('sprites/FasterRangsUpgradeIcon.png');
    let BionicBoomerangUpgradeIcon = loadImage('sprites/BionicBoomerangUpgradeIcon.png');
    let TurboChargeUpgradeIcon = loadImage('sprites/TurboChargeUpgradeIcon.png');
    let PermaChargeUpgradeIcon = loadImage('sprites/PermaChargeUpgradeIcon.png');
    let LongRangeRangsUpgradeIcon = loadImage('sprites/LongRangeRangsUpgradeIcon.png');
    let RedHotRangsUpgradeIcon = loadImage('sprites/RedHotRangsUpgradeIcon.png');
    let KylieBoomerangUpgradeIcon = loadImage('sprites/KylieBoomerangUpgradeIcon.png');
    let MOABPressUpgradeIcon = loadImage('sprites/MOABPressUpgradeIcon.png');
    let MOABDominationUpgradeIcon = loadImage('sprites/MOABDominationUpgradeIcon.png');
    up[1][0] = new Upgrade("Faster Throwing",FasterThrowingUpgradeIcon_BoomerangMonkey,"Throws boomerangs faster.",175,function(mon){
        mon.speed-=mon.speed/3;
    })
    up[1][1] = new Upgrade("Faster Rangs",FasterRangsUpgradeIcon,"Boomerangs fire and fly faster.",250,function(mon){
        mon.dart.speed*=1.2;
        mon.speed-=mon.speed/3;
    })
    up[1][2] = new Upgrade("Bionic Boomerang",BionicBoomerangUpgradeIcon,"Replaces arm with a strong bionic arm that can throw boomerangs extremely fast and do more damage to MOAB class Bloons.",1600,function(mon){
        mon.speed/=2.86;
    })
    up[1][3] = new Upgrade("Turbo Charge",TurboChargeUpgradeIcon,"Turbo Charge ability: Makes this Monkey attack incredibly fast for 10 seconds.",4000,function(mon){
        let ab = new Ability("Turbo Charge",TurboChargeUpgradeIcon,2700,600,function(){
            mon.speed/=7;
            mon.dart.dam++;
        },function(){
            mon.speed*=7;
            mon.dart.dam--;
        })
        mon.ab=ab.name;
        abilities.push(ab);
    })
    up[1][4] = new Upgrade("Perma Charge",PermaChargeUpgradeIcon,"Perma Charge has a permanent super fast attack speed. Ability increases the lethality even more.",35000,function(mon){
        removeabi("Turbo Charge");
        mon.speed/=7;
        mon.dart.dam+=2;
        let ab = new Ability("Perma Charge",PermaChargeUpgradeIcon,2400,900,function(){
            mon.dart.dam+=8;
        },function(){
            mon.dart.dam-=8;
        })
        mon.ab=ab.name;
        abilities.push(ab);
    })
    up[2][0] = new Upgrade("Long Range Rangs",LongRangeRangsUpgradeIcon,"Can throw boomerangs further than normal.",100,function(mon){
        mon.r*=1.151;
    })
    up[2][1] = new Upgrade("Red Hot Rangs",RedHotRangsUpgradeIcon,"Allows boomerangs to pop Frozen and Lead Bloons and do more damage to all.",300,function(mon){
        mon.dart.dam++;
        mon.dart.type = damagetype.fire;
    })
    up[2][2] = new Upgrade("Kylie Boomerang",KylieBoomerangUpgradeIcon,"Throws heavy Kylie boomerangs that follow a straight path instead of curved.",1300,function(mon){
        mon.dart.lives*=2;
        mon.dart.step = function(){
            let pour = (PI/(this.speed))/TWO_PI;
            this.x += (this.dr*4*pour)*cos(this.dir+(this.rot<=this.start-PI?PI:0));
            this.y += (this.dr*4*pour)*sin(this.dir+(this.rot<=this.start-PI?PI:0));
            this.rot-=PI/(this.speed);
            if(this.rot <= this.start-(PI*2)){
                darts.splice(getdartsindex(this),1);
            }
        }
    })
    up[2][3] = new Upgrade("MOAB Press",MOABPressUpgradeIcon,"Heavy Kylie boomerangs hits MOAB-Class Bloons multiple times per throw and sometimes knocks them back a short way along the path.",2200,function(mon){
        mon.press=true;
        mon.dart.lives*=10;
    })
    up[2][4] = new Upgrade("MOAB Domination",MOABDominationUpgradeIcon,"Special knockback kylies trigger more often and do lots of extra damage.",60000,function(mon){
        mon.dart.dam=12
        mon.speed/=2
        let ef = new Effects("MOAB Domination",1,0,function(b){
            if(b.moab&&b.bal.name!=="BAD") {
                b.x -= b.speed*cos(b.dir);
                b.y -= b.speed*sin(b.dir);
            }
        },function(b){

        })
        mon.dart.effects.push(ef);
    })
    Boomerang.dart.step = function(){
        this.x = this.dx+cos(this.rot)*this.dr;
        this.y = this.dy+sin(this.rot)*this.dr;
        this.rot-=PI/this.speed;
        if(this.rot <= this.start-(PI*2)){
            darts.splice(getdartsindex(this),1);
        }
    }
    Boomerang.shoot = function(b){
        this.dir = getdir(this.x, this.y, b.x, b.y);
        let d = new Dart(this.x, this.y, this.dir, this.dart, this);
        d.rot = this.dir+PI;
        d.start = d.rot;
        let r = Math.sqrt((b.x-this.x)*(b.x-this.x)+(b.y-this.y)*(b.y-this.y))/2;
        d.dx = this.x+cos(this.dir)*r;
        d.dy = this.y+sin(this.dir)*r;
        d.dr = r;
        if(this.press&&b.moab){
            d.dam=70;
        }
        darts.push(d);
    }
    Boomerang.levels=up;
    Boomerang.description = "The Boomerang for $\nThrow boomerang to bloons.";
    statictowers.push(Boomerang);

    let bombtower = loadImage('sprites/monkey/Bomb Tower.png');
    BombSprite = loadImage('sprites/BombSprite.png');
    BombTower = new statictower("BombTower", 45, 45, 150, 80, bombtower,600,2,towertypes.primaire);
    BombTower.dart = new DartsContainer(12,damagetype.explosions, 1, BombSprite, 15, 20, false, 18);
    BombTower.dart.range = 75;
    up = [[],[],[]];
    let BiggerBombsUpgradeIcon = loadImage('sprites/BiggerBombsUpgradeIcon.png');
    let HeavyBombsUpgradeIcon = loadImage('sprites/HeavyBombsUpgradeIcon.png');
    let ReallyBigBombsUpgradeIcon = loadImage('sprites/ReallyBigBombsUpgradeIcon.png');
    let BloonImpactUpgradeIcon = loadImage('sprites/BloonImpactUpgradeIcon.png');
    let BloonCrushUpgradeIcon = loadImage('sprites/BloonCrushUpgradeIcon.png');
    let FasterReloadUpgradeIcon = loadImage('sprites/FasterReloadUpgradeIcon.png');
    let MissileLauncherUpgradeIcon = loadImage('sprites/MissileLauncherUpgradeIcon.png');
    let MoabMaulerUpgradeIcon = loadImage('sprites/MoabMaulerUpgradeIcon.png');
    let MoabAssassinUpgradeIcon = loadImage('sprites/MoabAssassinUpgradeIcon.png');
    let MOABEliminatorUpgradeIcon = loadImage('sprites/MOABEliminatorUpgradeIcon.png');
    let ExtraRangeUpgradeIcon = loadImage('sprites/ExtraRangeUpgradeIcon.png');
    let FragBombsUpgradeIcon = loadImage('sprites/FragBombsUpgradeIcon.png');
    let ClusterBombsUpgradeIcon = loadImage('sprites/ClusterBombsUpgradeIcon.png');
    let RecursiveClusterUpgradeIcon = loadImage('sprites/RecursiveClusterUpgradeIcon.png');
    let BombBlitzUpgradeIcon = loadImage('sprites/BombBlitzUpgradeIcon.png');
    up[0][0] = new Upgrade("Bigger Bombs",BiggerBombsUpgradeIcon,"Shoots larger bombs, they have a larger blast area and more popping power.",400,function(mon){
        mon.dart.lives+=10;
        if(mon.levels[2]>2){mon.extradart.lives+=6;}else{mon.ed=6;}
    })
    up[0][1] = new Upgrade("Heavy Bombs",HeavyBombsUpgradeIcon,"Heavy duty bombs can smash through 2 layers of Bloon at once and pop more Bloons.",800,function(mon){
        mon.dart.lives+=10;
        mon.dart.dam++;
        if(mon.levels[2]>2){mon.extradart.lives+=10;}else{mon.ed+=10;}
    })
    up[0][2] = new Upgrade("Really Big Bombs",ReallyBigBombsUpgradeIcon,"Huge bombs blow up Bloons in a large area and allow Frags to pop more Bloons.",1200,function(mon){
        mon.dart.range+=15;
        mon.dart.lives=50;
        mon.dart.dam++;
    })
    up[0][3] = new Upgrade("Bloon Impact",BloonImpactUpgradeIcon,"Explosions become so violent Bloons are stunned for a short time when they are hit. Range is increased and frags are even more effective.",3600,function(mon){
        mon.dart.type = damagetype.null
        let ef = new Effects("Bloon Impact",10,0,function(b){
            if(b.moab!==true) {
                b.x -= b.speed*cos(b.dir);
                b.y -= b.speed*sin(b.dir);
            }
        },function(b){

        })
        mon.dart.effects.push(ef);
    })
    up[0][4] = new Upgrade("Bloon Crush",BloonCrushUpgradeIcon,"Bloon shattering explosions do massive damage and can stun MOAB-Class bloons.",55000,function(mon){
        mon.dart.effects[0] = new Effects("Bloon Crush", 15,0, function (b) {
            b.x -= b.speed * cos(b.dir);
            b.y -= b.speed * sin(b.dir);
        }, function (b) {

        });
    })
    up[1][0] = new Upgrade("Bloon Crush",FasterReloadUpgradeIcon,"Reloads 33% faster.",250,function(mon){
        mon.speed/=3
    })
    up[1][1] = new Upgrade("Missile Launcher",MissileLauncherUpgradeIcon,"Exchanges bombs for missiles, which fire faster, fly faster, and increase range.",400,function(mon){
        mon.r*=1.1;
        mon.dart.s*=2;
        mon.speed*=.75;
    })
    up[1][2] = new Upgrade("MOAB Mauler",MoabMaulerUpgradeIcon,"MOAB Maulers do much more damage to MOAB-Class Bloons and ceramics.",900,function(mon){
        mon.nomoab = 18;
        mon.r*=1.1;
    })
    up[1][3] = new Upgrade("MOAB Assassin",MoabAssassinUpgradeIcon,"Assassinate MOAB ability: Special missile flies out and does massive damage to MOAB-Class Bloons.",3200,function(mon){
        mon.nomoab = 30;
        let ab = new Ability("MOAB Assassin",MoabAssassinUpgradeIcon,1800,90,function(){
            mon.nomoab = 750;
            mon.dart.lives+=100;
            mon.dart.dam+=2;
        },function(){
            mon.nomoab = 30;
            mon.dart.lives-=100;
            mon.dart.dam-=2;
        })
        mon.ab=ab.name;
        abilities.push(ab);
    })
    up[1][4] = new Upgrade("MOAB Eliminator",MOABEliminatorUpgradeIcon,"Assassinate ability does 6x damage with a shorter cooldown.",25000,function(mon){
        mon.dart.type=damagetype.null;
        mon.dart.dam=100;
        removeabi("MOAB Assassin");
        let ab = new Ability("MOAB Eliminator",MOABEliminatorUpgradeIcon,600,90,function(){
            mon.nomoab = 4500;
            mon.dart.lives+=100;
            mon.dart.dam+=2;
        },function(){
            mon.nomoab = 30;
            mon.dart.lives-=100;
            mon.dart.dam-=2;
        })
        mon.ab=ab.name;
        abilities.push(ab);
    })
    up[2][0] = new Upgrade("Extra Range",ExtraRangeUpgradeIcon,"Increases attack range.",200,function(mon){
        mon.r*=1.1;
    })
    up[2][1] = new Upgrade("Frag Bombs",FragBombsUpgradeIcon,"Fragments fly out and pop even more bloons!",300,function(mon){
        mon.extradart = new DartsContainer(12,damagetype.darts,1,BombSprite,5,5,false,1);
        mon.extradart.step = function(){
            this.x += this.speed*cos(this.dir);
            this.y += this.speed*sin(this.dir);

            if(dist(this.dx,this.dy,this.x,this.y)>=100){
                darts.splice(getdartsindex(this),1);
            }
        }
        mon.extra=8;
        mon.first=1;
    })
    up[2][2] = new Upgrade("Cluster Bombs",ClusterBombsUpgradeIcon,"Throws out secondary bombs instead of sharp fragments every shot.",800,function(mon){
        mon.extradart = new DartsContainer(12,damagetype.explosions, 1, BombSprite, 15, 20, false, 10+(mon.ed>0?mon.ed:0));
        mon.extradart.step = function(){
            this.x += this.speed*cos(this.dir);
            this.y += this.speed*sin(this.dir);

            if(dist(this.dx,this.dy,this.x,this.y)>=100){
                this.stower.tower.explode(this);
            }
        }
    })
    up[2][3] = new Upgrade("Recursive Cluster",RecursiveClusterUpgradeIcon,"Every second shot the cluster bombs send out more cluster bombs for even more destruction.",2800,function(mon){
        mon.first=2;
    })
    up[2][4] = new Upgrade("Bomb Blitz",BombBlitzUpgradeIcon,"When a Bloon escapes, a Bomb Storm will destroy every Bloon on the screen below a ZOMG.",35000,function(mon){
        mon.extradart.dam+=5;
        mon.lif=lives;
        mon.step = function(){
            if(this.lif>lives){
                for(let x = 0; x <=1200;x+=100){
                    for(let y = 0; y <=700;y+=100){
                        let dart = new Dart(x, y, 0, this.dart,this);
                        dart.dam=2000;
                        dart.first=1;
                        dart.gay=true;
                        dart.step = function(){
                            this.stower.tower.explode(this);
                        }
                        darts.push(dart);
                    }
                }
                this.lif=lives;
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
    BombTower.explode = function(dart){
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
            let d = dart.dam;
            if(this.nomoab>0&&b.moab===true){
                d+=this.nomoab;
            }
            if(this.nomoab>=0&&b.bal.name==="ceramique"){
                d+=4;
            }
            let h = b.hitted(dart, d);
            towers[dart.tower].damcont += (isNaN(h)?0:h);
        }
        if(dart.stower.extra>0&&dart.first>0){
            let r = random(0,2*PI);
            for(let i = 0; i < PI*2;i+=(2*PI)/dart.stower.extra){
                let d = new Dart(dart.x,dart.y,i+r,dart.stower.extradart,dart.stower);
                if(dart.gay===true){
                    d.gay=true;
                    d.dam=2000;
                }
                d.first=dart.first-1;
                d.dx=dart.x;
                d.dy=dart.y;
                d.id+="sec"+i+' '+d.first;
                darts.push(d);
            }
        }
        if(dart.effects.length>0) {
            balloons.forEach(function (b) {
                let dx = b.x - x;
                let dy = b.y - y;
                if (dx * dx + dy * dy <= BombTower.dart.range * BombTower.dart.range) {
                    dart.effects.forEach(function (j) {
                        let g = true
                        for (let i = 0; i < b.effects.length; i++) {
                            if (b.effects[i].name === j.name) {
                                b.effects[i].duration = j.duration;
                                g = false;
                            }
                        }
                        if (g) {
                            b.effects.push(new Effects(j.name, j.duration,j.layer, j.func, j.afunc));
                        }
                    })
                }
            });
        }
        darts.splice(getdartsindex(dart), 1);
    }
    BombTower.shoot = function (ballon) {
        this.dir = getdir(this.x, this.y, ballon.x, ballon.y);
        let dart = new Dart(this.x, this.y, this.dir, this.dart,this);
        dart.dx = ballon.x;
        dart.dy = ballon.y;
        dart.first=this.first;
        dart.step = function(){
            this.x += this.speed*cos(this.dir);
            this.y += this.speed*sin(this.dir);
            let dx = this.dx-this.x;
            let dy = this.dy-this.y;
            if(dx*dx+dy*dy<=this.speed*this.speed){
                this.stower.tower.explode(this);
            }
            if(this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 700){
                this.stower.tower.explode(this);
            }
        }
        darts.push(dart);
    };
    BombTower.levels=up;
    BombTower.description = "The BombTower for $\nThrow bombs to bloons.";
    statictowers.push(BombTower);

    let tacksmonsprite = loadImage('sprites/monkey/shooter monkey.png');
    let tackssprite = loadImage('sprites/spikes/shooter.png');
    tacksmon = new statictower("tacks", 45, 45, 72, 80, tacksmonsprite,280,2,towertypes.primaire);
    tacksmon.dart = new DartsContainer(12,damagetype.darts, 1, tackssprite, 10, 20, false, 1);
    up = [[],[],[]];
    let FasterReloadUpgrade = loadImage('sprites/FasterReloadUpgrade.png');
    let EvenFasterShootingUpgradeIcon = loadImage('sprites/EvenFasterShootingUpgradeIcon.png');
    let HotShotsUpgradeIcon = loadImage('sprites/HotShotsUpgradeIcon.png');
    let LongRangeTacksUpgradeIcon = loadImage('sprites/LongRangeTacksUpgradeIcon.png');
    let SuperRangeTacksUpgradeIcon = loadImage('sprites/SuperRangeTacksUpgradeIcon.png');
    let BladeShooterUpgradeIcon = loadImage('sprites/BladeShooterUpgradeIcon.png');
    let BladeMaelstromUpgradeIcon = loadImage('sprites/BladeMaelstromUpgradeIcon.png');
    let Blade = loadImage('sprites/Blade.png');
    let BladeMaelstromUpgradeIconAA = loadImage('sprites/BladeMaelstromUpgradeIconAA.png');
    let SuperMaelstromUpgradeIcon = loadImage('sprites/SuperMaelstromUpgradeIcon.png');
    let MoreTacksUpgradeIcon = loadImage('sprites/MoreTacksUpgradeIcon.png');
    let EvenMoreTacksUpgradeIcon = loadImage('sprites/EvenMoreTacksUpgradeIcon.png');
    let TackSprayerUpgradeIcon = loadImage('sprites/TackSprayerUpgradeIcon.png');
    let OverdriveUpgradeIcon = loadImage('sprites/OverdriveUpgradeIcon.png');
    let TheTackZoneUpgradeIcon = loadImage('sprites/TheTackZoneUpgradeIcon.png');
    up[0][0] = new Upgrade("Faster Shooting",FasterReloadUpgrade,"It allows the Tack Shooter to shoot 33% faster.",150,function(mon){mon.speed=2*mon.speed/3;})
    up[0][1] = new Upgrade("Even Faster Shooting",EvenFasterShootingUpgradeIcon,"Shoots tacks even faster!",300,function(mon){mon.speed*=1.81})
    up[0][2] = new Upgrade("Hot Shots",HotShotsUpgradeIcon,"Shoots superhot tacks that do extra damage and can pop Lead Bloons.",600,function(mon){mon.dart.dam++;mon.dart.type=damagetype.fire})
    up[1][0] = new Upgrade("Long Range Tacks",LongRangeTacksUpgradeIcon,"Tacks fly out further than normal.",100,function(mon){mon.r*=1.5})
    up[1][1] = new Upgrade("Super Range Tacks",SuperRangeTacksUpgradeIcon,"Even longer range tacks that can pop more Bloons.",225,function(mon){mon.r*=1.25})
    up[1][2] = new Upgrade("Blade Shooter",BladeShooterUpgradeIcon,"Switches tacks for sharp blades that can pop up to 5 additional Bloons.",550,function(mon){mon.speed*=0.82;mon.dart.sprite=Blade;mon.dart.h=15;mon.dart.w=15})
    up[1][3] = new Upgrade("Blade Maelstrom",BladeMaelstromUpgradeIcon,"Blade Maelstrom ability: Covers the area in a storm of blades.",2700,function(mon){
        let dart = new DartsContainer(mon.dart.speed,mon.dart.type,1,mon.dart.sprite,mon.dart.w,mon.dart.h,mon.dart.turn,Infinity);
        let to;
        let ab = new Ability("Blade Maelstrom",BladeMaelstromUpgradeIconAA,1200,180,function(){
            let i = gettowerindex(mon);
            towers.splice(i,1);
            to = new Tower(mon.x,mon.y,tacksmon);
            to.r = 0;
            to.camo=true;
            to.shoot = function(){}
            to.step = function(){
                for(let i = 0; i < PI*2;i+=PI){
                    let d = new Dart(mon.x,mon.y,i+this.r,dart,to);
                    d.id+=""+(i+this.r)
                    darts.push(d);
                }
                this.r+=PI/30;
            }
            towers.push(to);
        },function(){
            let i = gettowerindex(to);
            towers.splice(i,1);
            towers.push(mon);
        })
        mon.ab=ab.name;
        abilities.push(ab);
    })
    up[1][4] = new Upgrade("Super Maelstrom",SuperMaelstromUpgradeIcon,"Even more powerful Maelstrom ability and lasts longer.",15000,function(mon){
        removeabi("Blade Maelstrom");
        let dart = new DartsContainer(mon.dart.speed,mon.dart.type,2,mon.dart.sprite,mon.dart.w,mon.dart.h,mon.dart.turn,Infinity);
        let to;
        let ab = new Ability("Super Maelstrom",SuperMaelstromUpgradeIcon,1200,540,function(){
            let i = gettowerindex(mon);
            towers.splice(i,1);
            to = new Tower(mon.x,mon.y,tacksmon);
            to.r = 0;
            to.camo=true;
            to.shoot = function(){}
            to.step = function(){
                for(let i = 0; i < PI*2;i+=PI/2){
                    let d = new Dart(mon.x,mon.y,i+this.r,dart,to);
                    d.id+=""+(i+this.r)
                    darts.push(d);
                }
                this.r+=PI/30;
            }
            towers.push(to);
        },function(){
            let i = gettowerindex(to);
            towers.splice(i,1);
            towers.push(mon);
        })
        mon.ab=ab.name;
        abilities.push(ab);
    })
    up[2][0] = new Upgrade("More Tacks",MoreTacksUpgradeIcon,"Shoots 10 tacks instead of 8, plus increases Ring of Fire damage.",100,function(mon){mon.how=10;})
    up[2][1] = new Upgrade("Even More Tacks",EvenMoreTacksUpgradeIcon,"Shoots out 12 tacks per shot and increases Ring of Fire damage further.",100,function(mon){mon.how=12})
    up[2][2] = new Upgrade("Tack Sprayer",TackSprayerUpgradeIcon,"Sprays out 16 tacks per volley.",450,function(mon){mon.how=16;mon.speed*=2/3})
    up[2][3] = new Upgrade("Overdrive",OverdriveUpgradeIcon,"Shoots incredibly fast.",3200,function(mon){mon.speed/=3;mon.dart.dam=2;})
    up[2][4] = new Upgrade("The Tack Zone",TheTackZoneUpgradeIcon,"Many, many tacks.",24000,function(mon){mon.how=32;mon.r*=2;mon.speed*=2/3;mon.dart.type=damagetype.null;mon.dart.dam+=7;})
    tacksmon.shoot = function (ballon) {
        let x = this.x;
        let y = this.y;
        let r = this.r;
        for(let dir = 0; dir < PI*2; dir += 2*PI/this.how) {
            let pike = new Dart(x, y, dir, this.dart,this);
            pike.id+=""+dir;
            pike.step = function(){
                this.x += this.speed*cos(this.dir);
                this.y += this.speed*sin(this.dir);

                if(dist(this.x,this.y,x,y) > r){
                    darts.splice(getdartsindex(this),1);
                }
            }
            darts.push(pike);
        }
    };
    tacksmon.init = function(mon){
        mon.how=8;
    }
    tacksmon.step = function(){
        if(this.tempspeed >= this.speed) {
            let balloon = false;
            let x = this.x;
            let y = this.y;
            let r = this.r;
            let camo = this.camo;
            balloons.forEach(function (a) {
                if(dist(a.x,a.y,x,y) <= r && (a.camo===false||camo===true)) {
                    balloon = true
                    return true;
                }
            });
            if (balloon) {
                this.shooted++;
                if(this.shooted>=1000000000){this.shooted=0;}
                this.shoot();
                this.tempspeed -= this.speed;
            }
        } else {
            this.tempspeed++;
        }
    }
    tacksmon.levels=up;
    tacksmon.description = "The tacks machine for $\nThrow tacks around him";
    statictowers.push(tacksmon);

    let icemonsprite = loadImage('sprites/monkey/ice.png');
    icemon = new statictower("icemon", 45, 45, 60, 175, icemonsprite,500,2,towertypes.primaire);
    icemon.dart = new DartsContainer(12,damagetype.freezing, 1, null, 10, 10, false, 40);
    up = [[],[],[]];
    let PermafrostUpgradeIcon = loadImage('sprites/PermafrostUpgradeIcon.png');
    let MetalFreezeUpgradeIcon = loadImage('sprites/MetalFreezeUpgradeIcon.png');
    let IceShardsUpgradeIcon = loadImage('sprites/IceShardsUpgradeIcon.png');
    let IceShard = loadImage('sprites/IceShard.png');
    up[0][0] = new Upgrade("Permafrost",PermafrostUpgradeIcon,"Bloons move slowly even after thawing out.",100,function(mon){
        mon.dart.effects.push(new Effects("Permafrost",160,0,function(b){
            let a = true;
            b.effects.forEach(function(e){
                if(e.name==="iceFreeze"){
                    a=false;
                }
            })
            if(a){
                b.speed/=2;
            }
        },function (b) {
            b.speed=b.bspeed;
        }))
    })
    up[0][1] = new Upgrade("Metal Freeze",MetalFreezeUpgradeIcon,"Can freeze and pop Lead Bloons.",300,function(mon){})
    up[0][2] = new Upgrade("Ice Shards",IceShardsUpgradeIcon,"Razor sharp shards fly out when Frozen Bloons pop.",1500,function(mon){
        mon.r*=1.25;
        mon.dart.effects.push(new Effects("Ice Shards",80,0,function (b) {
            b.hitted = function(dart,damage){
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
                            for(let i =0; i<TWO_PI;i+=TWO_PI/3){
                                let dc = new DartsContainer(12,damagetype.darts, damage,IceShard,8,40,false,2);
                                let dart = new Dart(this.x,this.y,this.dir+i,dc,mon);
                                dart.id+=""+i;
                                darts.push(dart);
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
        },function (b) {
            b.hitted = b.tbal.hitted;
        }))
    })
    let EmbrittlementUpgradeIcon = loadImage('sprites/EmbrittlementUpgradeIcon.png');
    let SuperBrittleUpgradeIcon = loadImage('sprites/SuperBrittleUpgradeIcon.png');
    up[0][3] = new Upgrade("Embrittlement",EmbrittlementUpgradeIcon,"Detects Camo Bloons and all Bloons hit become brittle, take extra damage while frozen, and lose Camo properties.",3000,function(mon){
        mon.dart.dam++;
        mon.camo=true;
    })
    up[0][4] = new Upgrade("Super Brittle",SuperBrittleUpgradeIcon,"Bloons take huge damage while frozen including MOAB-class Bloons.",30000,function(mon){
        mon.dart.dam+=3;
        mon.moab=true;
        mon.dart.type=damagetype.null;
        mon.speed*=(1-0.11);
    })
    let EnhancedFreezeUpgradeIcon = loadImage('sprites/EnhancedFreezeUpgradeIcon.png');
    let DeepFreezeUpgradeIcon = loadImage('sprites/DeepFreezeUpgradeIcon.png');
    let ArcticWindUpgradeIcon = loadImage('sprites/ArcticWindUpgradeIcon.png');
    let frozencircle = loadImage('sprites/frozen circle.png');
    up[1][0] = new Upgrade("Enhanced Freeze",EnhancedFreezeUpgradeIcon,"Attacks faster and freezes for longer.",230,function(mon){
        mon.speed*=.666666;
        mon.dart.effects[0].duration*=1.25;
        mon.r*=1.3
    })
    up[1][1] = new Upgrade("Deep Freeze",DeepFreezeUpgradeIcon,"Freezes through 2 layers of Bloon.",350,function(mon){
        mon.dart.effects[0].layer++;
    })
    up[1][2] = new Upgrade("Arctic Wind",ArcticWindUpgradeIcon,"Super cold aura that slows Bloons that come near it.",3200,function(mon){
        mon.dart.lives+=60;
        mon.draw = function(){
            if(this.turning===undefined){this.turning=0;}
            push();
            translate(this.x*sx,this.y*sy);
            this.tdraw();
            pop();
            push();
            translate(this.x*sx,this.y*sy);
            rotate(this.turning);
            image(frozencircle,-this.r*sx,-this.r*sy,this.r*2*sx,this.r*2*sy);
            this.turning+=0.05;
            pop();
        }
        mon.step = function() {
            let j = new Effects("Arctic Wind", 1, 0, function (b) {
                let a = true;
                b.effects.forEach(function (e) {
                    if (e.name === "iceFreeze") {
                        a = false;
                    }
                })
                if (a) {
                    b.speed/=2;
                }
            }, function (b) {
                b.speed=b.bspeed;
            });
            let x = this.x;
            let y = this.y;
            let r = this.r;
            let lvl = this.levels;
            balloons.forEach(function (b) {
                if (b.bal.name !== "lead" || lvl[0] > 1) {
                    let dx = b.x - x;
                    let dy = b.y - y;
                    if (dx * dx + dy * dy <= r * r && !iteminlist(damagetype.freezing, b.bal.resist)) {
                        let g = true
                        for (let i = 0; i < b.effects.length; i++) {
                            if (b.effects[i].name === j.name) {
                                b.effects[i].duration = j.duration;
                                g = false;
                            }
                        }
                        if (g) {
                            b.effects.push(new Effects(j.name, j.duration,j.layer, j.func, j.afunc));
                        }
                    }
                }
            });
            if (this.tempspeed >= this.speed) {
                let balloon = bloonswithprio(this.x, this.y, this.r, this.prio,this.prios, this.camo);
                if (balloon != null) {
                    this.shoot(balloon);
                    this.shooted++;
                    if (this.shooted >= 1000000000) {
                        this.shooted = 0;
                    }
                    this.tempspeed -= this.speed;
                }
            } else {
                this.tempspeed++;
            }
        }
    })
    let SnowstormUpgradeIcon = loadImage('sprites/SnowstormUpgradeIcon.png');
    let AbsoluteZeroUpgradeIcon = loadImage('sprites/AbsoluteZeroUpgradeIcon.png');
    up[1][3] = new Upgrade("Snowstorm",SnowstormUpgradeIcon,"Snowstorm Ability: Freezes all bloons on screen, and briefly freezes white, zebra, camo and MOAB class.",3000,function(mon){
        mon.r*=1.5;
        let ab = new Ability("Snowstorm",SnowstormUpgradeIcon,3600,10,function(){
            let j = this.tower.dart.effects[0];
            let to = this.tower;
            let n=[];
            balloons.forEach(function (b) {
                let g = true
                for (let i = 0; i < b.effects.length; i++) {
                    if (b.effects[i].name === j.name) {
                        b.effects[i].duration = j.duration;
                        g = false;
                    }
                }
                if (g) {
                    b.effects.push(new Effects(j.name, j.duration,j.layer, j.func, j.afunc));
                }
                n.push(b)
            });
            n.forEach(function(b){
                let d = to.dart.dam;
                let h = b.hitted(new Dart(to.x, to.y, 0, to.dart, to), d);
                to.damcont += (isNaN(h) ? 0 : h);
            })
        },function(){

        })
        ab.tower = mon;
        abilities.push(ab)
    })
    up[1][4] = new Upgrade("Absolute Zero",AbsoluteZeroUpgradeIcon,"Ability is so cold it fully freezes all Bloon types including cold immune, camo, and MOAB-Class.",26000,function(mon){
        removeabi("Snowstorm");
        let ab = new Ability("Absolute Zero",AbsoluteZeroUpgradeIcon,1800,10,function(){
            let j = this.tower.dart.effects[0];
            let to = this.tower;
            let n=[];
            balloons.forEach(function (b) {
                let g = true
                for (let i = 0; i < b.effects.length; i++) {
                    if (b.effects[i].name === j.name) {
                        b.effects[i].duration = 15*60;
                        g = false;
                    }
                }
                if (g) {
                    b.effects.push(new Effects(j.name, 15*60,j.layer, j.func, j.afunc));
                }
                n.push(b)
            });
            n.forEach(function(b){
                let d = to.dart.dam;
                let h = b.hitted(new Dart(to.x, to.y, 0, to.dart, to), d);
                to.damcont += (isNaN(h) ? 0 : h);
            })
        },function(){

        })
        ab.tower = mon;
        abilities.push(ab)
    })
    let LargerRadiusUpgradeIcon = loadImage('sprites/LargerRadiusUpgradeIcon.png');
    let ReFreezeUpgradeIcon = loadImage('sprites/Re-FreezeUpgradeIcon.png');
    let CryoCannonUpgradeIcon = loadImage('sprites/CryoCannonUpgradeIcon.png');
    let FreezeBomb = loadImage('sprites/FreezeBomb.png');
    let IciclesUpgradeIcon = loadImage('sprites/IciclesUpgradeIcon.png');
    let IcicleRoadSpikes = loadImage('sprites/IcicleRoadSpikes.png');
    let IcicleImpaleUpgradeIcon = loadImage('sprites/IcicleImpaleUpgradeIcon.png');
    up[2][0] = new Upgrade("Larger Radius",LargerRadiusUpgradeIcon,"Larger freeze area.",100,function(mon){
        mon.r*=1.35
    })
    up[2][1] = new Upgrade("Re-Freeze",ReFreezeUpgradeIcon,"Can re-freeze Bloons that are already frozen.",200,function(mon){})
    up[2][2] = new Upgrade("Cryo Cannon",CryoCannonUpgradeIcon,"Shoots freezing bombs at Bloons over long range.",2000,function(mon){
        mon.speed/=2.4;
        mon.dart.dam++;
        mon.dart.lives-=10;
        mon.r*=2.4;
        mon.shoot = function(b){
            let speed = this.dart.speed;
            let dir = getdir(this.x, this.y, b.x, b.y);
            let t = (b.x - this.x) / ((speed / 5 * b.speed) * cos(dir));
            t *= b.speed / 4;
            this.dir = getdir(this.x, this.y, b.x + (t * b.speed * cos(b.dir)), b.y + (t * b.speed * sin(b.dir)));
            darts.push(new Dart(this.x, this.y, this.dir, this.dart,this));
        }
        mon.dart.sprite=FreezeBomb;
    })
    up[2][3] = new Upgrade("Icicles",IciclesUpgradeIcon,"Frozen Bloons grow sharp icicles that can pop Bloons that touch them.",2000,function(mon){
        let ef = new Effects("Icicles",2,0,function(b){
            let dc = new DartsContainer(0,damagetype.darts,1,IcicleRoadSpikes,b.w,b.h,false,3);
            let dart = new Dart(b.x,b.y,b.dir,dc,mon);
            dart.vie=80;
            dart.step = function(){
                this.vie--;
                if(this.vie<0){
                    darts.splice(getdartsindex(this),1);
                }
            }
            b.darts.push(dart.id);
            darts.push(dart);
        },function (b) {

        });
        mon.dart.effects.push(ef);
    })
    up[2][4] = new Upgrade("Icicle Impale",IcicleImpaleUpgradeIcon,"Shoots huge icicle spikes that do huge damage to MOAB-Class Bloons and freezes them.",30000,function(mon){
        mon.dart.dam=50;
        mon.speed*=.666666666;
    })

    icemon.levels=up;
    icemon.dart.effects = [new Effects("iceFreeze",80,0,function(b){
        b.bal.resist.push(damagetype.darts);
        b.speed=0;
    },function(b){
        b.bal.resist.pop();
        b.speed=b.bspeed;
    })]
    icemon.init = function (mon){
        mon.moab=false;
    }
    icemon.shoot = function(bal){
        let x = this.x;
        let y = this.y;
        let r = this.r;
        let n = [];
        let lvl = this.levels;
        let camo = this.camo;
        let moab = this.moab;
        balloons.forEach(function (b) {
            let dx = b.x-x;
            let dy = b.y-y;
            let a = true;
            if(lvl[2]<2) {
                b.effects.forEach(function (e) {
                    if (e.name === "iceFreeze") {
                        a = false;
                    }
                })
            }
            if (dx*dx+dy*dy<=r*r&&a&&(camo||b.camo===camo)&&(moab||b.moab===moab)) {
                n.push(b);
            }
        });
        if(n.length>this.dart.lives) {
            n.sort(function (a, b) {
                let ax = a.x - x;
                let ay = a.y - y;
                let bx = b.x - x;
                let by = b.y - y;
                return (ax * ax + ay * ay) - (bx * bx + by * by);
            });
        }
        for(let i = 0;i<n.length&&i<this.dart.lives;i++){
            let b = n[i];
            if(b.bal.name!=="lead"||lvl[0]>1) {
                let d = this.dart.dam;
                let h = b.hitted(new Dart(this.x, this.y, 0, this.dart, this), d);
                this.damcont += (isNaN(h) ? 0 : h);
            }
        }
        let ef = this.dart.effects;
        balloons.forEach(function (b) {
            if(b.bal.name!=="lead"||lvl[0]>1) {
                let dx = b.x - x;
                let dy = b.y - y;
                if (dx * dx + dy * dy <= r * r && !iteminlist(damagetype.freezing, b.bal.resist)) {
                    ef.forEach(function (j) {
                        let g = true
                        for (let i = 0; i < b.effects.length; i++) {
                            if (b.effects[i].name === j.name) {
                                g = false;
                            }
                        }
                        if (g) {
                            b.effects.push(new Effects(j.name, j.duration,j.layer, j.func, j.afunc));
                        }
                    })
                }
            }
        });
    }
    icemon.description = "The ice tower for $\nfreeze bloons around him";
    statictowers.push(icemon);


    let gluegunnersprite = loadImage('sprites/monkey/glue gunner.png');
    let glue = loadImage('sprites/glue.png');
    let GlueSoakUpgradeIcon = loadImage('sprites/GlueSoakUpgradeIcon.png');
    let CorrosiveGlueUpgradeIcon = loadImage('sprites/CorrosiveGlueUpgradeIcon.png');
    let BloonDissolverUpgradeIcon = loadImage('sprites/BloonDissolverUpgradeIcon.png');
    let BloonLiquefierUpgradeIcon = loadImage('sprites/BloonLiquefierUpgradeIcon.png');
    let TheBloonSolverUpgradeIcon = loadImage('sprites/TheBloonSolverUpgradeIcon.png');
    gluegunner = new statictower("glue gunner", 45, 45, 180, 60, gluegunnersprite,275,2,towertypes.primaire);
    gluegunner.dart = new DartsContainer(12,damagetype.null, 0, glue, 15, 30, false, 1);
    up = [[],[],[]];
    up[0][0] = new Upgrade("Glue Soak",GlueSoakUpgradeIcon,"Glue soaks through all layers of Bloon.",200,function(mon){
        mon.dart.effects[0].layer=Infinity;
    })
    up[0][1] = new Upgrade("Corrosive Glue",CorrosiveGlueUpgradeIcon,"Insert Corrosive Glue's description here.",300,function(mon){
        mon.dart.effects[1] = new Effects("Corrosive Glue",mon.dart.effects[0].duration,Infinity,function(b){
            if(b.gluespeed===undefined){b.gluespeed=138}
            if(b.gluespeed<=0){
                let h = b.hitted("void",1);
                mon.damcont += (isNaN(h)?0:h);
                b.gluespeed+=138
            }
            b.gluespeed--;
        },function(b){

        })
    })
    up[0][2] = new Upgrade("Bloon Dissolver",BloonDissolverUpgradeIcon,"Extreme solvents melt two layers every second.",2700,function(mon){
        mon.dart.effects[1].func = function(b){
            if(b.gluespeed===undefined){b.gluespeed=34}
            if(b.gluespeed<=0){
                let h = b.hitted("void",1);
                mon.damcont += (isNaN(h)?0:h);
                b.gluespeed+=34
            }
            b.gluespeed--;
        }
    })
    up[0][3] = new Upgrade("Bloon Liquefier",BloonLiquefierUpgradeIcon,"Liquefies Bloons by popping them 10x every second.",5500,function(mon){
        mon.dart.effects[1].func = function(b){
            if(b.gluespeed===undefined){b.gluespeed=6}
            if(b.gluespeed<=0){
                let h = b.hitted("void",1);
                mon.damcont += (isNaN(h)?0:h);
                b.gluespeed+=6
            }
            b.gluespeed--;
        }
    })
    up[0][4] = new Upgrade("The Bloon Solver",TheBloonSolverUpgradeIcon,"Bloons a problem? Here's the solution.",22000,function(mon){
        mon.speed/=4;
        mon.dart.effects[1].func = function(b){
            if(b.gluespeed===undefined){b.gluespeed=6}
            if(b.gluespeed<=0){
                let h=b.hitted("void",3);
                mon.damcont += (isNaN(h)?0:h);
                b.gluespeed+=6
            }
            b.gluespeed--;
        }
    })
    let BiggerGlobsUpgradeIcon = loadImage('sprites/BiggerGlobsUpgradeIcon.png');
    let GlueSplatterUpgradeIcon = loadImage('sprites/GlueSplatterUpgradeIcon.png');
    let GlueHoseUpgradeIcon = loadImage('sprites/GlueHoseUpgradeIcon.png');
    let GlueStrikeUpgradeIcon = loadImage('sprites/GlueStrikeUpgradeIcon.png');
    let GlueStormUpgradeIcon = loadImage('sprites/GlueStormUpgradeIcon.png');
    up[1][0] = new Upgrade("Bigger Globs",BiggerGlobsUpgradeIcon,"Can coat 2 Bloons per shot.",100,function(mon){
        mon.dart.lives++;
    })
    up[1][1] = new Upgrade("Glue Splatter",GlueSplatterUpgradeIcon,"Splatters glue across up to 6 Bloons per shot.",1800,function(mon){
        mon.dart.effects[2] = new Effects("Glue Splatter",1,0,function(b){
            let x = b.x;
            let y = b.y;
            let to = towers[gettowerindex(mon)];
            let n = [];
            balloons.forEach(function (b) {
                let dx = b.x-x;
                let dy = b.y-y;
                if (dx*dx+dy*dy<=to.r) {
                    n.push(b);
                }
            });
            if(n.length>=6) {
                n.sort(function (a, b) {
                    let ax = a.x - x;
                    let ay = a.y - y;
                    let bx = b.x - x;
                    let by = b.y - y;
                    return (ax * ax + ay * ay) - (bx * bx + by * by);
                });
            }
            for(let a = 0;a<n.length&&a<6;a++){
                to.dart.effects.forEach(function (j) {
                    if(j.name!=="Glue Splatter") {
                        let g = true
                        for (let i = 0; i < n[a].effects.length; i++) {
                            if (n[a].effects[i].name === j.name) {
                                n[a].effects[i].duration = j.duration;
                                g = false;
                            }
                        }
                        if (g) {
                            n[a].effects.push(new Effects(j.name, j.duration, j.layer, j.func, j.afunc));
                        }
                    }
                })
            }
        },function(b){

        })
    })
    up[1][2] = new Upgrade("Glue Hose",GlueHoseUpgradeIcon,"Shoots glue 3x as fast!",3250,function(mon){
        mon.speed/=3;
    })
    up[1][3] = new Upgrade("Glue Strike",GlueStrikeUpgradeIcon,"Glue Strike ability: Glues all Bloons on screen.",3500,function(mon){
        let ab = new Ability("Glue Strike",GlueStrikeUpgradeIcon,1800,1,function(){
            let to = towers[gettowerindex(mon)];
            balloons.forEach(function(a){
                to.dart.effects.forEach(function (j) {
                    let g = true
                    for (let i = 0; i < a.effects.length; i++) {
                        if (a.effects[i].name === j.name) {
                            a.effects[i].duration = j.duration;
                            g = false;
                        }
                    }
                    if (g) {
                        a.effects.push(new Effects(j.name, j.duration,j.layer, j.func, j.afunc));
                    }
                })
            })
        },function(){

        })
        mon.ab = ab.name;
        abilities.push(ab);
    })
    up[1][4] = new Upgrade("Glue Storm",GlueStormUpgradeIcon,"Glue Storm ability pelts the whole screen over 15 seconds with glue. Glued Bloons take extra damage while glued.",15000,function(mon){
        removeabi("Glue Strike");
        let ab = new Ability("Glue Storm",GlueStormUpgradeIcon,1800,900,function(){
            let to = towers[gettowerindex(mon)];
            if(to.gluestorm===undefined){to.gluestorm=120;}
            if(to.gluestorm<=0) {
                balloons.forEach(function (a) {
                    to.dart.effects.forEach(function (j) {
                        let g = true
                        for (let i = 0; i < a.effects.length; i++) {
                            if (a.effects[i].name === j.name) {
                                a.effects[i].duration = j.duration;
                                g = false;
                            }
                        }
                        if (g) {
                            a.effects.push(new Effects(j.name, j.duration, j.layer, j.func, j.afunc));
                        }
                    })
                })
                to.gluestorm+=120;
            }
            to.gluestorm--;
        },function(){

        })
        mon.ab = ab.name;
        abilities.push(ab);
    })
    let StickierGlueUpgradeIcon = loadImage('sprites/StickierGlueUpgradeIcon.png');
    let StrongerGlueUpgradeIcon = loadImage('sprites/StrongerGlueUpgradeIcon.png');
    let MOABGlueUpgradeIcon = loadImage('sprites/MOABGlueUpgradeIcon.png');
    let RelentlessGlueUpgradeIcon = loadImage('sprites/RelentlessGlueUpgradeIcon.png');
    let SuperGlueUpgradeIcon = loadImage('sprites/SuperGlueUpgradeIcon.png');
    up[2][0] = new Upgrade("Stickier Glue",StickierGlueUpgradeIcon,"Makes glue effect last much longer.",120,function(mon){
        mon.dart.effects[0].duration*=2;
        if(mon.dart.effects[1]!==undefined){
            mon.dart.effects[1].duration*=2;
        }
    })
    up[2][1] = new Upgrade("Stronger Glue",StrongerGlueUpgradeIcon,"Slows down Bloons even more.",400,function(mon){
        mon.dart.effects[0].func=function(b){
            if(!b.moab){b.speed/=2;}
            if(!b.moab){b.speed/=2;}
        }
    })
    up[2][2] = new Upgrade("MOAB Glue",MOABGlueUpgradeIcon,"Improved glue formula allows it to stick to MOAB-class Bloons.",3400,function(mon){
        mon.dart.effects[0].func=function(b){
            b.speed/=2;
            b.speed/=2;
        }
    })
    up[2][3] = new Upgrade("Relentless Glue",RelentlessGlueUpgradeIcon,"Popped Bloons that were glued leave a blob of glue on the track.",3000,function(mon){
        mon.dart.effects[3] = new Effects("Relentless Glue",1,0,function(b){
            let to = towers[gettowerindex(mon)]
            let dart = new Dart(b.x,b.y,b.dir,to.dart,to);
            dart.vie=300;
            dart.step = function(){
                this.vie--;
                if(this.vie<0){
                    darts.splice(getdartsindex(this),1);
                }
            }
            b.darts.push(dart.id);
            darts.push(dart);
        },function(b){

        })
    })
    up[2][4] = new Upgrade("Super Glue",SuperGlueUpgradeIcon,"Glue so strong it temporarily immobilizes all affected Bloons!",35000,function(mon){
        mon.dart.effects[4] = new Effects("Super Glue",1320,Infinity,function(b){
            if(b.moab){
                b.speed/=2.5;
            }
        },function(b){
            b.speed=b.bspeed;
        })
        mon.shoot=function(b){
            this.dir = getdir(this.x, this.y, b.x, b.y);
            let d = new Dart(this.x, this.y, this.dir, this.dart, this);
            if(b.moab){
                d.dam=50;
            }
            darts.push(d);
        }
    })
    gluegunner.levels=up;
    gluegunner.dart.effects = [new Effects("glue",660,2,function(b){
        if(!b.moab){b.speed/=2;}
    },function(b){
        b.speed=b.bspeed;
    })]
    gluegunner.description = "The glue gunner for $\nshoot glue to bloons for slowing them down";
    statictowers.push(gluegunner);
}
let staticballons = [];
let balloons = [];
let bad, moab, redsprite, redcamosprite, redregensprite, redregencamosprite, bluesprite, bluecamosprite, blueregensprite, blueregencamosprite, greensprite, greencamosprite, greenregensprite, greenregencamosprite, yellowsprite, yellowcamosprite, yellowregensprite, yellowregencamosprite, pinksprite, pinkcamosprite, pinkregensprite, pinkregencamosprite, blacksprite, blackcamosprite, blackregensprite, blackregencamosprite, whitesprite, whitecamosprite, whiteregensprite, whiteregencamosprite, leadsprite, leadcamosprite, leadregensprite, leadregencamosprite, purplesprite, purpleregensprite, purplecamosprite, purpleregencamosprite, zebresprite, zebreregensprite, zebrecamosprite, zebreregencamosprite, rainbowsprite, rainbowregensprite, rainbowcamosprite, rainbowregencamosprite, ceramicsprite, ceramicregensprite, ceramiccamosprite, ceramicregencamosprite, zomg, bfb, ddt, ceramicfortsprite, ceramicfortregensprite, ceramicfortcamosprite, ceramicfortregencamosprite, leadfortsprite, leadfortcamosprite, leadfortregensprite, leadfortregencamosprite

function bloonssprites() {
    redsprite = loadImage('sprites/bloons/red.png');
    redcamosprite = loadImage('sprites/bloons/red camo.png');
    redregensprite = loadImage('sprites/bloons/red regen.png');
    redregencamosprite = loadImage('sprites/bloons/red regen camo.png');
    bluesprite = loadImage('sprites/bloons/blue.png');
    bluecamosprite = loadImage('sprites/bloons/blue camo.png');
    blueregensprite = loadImage('sprites/bloons/blue regen.png');
    blueregencamosprite = loadImage('sprites/bloons/blue regen camo.png');
    greensprite = loadImage('sprites/bloons/green.png');
    greencamosprite = loadImage('sprites/bloons/green camo.png');
    greenregensprite = loadImage('sprites/bloons/green regen.png');
    greenregencamosprite = loadImage('sprites/bloons/green regen camo.png');
    yellowsprite = loadImage('sprites/bloons/yellow.png');
    yellowcamosprite = loadImage('sprites/bloons/yellow camo.png');
    yellowregensprite = loadImage('sprites/bloons/yellow regen.png');
    yellowregencamosprite = loadImage('sprites/bloons/yellow regen camo.png');
    pinksprite = loadImage('sprites/bloons/pink.png');
    pinkcamosprite = loadImage('sprites/bloons/pink camo.png');
    pinkregensprite = loadImage('sprites/bloons/pink regen.png');
    pinkregencamosprite = loadImage('sprites/bloons/pink regen camo.png');
    blacksprite = loadImage('sprites/bloons/black.png');
    blackcamosprite = loadImage('sprites/bloons/black camo.png');
    blackregensprite = loadImage('sprites/bloons/black regen.png');
    blackregencamosprite = loadImage('sprites/bloons/black regen camo.png');
    whitesprite = loadImage('sprites/bloons/white.png');
    whitecamosprite = loadImage('sprites/bloons/white camo.png');
    whiteregensprite = loadImage('sprites/bloons/white regen.png');
    whiteregencamosprite = loadImage('sprites/bloons/white regen camo.png');
    leadsprite = loadImage('sprites/bloons/lead.png');
    leadcamosprite = loadImage('sprites/bloons/lead camo.png');
    leadregensprite = loadImage('sprites/bloons/lead regen.png');
    leadregencamosprite = loadImage('sprites/bloons/lead regen camo.png');
    leadfortsprite = loadImage('sprites/bloons/lead fort.png');
    leadfortcamosprite = loadImage('sprites/bloons/lead fort camo.png');
    leadfortregensprite = loadImage('sprites/bloons/lead fort regen.png');
    leadfortregencamosprite = loadImage('sprites/bloons/lead fort regen camo.png');
    purplesprite = loadImage('sprites/bloons/purple.png');
    purpleregensprite = loadImage('sprites/bloons/purple regen.png');
    purplecamosprite = loadImage('sprites/bloons/purple camo.png');
    purpleregencamosprite = loadImage('sprites/bloons/purple regen camo.png');
    zebresprite = loadImage('sprites/bloons/zebra.png');
    zebreregensprite = loadImage('sprites/bloons/zebra regen.png');
    zebrecamosprite = loadImage('sprites/bloons/zebra camo.png');
    zebreregencamosprite = loadImage('sprites/bloons/zebra regen camo.png');
    rainbowsprite = loadImage('sprites/bloons/rainbow.png');
    rainbowregensprite = loadImage('sprites/bloons/rainbow regen.png');
    rainbowcamosprite = loadImage('sprites/bloons/rainbow camo.png');
    rainbowregencamosprite = loadImage('sprites/bloons/rainbow regen camo.png');
    ceramicsprite = loadImage('sprites/bloons/ceramic.png');
    ceramicregensprite = loadImage('sprites/bloons/ceramic regen.png');
    ceramiccamosprite = loadImage('sprites/bloons/ceramic camo.png');
    ceramicregencamosprite = loadImage('sprites/bloons/ceramic regen camo.png');
    ceramicfortsprite = loadImage('sprites/bloons/ceramic fort.png');
    ceramicfortregensprite = loadImage('sprites/bloons/ceramic fort regen.png');
    ceramicfortcamosprite = loadImage('sprites/bloons/ceramic fort camo.png');
    ceramicfortregencamosprite = loadImage('sprites/bloons/ceramic fort regen camo.png');
    moab = loadImage('sprites/bloons/MOAB.png');
    bfb = loadImage('sprites/bloons/BFB.png');
    zomg = loadImage('sprites/bloons/ZOMG.png');
    ddt = loadImage('sprites/bloons/DDT.png');
    bad = loadImage('sprites/bloons/BAD.png');
}

function bloonsinit() {
    var red = new staticballoon(redsprite,redcamosprite,redregensprite,redregencamosprite,null,null,null,null,16, 16, "red", [], 1, RBE*1,[],1);
    staticballons.push(red);

    var blue = new staticballoon(bluesprite,bluecamosprite,blueregensprite,blueregencamosprite,null,null,null,null,18, 18, "blue", [], 1, RBE*1.4,[red],1);
    staticballons.push(blue);

    var green = new staticballoon(greensprite,greencamosprite,greenregensprite,greenregencamosprite,null,null,null,null,20, 20, "green", [], 1, RBE*1.8,[blue],1);
    staticballons.push(green);

    var yellow = new staticballoon(yellowsprite,yellowcamosprite,yellowregensprite,yellowregencamosprite,null,null,null,null,20, 20, "yellow", [], 1, RBE*3.2,[green],1);
    staticballons.push(yellow);

    var pink = new staticballoon(pinksprite,pinkcamosprite,pinkregensprite,pinkregencamosprite,null,null,null,null,24, 24, "pink", [], 1, RBE*3.5,[yellow],1);
    staticballons.push(pink);

    var black = new staticballoon(blacksprite,blackcamosprite,blackregensprite,blackregencamosprite,null,null,null,null,18, 18, "black", [damagetype.explosions], 1, RBE*1.8,[pink,pink],1);
    staticballons.push(black);

    var white = new staticballoon(whitesprite,whitecamosprite,whiteregensprite,whiteregencamosprite,null,null,null,null,18, 18, "white", [damagetype.freezing], 1, RBE*2,[pink,pink],1);
    staticballons.push(white);

    var lead = new staticballoon(leadsprite,leadcamosprite,leadregensprite,leadregencamosprite,leadfortsprite,leadfortcamosprite,leadfortregensprite,leadfortregencamosprite,20, 20, "lead", [damagetype.darts], 1, RBE,[black,black],1);
    staticballons.push(lead);

    var purple = new staticballoon(purplesprite,purplecamosprite,purpleregensprite,purpleregencamosprite,null,null,null,null,20, 20, "purple", [damagetype.fire,damagetype.energy,damagetype.plasma], 1, RBE*3,[pink,pink],1);
    staticballons.push(purple);

    var zebre = new staticballoon(zebresprite,zebrecamosprite,zebreregensprite,zebreregencamosprite,null,null,null,null,20, 20, "zebre", [damagetype.explosions,damagetype.freezing], 1, RBE*1.8,[black,white],1);
    staticballons.push(zebre);

    var rainbow = new staticballoon(rainbowsprite,rainbowcamosprite,rainbowregensprite,rainbowregencamosprite,null,null,null,null,20, 20, "rainbow", [], 1, RBE*2.2,[zebre,zebre],1);
    staticballons.push(rainbow);

    var ceramique = new staticballoon(ceramicsprite,ceramiccamosprite,ceramicregensprite,ceramicregencamosprite,ceramicfortsprite,ceramicfortcamosprite,ceramicfortregensprite,ceramicfortregencamosprite,20, 20, "ceramique", [], 10, RBE*2.5,[rainbow,rainbow],1);
    staticballons.push(ceramique);


    var MOAB = new staticballoon(moab,null,null,null,null,null,null,null,50, 100, "MOAB", [], 200, RBE,[ceramique,ceramique,ceramique,ceramique],1);
    MOAB.moab=true;
    MOAB.draw = function () {
        push();
        rotate(this.dir+PI/2);
        image(this.normsprit,-this.w/2*sx, -this.h/2*sy, this.w*sx,this.h*sy);
        pop();
    }
    staticballons.push(MOAB);

    var BFB = new staticballoon(bfb,null,null,null,null,null,null,null,60, 105, "BFB", [], 700, RBE/4,[MOAB,MOAB,MOAB,MOAB],1);
    BFB.moab=true;
    BFB.draw = function () {
        push();
        rotate(this.dir+PI/2);
        image(this.normsprit,-this.w/2*sx, -this.h/2*sy, this.w*sx,this.h*sy);
        pop();
    }
    staticballons.push(BFB);

    var ZOMG = new staticballoon(zomg,null,null,null,null,null,null,null,70, 110, "ZOMG", [], 4000, RBE*.18,[BFB,BFB,BFB,BFB],1);
    ZOMG.moab=true;
    ZOMG.draw = function () {
        push();
        rotate(this.dir+PI/2);
        image(this.normsprit,-this.w/2*sx, -this.h/2*sy, this.w*sx,this.h*sy);
        pop();
    }
    staticballons.push(ZOMG);

    var DDT = new staticballoon(ddt,null,null,null,null,null,null,null,50, 100, "DDT", [damagetype.explosions,damagetype.darts], 400, RBE*2.75,[ceramique,ceramique,ceramique,ceramique],1);
    DDT.moab=true;
    DDT.camo = true;
    DDT.fort = true;
    DDT.draw = function () {
        push();
        rotate(this.dir+PI/2);
        image(this.normsprit,-this.w/2*sx, -this.h/2*sy, this.w*sx,this.h*sy);
        pop();
    }
    staticballons.push(DDT);

    var BAD = new staticballoon(bad,null,null,null,null,null,null,null,100, 125, "BAD", [], 20000, RBE*.18,[ZOMG,ZOMG,DDT,DDT,DDT],1);
    BAD.moab=true;
    BAD.draw = function () {
        push();
        rotate(this.dir+PI/2);
        image(this.normsprit,-this.w/2*sx, -this.h/2*sy, this.w*sx, this.h*sy);
        pop();
    }
    staticballons.push(BAD);
}



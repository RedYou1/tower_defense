function towerinit() {
    statictowers=[];
    toursprimaire();
    toursmilitaire();
    toursmagique();
    tourssupport();

    var spike = new statictower("spike", 30, 30, 15, 0, spikes[10],30,0);
    spike.dart = new DartsContainer(2, damagetype.darts, 1,spikes[10],30,30,false,10);
    up = [[],[],[]];
    spike.shoot = function(balloon){}
    let stacks = 0;
    spike.step = function(){
        stacks++;
        let stack = new Dart(this.x, this.y, this.dir, this.dart,this);
        stack.id+=""+stacks;
        stack.draw = function(){
            if(this.lives <= 0){
                darts.splice(getdartsindex(this),1);
		        return;
            }
            image(spikes[this.lives],this.x*sx-this.w/2*sx,this.y*sy-this.h/2*sy,this.w*sx,this.h*sy);
        }
        stack.step = function(){
        };
        darts.push(stack);

        towers.splice(gettowerindex(this),1);
    }
    spike.levels=up;
    spike.description = "Spike stack for $";
    statictowers.push(spike);
}
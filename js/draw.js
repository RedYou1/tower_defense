

function draw(){
    page.draw();
    let hov = [];
    page.buttons.forEach(function(a){
        a.draw();
        if(a.checkin(mouseX/sx,mouseY/sy)){
            hov.push(a);
        }
    });
    if(selected2 != null){
        upgradepage.draw();
        upgradepage.buttons.forEach(function(a){
            a.draw();
            if(a.checkin(mouseX/sx,mouseY/sy)){
                hov.push(a);
            }
        });
    }
    hov.forEach(function(a){
        a.mouseHover()
    })
}
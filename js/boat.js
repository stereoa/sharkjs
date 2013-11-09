Boat = function (game, x, y) {
    //  We call the Phaser.Sprite passing in the game reference
    Phaser.Sprite.call(this, game, x, y, 'boat');
    this.isDamaged = false;
    //health at which boat is considered damaged
    this.damagedLevel = 40;
    this.health = 100;
    //undamaged frame
    this.frame = 5;
    this.anchor.setTo(.5,.5); //center flip area
    this.scale.x = 1;
    game.add.existing(this);
}

Boat.prototype = Object.create(Phaser.Sprite.prototype);
Boat.prototype.constructor = Boat;
Boat.prototype.update = function() {
    //check if the boat is off the edge of the screen
    //and adjust its direction
    if (this.x <= 36) {
        this.scale.x = -1;
    }
    if (this.scale.x == -1) {
        this.body.velocity.x = 40;
    }
    if (this.x >= 764) {
        this.scale.x = 1;
    }
    if (this.scale.x == 1) {
        this.body.velocity.x = -40;
    }
    //don't let the shark send the boat into space or sinking
    this.body.velocity.y = 0;
    //keep the boat on the surface of the water
    this.y = waterLine-15;

    //spawn items based at diff rates based on damage
    if(!this.isDamaged)
    {
        if (victims.countLiving() < 100 && randomNum(1, 300) == 1) this.spawnVictim(1);
            if (bombs.countLiving() < 100 && randomNum(1, 300) == 1) this.spawnBomb(1);
    }
    else
    {
        if (victims.countLiving() < 100 && randomNum(1, 50) == 1) this.spawnVictim(1);
        if (bombs.countLiving() < 100 && randomNum(1, 100) == 1) this.spawnBomb(1);
    }


}
//spawns "x" amount of victims
Boat.prototype.spawnVictim = function(amount) {
    for (var i = 0; i < amount; i++) {
        var person = new Victim(game, this.x,this.y);
    }
}

//spawns "x" amount of bombs
Boat.prototype.spawnBomb = function(amount) {
    for (var i = 0; i < amount; i++) {
        var bomb = new Bomb(game, this.x,this.y-20);
        //throw it off the boat in a random direction
        bomb.body.velocity.x = randomNum(-200,200);
        bomb.body.velocity.y = randomNum(-800,-100);
        bomb.x += randomNum(-15, 15);
    }
}

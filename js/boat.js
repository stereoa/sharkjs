Boat = function (game, x, y) {
    //  We call the Phaser.Sprite passing in the game reference
    Phaser.Sprite.call(this, game, x, y, 'boat');

    this.health = 100;
    this.animations.add('burn');
    this.animations.play('burn', 10, true);
    this.anchor.setTo(.5, 1); //center flip area
    this.scale.x = 1;
    game.add.existing(this);
}

Boat.prototype = Object.create(Phaser.Sprite.prototype);
Boat.prototype.constructor = Boat;
Boat.prototype.update = function() {
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
    this.body.velocity.y = 0;
    this.y = waterLine+10;
    if (victims.countLiving() < 100 && randomNum(1, 150) == 1) this.spawnVictim(1);
    if (bombs.countLiving() < 100 && randomNum(1, 450) == 1) this.spawnBomb(1);
}
Boat.prototype.spawnVictim = function(amount) {
    for (var i = 0; i < amount; i++) {
        var person = new Victim(game, this.x,this.y);
    }
}
Boat.prototype.spawnBomb = function(amount) {
    for (var i = 0; i < amount; i++) {
        var bomb = new Bomb(game, this.x,this.y);
    }
}

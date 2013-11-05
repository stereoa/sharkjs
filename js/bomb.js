Bomb = function (game, x, y) {
    //  We call the Phaser.Sprite passing in the game reference
    //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
    Phaser.Sprite.call(this, game, x, y, 'bomb');
    this.anchor.setTo(.5, .5); //center flip area
    this.body.velocity.y = randomNum(100,450);
    this.x += randomNum(-15, 15);
    this.body.collideWorldBounds = false;
    game.add.existing(this);
    bombs.add(this);
};

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;
Bomb.prototype.update = function() {
    if (this.body.velocity.y < 5) this.body.velocity.y = 0;
    else this.body.velocity.y *= .99;
}
Bomb.prototype.explode = function(){
    var explosionAnimation = explosions.getFirstDead();
    explosionAnimation.reset(this.x,this.y);
    explosionAnimation.play('kaboom', 30, false, true);
}
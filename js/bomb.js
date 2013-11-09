Bomb = function (game, x, y) {
    //  We call the Phaser.Sprite passing in the game reference
    //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
    Phaser.Sprite.call(this, game, x, y, 'bomb');
    this.inWater=false;
    if (this.y>waterLine) this.inWater = true;
    this.anchor.setTo(.5, .5); //center flip area
    this.body.collideWorldBounds = false;
    game.add.existing(this);
    bombs.add(this);
};

Bomb.prototype = Object.create(Phaser.Sprite.prototype);
Bomb.prototype.constructor = Bomb;
Bomb.prototype.update = function() {
    //slow bomb down (water friction)
    this.body.velocity.y *= .97;
    //when the bomb hits the water stop moving left and right
    if (Math.abs(this.body.velocity.x !=0) && this.y > waterLine) this.body.velocity.x = 0;
    //handle water
    if (this.y < waterLine)
    {
        this.inWater = false;
        this.body.velocity.y += 50;
    } else
    {
        if (this.inWater==false)
        {
            this.inWater = true;
            playSound(this.x,this.y,splash);
        }
    }

}
//creates explosion effect
Bomb.prototype.explode = function(){
    var explosionAnimation = explosions.getFirstDead();
    explosionAnimation.reset(this.x,this.y);
    explosionAnimation.play('kaboom', 30, false, true);
    playSound(this.x,this.y,explode);

}
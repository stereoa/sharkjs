Shark = function (game, x, y) {
    //  We call the Phaser.Sprite passing in the game reference
    Phaser.Sprite.call(this, game, x, y, 'shark');

    this.isStunned = false;
    this.stunnedTurns;
    this.maxStunnedTurns = 200;
    this.MaxVelocity = 100;

    this.animations.add('swim');
    this.animations.play('swim', 10, true);
    this.anchor.setTo(.5,.5); //center flip area
    this.body.mass = 20;
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.health = 100;
    game.add.existing(this);

}

Shark.prototype = Object.create(Phaser.Sprite.prototype);
Shark.prototype.constructor = Shark;
Shark.prototype.update = function() {

    //  Automatically called by World.update
    var keyDown = false;
    if (!this.isStunned) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.body.velocity.x -= 6; //move left
            this.scale.x = -1; //face left
            keyDown = true;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.body.velocity.x += 6; //move right
            this.scale.x = 1; //face right
            keyDown = true;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.body.velocity.y -= 6; //move up
            keyDown = true;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.body.velocity.y += 6; //move down
            keyDown = true;
        }
    }
    else {
        this.stunnedTurns++;
    }
    if (this.stunnedTurns >= this.maxStunnedTurns) {
        this.isStunned = false;
        this.scale.y=1;
    }

    if (this.y < waterLine) this.body.velocity.y += 10;
    if (keyDown) this.animations.play('swim');
    else this.animations.stop('swim');
    this.body.velocity.x *=.98;
    this.body.velocity.y *=.98;
};
Shark.prototype.stun = function() {
    this.isStunned = true;
    this.stunnedTurns = 0;
    this.scale.y=-1;
}
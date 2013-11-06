Shark = function (game, x, y) {
    //  We call the Phaser.Sprite passing in the game reference
    Phaser.Sprite.call(this, game, x, y, 'shark');

    this.animations.add('swim');
    this.animations.play('swim', 10, true);
    this.anchor.setTo(.5,.5); //center flip area
    this.body.mass = 20;
    this.body.collideWorldBounds = true;
    this.body.immovable = true;
    this.health = 100;
    game.add.existing(this);

    //stun effect
    this.sharkStun = game.add.sprite(this.x, this.y, "sharkStun");
    this.sharkStun.animations.add('stunEffect');
    this.sharkStun.visible = false;
    this.sharkStun.anchor.setTo(.5,.5);
    this.isStunned = false;
    this.stunnedTurns;
    this.maxStunnedTurns = 200;

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
        //align stun effect
        this.stunnedTurns++;
        this.sharkStun.x = this.x;
        this.sharkStun.y = this.y;
        this.sharkStun.scale = this.scale;
    }
    //check if been stunned long enough
    if (this.stunnedTurns >= this.maxStunnedTurns) {
        this.sharkStun.visible = false;
        this.sharkStun.animations.stop('stunEffect');
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
    this.sharkStun.visible = true;
    this.sharkStun.animations.play('stunEffect',12,true);
    this.isStunned = true;
    this.stunnedTurns = 0;
}
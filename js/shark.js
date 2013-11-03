var isStunned = false;
var stunnedTurns;
var maxStunnedTurns = 200;
var sharkMaxVelocity = 100;
function sharkAdd() {
    shark = game.add.sprite(100, 500, 'shark');
    shark.animations.add('swim');
    shark.animations.play('swim', 10, true);
    shark.anchor.setTo(.5,.5); //center flip area
    shark.body.mass = 20;
    shark.body.collideWorldBounds = true;
    shark.body.immovable = true;
}
function handleInput() {
    var keyDown = false;
    if (!isStunned) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            shark.body.velocity.x -= 6; //move left
            shark.scale.x = -1; //face left
            keyDown = true;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            shark.body.velocity.x += 6; //move right
            shark.scale.x = 1; //face right
            keyDown = true;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            shark.body.velocity.y -= 6; //move up
            keyDown = true;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            shark.body.velocity.y += 6; //move down
            keyDown = true;
        }
    }
    else {
        stunnedTurns++;
    }
    if (stunnedTurns >= maxStunnedTurns) {
        isStunned = false;
        shark.scale.y=1;
    }

    if (shark.y < waterLine) shark.body.velocity.y += 10;
    if (keyDown) shark.animations.play('swim');
    else shark.animations.stop('swim');
    var absVelX = Math.abs(shark.body.velocity.x);
    var absVelY = Math.abs(shark.body.velocity.y);
    /*
    if (absVelX > maxVelocity) {
        if (shark.body.velocity.x > sharkMaxVelocity) shark.body.velocity.x = sharkMaxVelocity;
        else if (shark.body.velocity.x * -1 > sharkMaxVelocity) shark.body.velocity.x = sharkMaxVelocity * -1;
    }
    if (absVelY > maxVelocity) {
        if (shark.body.velocity.y > sharkMaxVelocity) shark.body.velocity.y = sharkMaxVelocity;
        else if (shark.body.velocity.y * -1 > sharkMaxVelocity) shark.body.velocity.y = sharkMaxVelocity * -1;
    }*/
    shark.body.velocity.x *=.98;
    shark.body.velocity.y *=.98;
}

function stunShark() {
    isStunned = true;
    stunnedTurns = 0;
    shark.scale.y=-1;
}
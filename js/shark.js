function sharkAdd()
{
    shark = game.add.sprite(100, 500, 'shark');
    shark.anchor.setTo(.5, 0); //center flip area
    shark.body.collideWorldBounds = true;
    shark.body.immovable = true;
}
function handleInput() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        shark.body.velocity.x -= 4; //move left
        shark.scale.x = -1; //face left
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        shark.body.velocity.x += 4; //move right
        shark.scale.x = 1; //face right
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        shark.body.velocity.y -= 4; //move up
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
        shark.body.velocity.y += 4; //move down      
    }
    if (shark.y<waterLine) shark.body.velocity.y+=10;
    /* Trying to make the shark flip his fin based on his speed TODO
    absVelX = Math.abs(shark.velocity.x);
    absVelY = Math.abs(shark.velocity.y);
    if (absVelX >= 16 || absVelY >=16 ) 
    {
        var animSpeed = absVelX > absVelY ? absVelX:absVelY;
        if (animSpeed > 60) animSpeed = 60;
        shark.animations.play('swim', animSpeed, true);
        console.log(animSpeed);
    }
    else shark.animations.stop('swim'); */
}
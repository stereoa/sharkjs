Victim = function (game, x, y) {
    //  We call the Phaser.Sprite passing in the game reference
    var personType = "person01";
    if (randomNum(1, 2) == 1) personType = "person02";
    Phaser.Sprite.call(this, game, x, y, personType);


    this.anchor.setTo(.5, .5); //center flip area
    this.body.velocity.x = randomNum(-50, 50);
    this.body.velocity.y = randomNum(-50, 50);
    this.x += randomNum(-15, 15);
    this.body.collideWorldBounds = false;
    game.add.existing(this);
    victims.add(this);
}
Victim.maxVelocity = 50;
Victim.speed = 3;
Victim.prototype = Object.create(Phaser.Sprite.prototype);
Victim.prototype.constructor = Victim;
Victim.prototype.update = function () {
var speed = Victim.speed
//flee down
    if (shark.y < this.y) {
        this.body.velocity.y += speed;
        this.angle = 180;
    }

//left
    else if (shark.x > this.x) {
        this.body.velocity.x -= speed;
        this.angle = 270;
    }
//right
    else if (shark.x < this.x) {
        this.body.velocity.x += speed;
        this.angle = 90;
    }

// up
    else if (shark.y > this.y) {
        this.body.velocity.y -= speed;
        this.angle = 0;
    }
//adjust velocity
//uses shorter named local variables for readability

    var xVel = this.body.velocity.x;
    var yVel = this.body.velocity.y;
    var maxVel = Victim.maxVelocity;
    if (Math.abs(xVel) > maxVel) {
        if (xVel > maxVel) xVel = maxVel;
        else if (xVel * -1 > maxVel) xVel = maxVel * -1;
    }
    if (Math.abs(yVel) > maxVel) {
        if (yVel > maxVel) yVel = maxVel;
        else if (yVel * -1 > maxVel) yVel = maxVel * -1;
    }
    this.body.velocity.x = xVel;
    this.body.velocity.y = yVel;

    if (this.y < waterLine) this.body.velocity.y += 100;

//remove if off screen
    if (this.x < 0 || this.x > 800 || this.y > 600)
    {
        this.kill();
    }
}
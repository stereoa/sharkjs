Victim = function (game, x, y) {
    //  We call the Phaser.Sprite passing in the game reference
    var personType = "person01";
    if (randomNum(1, 2) == 1) personType = "person02";
    Phaser.Sprite.call(this, game, x, y, personType);

    this.isScared = false;
    this.energy = 0;

    this.anchor.setTo(.5, .5); //center flip area
    this.body.velocity.x = randomNum(-50, 50);
    this.body.velocity.y = randomNum(-50, 50);
    this.x += randomNum(-15, 15);
    this.body.collideWorldBounds = false;
    game.add.existing(this);
    victims.add(this);
}
Victim.maxVelocity = 55;
Victim.prototype = Object.create(Phaser.Sprite.prototype);
Victim.prototype.constructor = Victim;
Victim.prototype.update = function () {
    if (game.physics.distanceBetween(this, shark) < 100) this.isScared = true;
    var xVel = this.body.velocity.x;
    var yVel = this.body.velocity.y;
    var maxVel = Victim.maxVelocity;
    if (this.energy >= 120) {
        if (this.isScared) {

//flee down
            if (shark.y < this.y) {
                yVel = maxVel;
                this.angle = 180;
            }

//left
            else if (shark.x > this.x) {
                xVel = maxVel * -2;
                this.angle = 270;
            }
//right
            else if (shark.x < this.x) {
                xVel = maxVel * 2;
                this.angle = 90;
            }

// up
            else if (shark.y > this.y) {
                yVel = maxVel * -2;
                this.angle = 0;
            }
            this.energy = 0;
        }
        else {
            var randomDir = randomNum(1, 4);
            switch (randomDir) {
                case 1:
                    //swim right
                    xVel = maxVel;
                    this.angle = 90;
                    break;
                case 2:
                    //swim left
                    xVel = maxVel * -1;
                    this.angle = 270;
                    break;
                case 3:
                    //swim down
                    yVel = maxVel / 2;
                    this.angle = 180;
                    break;
                case 4:
                    //swim up
                    yVel = maxVel * -1;
                    this.angle = 0;
                    break;
            }
            this.energy = 0;
        }
    }

    if (this.isScared) this.energy += 5;
    else this.energy++;

//handle edges
    var onEdge = false;
    if (this.x < 0) {
        this.x = 5;
        onEdge = true;
    }
    else if (this.x > 800) {
        this.x = 795;
        onEdge = true;
    }
    else if (this.y > 600) {
        gameOver();
    }
    if (onEdge) {
        xVel = 0;
        if (shark.y >= this.y) {
            //swim up
            if (this.isScared) yVel = maxVel * -2;
            else yVel = maxVel * -1;
            this.angle = 0;
        }
        else {
            //swim down
            if (this.isScared) yVel = maxVel;
            else yVel = maxVel / 2;
            this.angle = 180;
        }
    }
    this.body.velocity.x = xVel * .98;
    this.body.velocity.y = yVel * .98;
    if (this.y < waterLine) this.body.velocity.y = 100;


}
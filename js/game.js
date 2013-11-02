var game = new Phaser.Game(
                    800, 600, 
                    Phaser.CANVAS, '', 
                    { 
                        preload: preload, 
                        create: create, 
                        update: update 
                    }
            );

//game variables
var sprite, group, txtScore;

//load in game assets
function preload() {
    game.load.atlasJSONHash('shark',
                            'assets/animations/sprites.png',
                            'assets/animations/sprites.js');

    game.load.image("background", "assets/images/bg01.png")
    game.load.image("hairball", "assets/images/hairball.png")
    game.load.image("boat", "assets/images/boat.png")
}

var bg;

//setup game entities
function create() {
    //protagonist

    game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');

    shark = game.add.sprite(0, 500, 'shark');
    shark.animations.add('idle');
    shark.animations.play('idle', 60, true);
    shark.anchor.setTo(.5, 0); //center flip area
    shark.body.collideWorldBounds = true;
    shark.body.immovable = true;

    boat = game.add.sprite(188, 26, 'boat');
    boat.anchor.setTo(.5,0);
    boat.body.collideWorldBounds = true;
    boat.scale.x = -1;
    
    //add text
     var style = { font: "30px Arial", fill: "#FFFF00", fontWeight: "bold", align: "center" };
    txtScore = game.add.text(770, 0, "0", style);
    
    group = game.add.group();
    //stuff
    for(var i = 0; i < 3; i++) {
        var ball = group.create(i*100,0, "hairball");
        ball.acceleration.y = 25;
        ball.body.collideWorldBounds = true;
    }
} 

//game logic, ~30 fps
function update() {
    
    //add one to score
    /*var score = txtScore.text;
    score ++;
    txtScore.text = score.toString();*/
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        shark.x -= 4; //move left
        shark.scale.x = -1; //face left
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        shark.x += 4; //move right
        shark.scale.x = 1; //face right
    }
    
    //check for collision with hairball
    game.physics.collide(
         shark, 
         group, 
         collisionHandler, 
         null, 
         this
    );

    //controls the boat movements
    if (boat.scale.x == -1){        
        boat.x += 1;
    }if(boat.x >= 764){
        boat.scale.x = 1; 
        boat.x -= 1; 
    }if(boat.scale.x == 1){
        boat.x -= 1;
    }if(boat.x <= 36){
        boat.scale.x = -1;
    }
    //console.log(boat.x);
    
} //end update function

function collisionHandler(protagonist, hairball) {
    hairball.kill();   
}
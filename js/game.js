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
    game.load.spritesheet('shark', 'assets/animations/shark_50x23.png', 50, 23, 3);

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

    shark = game.add.sprite(100, 500, 'shark');
    shark.animations.add('swim');
    shark.animations.play('swim', 8, true);
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
    
    hairballGroup = game.add.group();
    //stuff
    for(var i = 0; i < 3; i++) {
        var ball = hairballGroup.create(i*100,0, "hairball");
        ball.acceleration.y = 25;
        ball.body.collideWorldBounds = true;
    }
} 
//game logic, ~30 fps
function update() {
    
    handleInput();
    handleNPCs();
    //check for collision with hairball
    game.physics.collide(shark, hairballGroup, sharkHitsHairball, null, this);
    hairballGroup.forEach(hairballAI);
    
    
} //end update function

function hairballAI(hairball){
    if (shark.x > hairball.x) {
        hairball.velocity.x--;
    }
    else if (shark.x < hairball.x){
        hairball.velocity.x++;
    }
    else if (shark.y > hairball.y){
        hairball.velocity.y--;
    }
    else if (shark.y < hairball.y){
        hairball.velocity.y++;
    }
}
function sharkHitsHairball(protagonist, hairball) {
    hairball.kill();   
    //add one to score
    var score = txtScore.text;
    score ++;
    txtScore.text = score.toString();
   var ball = hairballGroup.create(boat.x,boat.y, "hairball");
    ball.acceleration.y = 25;        
    ball.body.collideWorldBounds = true;
}

function handleInput() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        shark.velocity.x -= 4; //move left
        shark.scale.x = -1; //face left
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        shark.velocity.x += 4; //move right
        shark.scale.x = 1; //face right
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        shark.velocity.y -= 4; //move up
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
        shark.velocity.y += 4; //move down      
    }
    if (shark.y<65) 
        {
            shark.velocity.y+=10;
        }
}
function handleNPCs(){
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
}
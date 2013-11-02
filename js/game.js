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
var txtScore;

//load in game assets
function preload() {
    game.load.spritesheet('shark', 'assets/animations/shark_50x23.png', 50, 23, 3);

    game.load.image("background", "assets/images/bg01.png")
    game.load.image("person", "assets/images/person01.png")
    game.load.image("boat", "assets/images/boat.png")
}

var bg;

//setup game entities
function create() {

    game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');

    //creates shark
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
    
    crewGroup = game.add.group();
    //add crew member to water
    for(var i = 0; i < 1; i++) {
        var person = crewGroup.create(boat.x,boat.y, "person");
        person.velocity.y = 25;
        person.body.collideWorldBounds = true;
    }
} 
//game logic, ~30 fps
function update() {
    
    handleInput();
    handleNPCs();
    //check for collision with hairball
    game.physics.collide(shark, crewGroup, sharkHitsPerson, null, this);
    //crewGroup.forEach(personAI);
    
    
} //end update function

/*function personAI(person){
    if (shark.x > person.x) {
        person.velocity.x--;
    }
    else if (shark.x < person.x){
        person.velocity.x++;
    }
    else if (shark.y > person.y){
        person.velocity.y--;
    }
    else if (shark.y < person.y){
        person.velocity.y++;
    }
}*/
function sharkHitsPerson(shark, person) {
    person.kill();   
    //add one to score
    var score = txtScore.text;
    score ++;
    txtScore.text = score.toString();
   var person = crewGroup.create(boat.x,boat.y, "person");
    person.velocity.y = 25;        
    person.body.collideWorldBounds = true;
}

function handleInput() {
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        shark.velocity.x -= 1; //move left
        shark.scale.x = -1; //face left
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        shark.velocity.x += 1; //move right
        shark.scale.x = 1; //face right
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        shark.velocity.y -= 1; //move up
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
        shark.velocity.y += 1; //move down      
    }
    if (shark.y<65) 
        {
            shark.velocity.y+=4;
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
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
var bg;
var crewGroup;
var boat;
var waterLine = 65;

//load in game assets
function preload() {
    game.load.spritesheet('shark', 'assets/animations/shark_50x23.png', 50, 23, 3);
    game.load.spritesheet('fire', 'assets/animations/fire10x10.png', 10, 10);

    game.load.image("background", "assets/images/bg01.png");
    game.load.image("person01", "assets/images/person01.png");
    game.load.image("person02", "assets/images/person02.png");
    game.load.image("boat", "assets/images/boat.png");
}

//setup game entities
function create() {

    game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');

   sharkAdd();

    boat = game.add.sprite(188, 26, 'boat');
    boat.anchor.setTo(.5,0);
    boat.body.collideWorldBounds = true;
    boat.scale.x = -1;
    
    //add text
    var style = { font: "30px Arial", fill: "#FFFF00", fontWeight: "bold", align: "center" };
    txtScore = game.add.text(770, 0, "0", style);
    crewGroup = game.add.group();
    var person;
    crewSpawnPerson(1);
} 
//game logic, ~30 fps
function update() {

    handleInput();
    handleNPCs();
    //check for collision with hairball
    game.physics.collide(shark, crewGroup, sharkHitsPerson, null, this);
    game.physics.collide(shark, boat, sharkHitsBoat, null, this);
    
}

function sharkHitsPerson(shark, person) {
    person.kill();   
    //add one to score
    var score = txtScore.text;
    score ++;
    txtScore.text = score.toString();
}
function sharkHitsBoat(shark, boat) {
    shark.body.velocity.y= 40;
    crewSpawnPerson(randomNum(1,4));
}

function handleNPCs(){
    //controls the boat movements
    if (boat.scale.x == 1){        
        boat.x += 1;
    }
    if(boat.x >= 764){ 
        boat.scale.x = -1; 
        boat.x -= 1; 
    }
    if(boat.scale.x == -1){
        boat.x -= 1;
    }
    if(boat.x <= 36){
        boat.scale.x = 1;
    }
    //if (crewGroup.countLiving()<100 && randomNum(0,100)==5) crewSpawnPerson();
    crewGroup.forEach(crewAI);
    crewGroup.forEach(crewPhysics);
}
var game = new Phaser.Game(
    800, 600,
    Phaser.CANVAS, '',
    {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
);

//game variables
var txtScore;
var bg;
var crewGroup;
var boat;
var waterLine = 65;
var explosions;

//load in game assets
function preload() {
    //animations
    game.load.spritesheet('shark', 'assets/animations/shark_50x23.png', 50, 23, 4);
    game.load.spritesheet('boat', 'assets/animations/boat_75x40.png', 75, 50);
    game.load.spritesheet("kaboom", "assets/animations/kaboom_60x60.png",60,60);
    //titlescreen
    game.load.image("titleScreen", "assets/images/titleScreen.png")
    game.load.image("startButton", "assets/images/startButton.png")
    //in-game
    game.load.image("water", "assets/images/water.png");
    game.load.image("waterGradient", "assets/images/waterGradient.png");
    game.load.image("waterTranspar", "assets/images/waterTrans.png");
    game.load.image("person01", "assets/images/person01.png");
    game.load.image("person02", "assets/images/person02.png");
    game.load.image("bomb", "assets/images/bomb.png");
    game.load.image("kaboom", "assets/images/kaboom.png");
}

//setup game entities
function create() {
    game.time.fps = 60;
    game.stage.backgroundColor = '#FFFFFF';
    graphics = game.add.graphics(0,0);

    //creates titlescreen and start button
    //titleScreen = game.add.tileSprite(0, 0, 800, 600, 'titleScreen');
    //startButton = game.add.button(316, 387, 'startButton', actionOnClick, this, 2, 1, 0);

    //water filters & shadows
    waterTrans = game.add.tileSprite(0,0, 800, 600, 'waterTranspar');
    //creates shark
    sharkAdd();

    //creates boat
    boat = game.add.sprite(188, boatSinkLevel, 'boat');
    boat.animations.add('burn');
    boat.animations.play('burn', 10, true);
    boat.anchor.setTo(.5, 0); //center flip area
    boat.body.mass = 40000;
    boat.scale.x = 1;

    //explosions pool
    explosions = game.add.group();
    for (var i = 0; i < 10; i++)
    {
        var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('kaboom');
    }

    //add score text
    var style = { font: "30px Arial", fill: "#FFFF00", fontWeight: "bold", align: "center" };
    txtScore = game.add.text(770, 0, "0", style);
    crewGroup = game.add.group();
    waterGradient = game.add.tileSprite(0, 0, 800, 600, 'waterGradient');

    //spawn starting victim
    boatSpawn(1);


}
//game logic (updates every frame)
function update() {

    handleInput();
    handleNPCs();
    //check for collisions
    game.physics.collide(shark, crewGroup, sharkHitsPerson, null, this);
    game.physics.collide(shark, boat, sharkHitsBoat, null, this);
    game.physics.collide(crewGroup, crewGroup, crewMemberHitsCrewMember, null, this);
    //draw health bar
    graphics.lineStyle(2, 0xFF3300, 1);
    graphics.drawRect(5, 10, 100, 2);
}

//hides titleScreen once start button clicked
function actionOnClick () {
    titleScreen.visible =! titleScreen.visible;
    //startButton.visible =! startButton.visible;

}

//add "x" amount to score
function changeScore(changeAmount) {
    var score = parseInt(txtScore.text);
    score += changeAmount;
    txtScore.setText(score.toString());
}

function createExplosion(x,y){
    var explosionAnimation = explosions.getFirstDead();
    explosionAnimation.reset(x,y);
    explosionAnimation.play('kaboom', 30, false, true);
}

function handleNPCs() {
    //controls the boat movements
    handleBoat();

    if (crewGroup.countLiving() < 100 && randomNum(1, 50) == 1) boatSpawn(1);
    crewGroup.forEach(crewAI);
    crewGroup.forEach(crewPhysics);
}

function render() {
}
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
    game.load.spritesheet('shark', 'assets/animations/shark_50x23.png', 50, 23, 4);
    game.load.spritesheet('boat', 'assets/animations/boat_75x40.png', 75, 50);
    game.load.spritesheet("kaboom", "assets/images/kaboom.png",60,60);
    game.load.image("background", "assets/images/bg01.png");
    game.load.image("person01", "assets/images/person01.png");
    game.load.image("person02", "assets/images/person02.png");
    game.load.image("bomb", "assets/images/bomb.png");
    game.load.image("kaboom", "assets/images/kaboom.png");
}

//setup game entities
function create() {
    game.time.fps = 60;
    game.stage.backgroundColor = '#000000';

    bg = game.add.tileSprite(0, 0, 800, 600, 'background');

    sharkAdd();

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

    //add text
    var style = { font: "30px Arial", fill: "#FFFF00", fontWeight: "bold", align: "center" };
    txtScore = game.add.text(770, 0, "0", style);
    crewGroup = game.add.group();
    boatSpawn(1);
}
//game logic, ~30 fps
function update() {

    handleInput();
    handleNPCs();
    //check for collision with hairball
    game.physics.collide(shark, crewGroup, sharkHitsPerson, null, this);
    game.physics.collide(shark, boat, sharkHitsBoat, null, this);
    game.physics.collide(crewGroup, crewGroup, crewMemberHitsCrewMember, null, this);

}

function changeScore(changeAmount) {
    //add one to score
    var score = parseInt(txtScore.text);
    score += changeAmount;
    txtScore.setText(score.toString());
}
function crewMemberHitsCrewMember(crewMember, crewMemberVictim) {

    if (crewMember.name == "bomb" || crewMemberVictim.name == "bomb") {
        if (crewMember.y > waterLine + 50 && crewMember.y > waterLine + 50) {

            if (crewMember.name =="bomb") createExplosion(crewMember.x, crewMember.y);
            else createExplosion(crewMemberVictim.x, crewMemberVictim.y);
            crewMember.kill();
            crewMemberVictim.kill();

            changeScore(50);
        }
    }
}
function createExplosion(x,y){
    var explosionAnimation = explosions.getFirstDead();
    explosionAnimation.reset(x,y);
    explosionAnimation.play('kaboom', 30, false, true);
}
function sharkHitsPerson(shark, crewObject) {
    if (crewObject.name == 'bomb') {
        createExplosion(crewObject.x,crewObject.y);
        stunShark();
        crewObject.kill();
    }
    else {
        if (!isStunned) {
            crewObject.kill();
            changeScore(1);
        }
    }
}

function sharkHitsBoat(shark, boat) {
    if (!isStunned) {
        if (shark.y < 26) shark.body.velocity.x *= -.4;

        shark.body.velocity.y = 20;
        boatSpawn(randomNum(1, 4));
        stunShark();
    }
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
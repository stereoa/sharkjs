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
var score = 0;
var waterLine = 26;
var boat;
var shark;
//load in game assets
function preload() {
    //screens
    game.load.image("titleScreen", "assets/images/titleScreen.png");
    game.load.image("startButton", "assets/images/startButton.png");
    game.load.image("winScreen", "assets/images/winScreen.png");
    game.load.image("loseScreen", "assets/images/loseScreen.png");
    game.load.image("retryButton", "assets/images/retryButton.png");
    //in-game
    game.load.image("water", "assets/images/water.png");
    game.load.image("waterGradient", "assets/images/waterGradient.png");
    game.load.image("waterTranspar", "assets/images/waterTrans.png");
    game.load.image("person01", "assets/images/person01.png");
    game.load.image("person02", "assets/images/person02.png");
    game.load.image("bomb", "assets/images/bomb.png");
    //animations
    game.load.spritesheet('shark', 'assets/animations/shark_50x23.png', 50, 23, 4);
    game.load.spritesheet('boat', 'assets/animations/boat_75x40.png', 75, 50);
    game.load.spritesheet("kaboom", "assets/animations/kaboom_60x60.png", 60, 60);

}

//setup game entities
function create() {
    game.time.fps = 60;
    game.stage.backgroundColor = '#FFFFFF';

    //create screens and buttons
    titleScreen = game.add.tileSprite(0, 0, 800, 600, 'titleScreen');
    startButton = game.add.button(316, 387, 'startButton', startButtonClicked, this, 2, 1, 0);
    winScreen = game.add.tileSprite(0, 0, 800, 600, 'winScreen');
    winScreen.visible = false;
    loseScreen = game.add.tileSprite(0, 0, 800, 600, 'loseScreen');
    loseScreen.visible = false;
    retryButton = game.add.button(316, 387, 'retryButton', restartGame, this, 2, 1, 0);
    retryButton.visible = false;

    gameIsStarted = false;
}
//game logic (updates every frame)
function update() {
    if (gameIsStarted) {
        //check for collisions
        game.physics.collide(shark, victims, sharkHitsVictim, null, this);
        game.physics.collide(shark, boat, sharkHitsBoat, null, this);
        game.physics.collide(shark, bombs, sharkHitsBomb, null, this);
        game.physics.collide(victims, victims, victimHitsVictim, null, this);
        game.physics.collide(victims, bombs, victimHitsBomb, null, this);
        game.physics.collide(bombs, bombs, bombHitsBomb, null, this);
        //draw health bar
        graphics.clear();
        graphics.lineStyle(2, 0xFF3300, 1);
        graphics.drawRect(5, 10, shark.health*2, 2);
        if (shark.health<=0) gameOver();
    }
}

function startGame() {
    //water background
    water = game.add.tileSprite(0, 0, 800, 600, 'water');
    //create shark
    shark = new Shark(game, 400, 300);
    //create boat
    boat = new Boat(game, 188, waterLine);
    //explosions pool
    explosions = game.add.group();
    for (var i = 0; i < 100; i++) {
        var explosionAnimation = explosions.create(0, 0, 'kaboom', [0], false);
        explosionAnimation.anchor.setTo(0.5, 0.5);
        explosionAnimation.animations.add('kaboom');
    }
    //add score text
    var style = { font: "30px Arial", fill: "#FFFF00", fontWeight: "bold", align: "center" };
    txtScore = game.add.text(770, 0, score, style);


    //create entity pools
    victims = game.add.group();
    bombs = game.add.group();

    //spawn starting victim
    boat.spawnVictim(1);
    gameIsStarted = true;
    //water shading
    waterTranspar = game.add.tileSprite(0, 0, 800, 600, 'waterTranspar');
    graphics = game.add.graphics(0, 0);

}
//hides titleScreen once start button clicked
function startButtonClicked() {
    titleScreen.visible = false;
    startButton.visible = false;
    startGame();
}

//add "x" amount to score
function changeScore(changeAmount) {
    score += changeAmount;
    txtScore.setText(score.toString());
}

function gameOver(){
    gameIsStarted = false;

    //destroy all game assets
    shark.destroy();
    boat.destroy();
    bombs.destroy();
    victims.destroy();
    explosions.destroy();

    txtScore.destroy();
    water.destroy();
    waterTranspar.destroy();
    graphics.destroy();

    if (score>100) winScreen.visible = true;
    else loseScreen.visible = true;
    retryButton.visible = true;
}

function restartGame()
{
    winScreen.visible = false;
    loseScreen.visible = false;
    retryButton.visible = false;

    startGame();
}
function render() {
}
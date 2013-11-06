function victimHitsBomb(victim, bomb) {

    if (bomb.y > waterLine + 50) {

            bomb.explode();
            victim.kill();
            bomb.kill();
            changeScore(50);

    }
}
function victimHitsVictim(victim, victim2) {

}
function sharkHitsVictim(shark, victim) {
    if (!shark.isStunned) {
        victim.kill();
        changeScore(1);
        //creates victim blood
        var blood = game.add.sprite(victim.x, victim.y, "blood");
        blood.animations.add('blood');
        blood.animations.play('blood', 10, false);
    }
}
function sharkHitsBomb(shark, bomb) {
    bomb.explode();
    shark.stun();
    bomb.kill();
    shark.health-=50;
}
function bombHitsBomb(bomb, bomb2) {
    bomb.explode();
    bomb.kill();
    bomb2.explode();
    bomb2.kill();
}

function sharkHitsBoat(shark, boat) {
    if (!shark.isStunned) {
        //shark.stun();
        shark.body.velocity.x *= -.4;
        shark.body.velocity.y *= -.4;
        boat.spawnVictim(randomNum(1, 4));
        //shark.stun();
    }
}

function victimHitsBomb(victim, bomb) {

    if (bomb.y > waterLine + 50) {
        if (victim.isScared) changeScore(50);
        bomb.explode();
        victim.kill();
        bomb.kill();
    }
}
function victimHitsVictim(victim, victim2) {

}
function sharkHitsVictim(shark, victim) {
    if (!shark.isStunned) {
        victim.kill();
        changeScore(1);
        shark.health += 5;
        if (shark.health > 100) shark.health = 100;
        //creates victim blood
        var blood = game.add.sprite(victim.x, victim.y, "blood");
        blood.animations.add('blood');
        blood.animations.play('blood', 10, false);
        eatten.play('',0,1,false);
    }
}
function sharkHitsBomb(shark, bomb) {
    bomb.explode();
    shark.stun();
    bomb.kill();
    shark.health -= 50;
}
function bombHitsBomb(bomb, bomb2) {
    bomb.explode();
    bomb.kill();
    bomb2.explode();
    bomb2.kill();
}

function sharkHitsBoat(shark, boat) {

    if (!shark.isStunned) {
        boatHit.play('',0,1,false);
        //shark.stun();
        //just a number to gauge how fast the shark hits the boat.
        forceOfHit = Math.abs(shark.body.velocity.x) + Math.abs(shark.body.velocity.y);
        //bounce shark off boat
        shark.body.velocity.x *= -.4;
        shark.body.velocity.y *= -.99;
        if (forceOfHit > 400) boat.spawnVictim(randomNum(forceOfHit * .002, forceOfHit * .006));
        boat.health -= forceOfHit * .01;

        //checks if boat has entered damaged state yet or needs to
        if (boat.health <= boat.damagedLevel && !boat.isDamaged) {
            boat.isDamaged = true;
            boatExplosion.play('',0,1,false);
            boat.animations.add('burn', [0, 1, 2, 3, 4]);
            boat.animations.play('burn', 10, true);
        }
        //if shark hits side of boat
        if (shark.y>boat.y-boat.height/2 && shark.y<boat.y+boat.height/2)
        {
            //and boat is facing shark, then turn boat around.. should help with getting stuck
            if ((shark.x > boat.x && boat.scale.x ==-1)||(shark.x<boat.x && boat.scale.x==1)) boat.scale.x*=-1;

        }
    }
}

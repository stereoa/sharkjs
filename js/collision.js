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

function sharkHitsPerson(shark, crewObject) {
    if (crewObject.name == 'bomb') {
        createExplosion(crewObject.x,crewObject.y);
        stunShark();
        crewObject.kill();
        shark.health--;
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

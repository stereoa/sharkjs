var maxVelocity = 50;
var personSpeed = 3;
var boatSinkLevel = 20;
function crewAI(crewMember) {
    if (crewMember.name == "bomb") {
        if (crewMember.body.velocity.y < 5) crewMember.body.velocity.y = 0;
        else crewMember.body.velocity.y *= .99;
    }
    else {
        //flee down
        if (shark.y < crewMember.y) {
            crewMember.body.velocity.y += personSpeed;
            crewMember.angle = 180;
        }

        //left
        else if (shark.x > crewMember.x) {
            crewMember.body.velocity.x -= personSpeed;
            crewMember.angle = 270;
        }
        //right
        else if (shark.x < crewMember.x) {
            crewMember.body.velocity.x += personSpeed;
            crewMember.angle = 90;
        }

        // up
        else if (shark.y > crewMember.y) {
            crewMember.body.velocity.y -= personSpeed;
            crewMember.angle = 0;
        }
    }
}
function crewPhysics(crewMember) {
    if (crewMember.name != "bomb") {
        if (Math.abs(crewMember.body.velocity.x) > maxVelocity) {
            if (crewMember.body.velocity.x > maxVelocity) crewMember.body.velocity.x = maxVelocity;
            else if (crewMember.body.velocity.x * -1 > maxVelocity) crewMember.body.velocity.x = maxVelocity * -1;
        }
        if (Math.abs(crewMember.body.velocity.y) > maxVelocity) {
            if (crewMember.body.velocity.y > maxVelocity) crewMember.body.velocity.y = maxVelocity;
            else if (crewMember.body.velocity.y * -1 > maxVelocity) crewMember.body.velocity.y = maxVelocity * -1;
        }
        if (crewMember.y < waterLine) crewMember.body.velocity.y += 100;
    }

    if (crewMember.x < 0 || crewMember.x > 800 || crewMember.y > 600) crewMember.kill();
}
function boatSpawn(amount) {
    for (var i = 0; i < amount; i++) {
        if (randomNum(1, 3) == 2) {
            var bomb;

            bomb = crewGroup.create(boat.x, boat.y, "bomb");
            bomb.name = "bomb";
            bomb.anchor.setTo(.5, .5); //center flip area
            bomb.body.velocity.y = randomNum(100,450);
            bomb.x += randomNum(-15, 15);
            bomb.body.collideWorldBounds = false;
        }
        else {
                var person;

                if (randomNum(1, 2) == 1) person = crewGroup.create(boat.x, boat.y, "person01");
                else person = crewGroup.create(boat.x, boat.y, "person02");
                person.anchor.setTo(.5, .5); //center flip area

                person.body.velocity.x = randomNum(-50, 50);
                person.body.velocity.y = randomNum(-50, 50);
                person.x += randomNum(-15, 15);
                person.body.collideWorldBounds = false;
            }
    }
}
function handleBoat() {
    if (boat.x <= 36) {
        boat.scale.x = -1;
    }
    if (boat.scale.x == -1) {
        boat.body.velocity.x = 40;
    }
    if (boat.x >= 764) {
        boat.scale.x = 1;
    }
    if (boat.scale.x == 1) {
        boat.body.velocity.x = -40;
    }
    boat.body.velocity.y = 0;
    boat.y = boatSinkLevel;
    boatSinkLevel += .004;

}

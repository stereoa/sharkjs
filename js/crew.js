var maxVelocity = 50;
var personSpeed = 3;
function crewAI(person){
    //flee down
    if (shark.y < person.y){
        person.body.velocity.y+=personSpeed;
        person.angle = 180;
    }
    
    //left
    else if (shark.x > person.x) {
        person.body.velocity.x-=personSpeed;
        person.angle = 270;
    }
    //right
    else if (shark.x < person.x){
        person.body.velocity.x+=personSpeed;
        person.angle = 90;
    }

    // up
    else if (shark.y > person.y){
        person.body.velocity.y-=personSpeed;
        person.angle = 0;
    }

}
function crewPhysics(person)
{
    if (Math.abs(person.body.velocity.x)>maxVelocity)
    {
        if (person.body.velocity.x > maxVelocity) person.body.velocity.x = maxVelocity;
        else if (person.body.velocity.x * -1 > maxVelocity) person.body.velocity.x = maxVelocity * -1;
    }
    if (Math.abs(person.body.velocity.y)>maxVelocity)
    {
        if (person.body.velocity.y > maxVelocity) person.body.velocity.y = maxVelocity;
        else if (person.body.velocity.y * -1 > maxVelocity) person.body.velocity.y = maxVelocity * -1;
    }
    /*if (person.y<waterLine) person.body.velocity.y+=100;
    if (boat.y>26) 
        {
            if (boat.y>100) boat.y +=7;
            else boat.y -=3;
        }
    else if (boat.y<26) boat.y +=2;*/
    
}
function crewSpawnPerson(amount)
{
    for (var i = 0; i < amount; i++)
    {
        var person; 

        if (randomNum(1,2)==1) person = crewGroup.create(boat.x,boat.y, "person01");
        else person = crewGroup.create(boat.x,boat.y, "person02");       
        person.anchor.setTo(.5, .5); //center flip area
        
        person.body.velocity.x = randomNum(-50,50);
        person.body.velocity.y = randomNum(-50,50);
        person.x += randomNum(-15,15);
        person.body.collideWorldBounds = true;
    }
}
var maxVelocity = 50;
var personSpeed = 5;
function crewAI(person){
    //flee down
    if (shark.y < person.y){
        person.velocity.y+=personSpeed;
        person.angle = 180;
    }
    
    //left
    else if (shark.x > person.x) {
        person.velocity.x-=personSpeed;
        person.angle = 270;
    }
    //right
    else if (shark.x < person.x){
        person.velocity.x+=personSpeed;
        person.angle = 90;
    }
   
    // up
    else if (shark.y > person.y){
        person.velocity.y-=personSpeed;
        person.angle = 0;
    }
   
}
function crewPhysics(person)
{
    if (Math.abs(person.velocity.x)>maxVelocity)
    {
        if (person.velocity.x > maxVelocity) person.velocity.x = maxVelocity;
        else if (person.velocity.x * -1 > maxVelocity) person.velocity.x = maxVelocity * -1;
    }
    if (Math.abs(person.velocity.y)>maxVelocity)
    {
        if (person.velocity.y > maxVelocity) person.velocity.y = maxVelocity;
        else if (person.velocity.y * -1 > maxVelocity) person.velocity.y = maxVelocity * -1;
    }
    if (person.y<waterLine) person.velocity.y+=100;
    
}
function crewSpawnPerson()
{
    var person; 
    
    if (randomNum(1,2)==1) person = crewGroup.create(boat.x,boat.y, "person01");
    else person = crewGroup.create(boat.x,boat.y, "person02");       
    person.anchor.setTo(.5, .5); //center flip area
    
    person.velocity.x = randomNum(-50,50);
    person.velocity.y = randomNum(-50,50);
    person.x += randomNum(-15,15);
    person.body.collideWorldBounds = true;
}

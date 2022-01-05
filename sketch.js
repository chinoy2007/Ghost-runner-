var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"
var score=0;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  //spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 4;
  doorsGroup=new Group();
  climbersGroup= new Group();
  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.4;

  invisibleBlockGroup= new Group();
}

function draw() {
  background(200);
  
    
  
  if (keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }
  if (keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }
  if (keyDown("space")){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.8;

if(climbersGroup.isTouching(ghost)){
  ghost.velocityY=0;
}
if (invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
  ghost.destroy();
  gameState="end";
}
 
 
   

  if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();
    drawSprites();

  

  
    if (gameState==="end"){
      stroke("yellow");
      fill("yellow");
      textSize(30);
      text("Game Over",230,250);
    //   if(ghost.y>600 || keyDown("SPACE") || mousePressedOver(tower)) {      
    //     reset();
    // }
  }
}

function spawnDoors(){
  if (frameCount%240===0){
  var door =  createSprite(200,-50);
  door.addImage(doorImg);
  door.x=Math.round(random(120,400));
  door.velocityY=4;
  doorsGroup.add(door);
  door.lifetime=800;

  var climber=createSprite(200,10);
  climber.addImage(climberImg);
  climber.x=door.x;
  climber.velocityY=4;
  climbersGroup.add(climber);
  climber.lifetime=800;

  ghost.depth=door.depth;
  ghost.depth+=1;

  var invisibleBlock= createSprite(200,15);
  invisibleBlock.width=2;
  invisibleBlock.hieght=2;
  invisibleBlock.x=door.x;
  invisibleBlock.velocityY=4;
  invisibleBlock.lifetime=800;
  invisibleBlockGroup.add(invisibleBlock);
  invisibleBlock.debug=false;
  }
}
// function reset(){
//   gameState = "play";
//   ghost.x=200;
//   // gameOver.visible = false;
//   // restart.visible = false;
//   //  score = 0;
// }

var PLAY=1;
var END=0;
var gameState=PLAY;

var bg,bgimage ;
var girl,girl_run;
var obstacle,obstacleGroup,t1,t2,t3,t4,t5;
var score =0;
var resetImage,reset;
var luckImage,luck;


function preload(){
  bgimage = loadImage("images/BG.png");
  girl_run = loadAnimation("images/run1.png","images/run2.png","images/run3.png","images/run4.png","images/run5.png","images/run6.png","images/run7.png","images/run8.png");
  t1 = loadImage("images/t1.png");
  t2 = loadImage("images/t2.png");
  t3 = loadImage("images/t3.png");
  t4 = loadImage("images/t4.png");
  t5 = loadImage("images/t5.png");
  luckImage = loadImage("images/luck.png");
  resetImage = loadImage("images/reset.png");
  girl_stand=loadAnimation("images/run1.png");
}


function setup() {
  createCanvas(750,600);
 bg= createSprite(200, 350, 900 ,400);
 bg.addImage(bgimage);
 bg.x = 800;
 girl = createSprite(50,550);
 girl.addAnimation("running",girl_run);
 girl.addAnimation("standing",girl_stand);
 girl.scale = 0.2;
 //girl.debug = true;
 girl.setCollider("circle",0,0,50);
 
 bg.scale = 0.875;
 ground = createSprite(0,580,400,20);
 ground.visible = false;
 reset = createSprite(350,300);
 reset.addImage(resetImage);
 reset.scale = 0.5;
 luck = createSprite(350,100);
 luck.addImage(luckImage);
 luck.scale = 0.150
 obstacleGroup = new Group();
}

function draw() {
  background(0);
  //console.log(bg.x) 
  if(gameState===PLAY){

  reset.visible=false;
  luck.visible=false;
  bg.velocityX = -(2+3*score/100);
  
  
  score= score+Math.round(getFrameRate()/60);
  if(bg.x<0){
    bg.x = 400;
  }

  if(keyDown("space")&& girl.y>=500){
  girl.velocityY = -15;
  }
girl.velocityY = girl.velocityY + 0.8;
girl.collide(ground);
spawnObstacles();
if(obstacleGroup.isTouching(girl)){
  gameState=END;
  girl.changeAnimation("standing",girl_stand);
}
  }

  else if(gameState===END){
    bg.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    girl.velocityY=0;
    reset.visible=true;
    luck.visible=true;
  }
  if(mousePressedOver(reset)){
    restart();
  }
  drawSprites();
  textSize(35);
  fill("red");
  text("Score:"+score,500,100);
}
function restart(){
  gameState=PLAY;
  obstacleGroup.destroyEach();
  girl.changeAnimation("running",girl_run);
  score=0;
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
     var obstacle = createSprite(750,550,10,40); 
     //obstacle.debug = true; 
     obstacle.velocityX = -(6+score/100) ; 
     //generate random obstacles 
     var rand = Math.round(random(1,5));
     switch(rand) { 
       case 1: obstacle.addImage(t1); 
       break; 
       case 2: obstacle.addImage(t2);
        break; 
        case 3: obstacle.addImage(t3); 
        break;
         case 4: obstacle.addImage(t4);
          break;
           case 5: obstacle.addImage(t5); 
           break; 
             default: break;
             } 
             //assign scale and lifetime to the obstacle
              obstacle.scale = 0.2;
               obstacle.lifetime = 300;
               //add each obstacle to the group
                obstacleGroup.add(obstacle);
               } 
              }
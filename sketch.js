var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
bananaImage=loadImage("banana.png")
stoneImage=loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;
  foodGroup=new Group ()
  stoneGroup=new Group()
}

function draw() { 
  background(0);
  drawSprites();
  if(gameState===PLAY){
    spawnStones();
    spawnFoods();
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
if (foodGroup.isTouching(player)){
foodGroup.destroyEach()
player.scale+=0.02

}
if(stoneGroup.isTouching(player)){
  gameState=END
}
  }


  else if (gameState===END){
    backgr.velocityX=0
    player.visible=false
    foodGroup.destroyEach()
    stoneGroup.destroyEach()
    fill("blue")
    textSize(30)
    text("G A M E   O V E R ",350,200)
    
  }

  
  

}
  function spawnFoods(){

    if (frameCount%100===0){
      var banana=createSprite(600,250,20,20)
      banana.velocityX=-4
      banana.y=random(100,200)
      banana.addImage("banana",bananaImage)
      banana.scale=0.05
      banana.lifetime=300
      foodGroup.add(banana)
    }
  };

  function spawnStones(){

    if (frameCount%100===0){
      var stone=createSprite(600,350,20,20)
      stone.velocityX=-8
     
      stone.addImage("stone",stoneImage)
      stone.scale=0.25
      stone.lifetime=300
      stoneGroup.add(stone)
    }
  };


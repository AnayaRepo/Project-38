var bananaImage, obstacleImage, backgroundImage,backGround, score, monkeyImage, monkey, ground;
var obstacleGroup, bananaGroup;

function preload() {
  backgroundImage = loadImage("jungle.jpg")
  monkeyImage = loadAnimation("Monkey_01.png",         "Monkey_02.png", "Monkey_03.png", "Monkey_04.png",   "Monkey_05.png", "Monkey_06.png", "Monkey_07.png",
  "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");       
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(displayWidth-100, displayHeight-150);
  
  score = 0;
  
  backGround = createSprite(200,200,400,400);
  backGround.addImage("background",backgroundImage);
  //backGround.velocityX = -4;
  //backGround.x = backGround.width/2;
  
  monkey = createSprite(200,365 ,20,20);
  monkey.addAnimation("monkey", monkeyImage);
  monkey.scale = 0.15;
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  ground = createSprite(200,375,400,10);
  ground.visible = false;
}

function draw() {
  background(220);

  stroke("white");

  camera.position.x = monkey.x;
  camera.position.y = displayHeight-2;

  if (backGround.x < 0){
    backGround.x = backGround.width/2;
    }
  
   if (keyDown("space")) {
    monkey.velocityY = -15;
  } 
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  if (bananaGroup.isTouching(monkey)) {
     score = score + 2;
    
     bananaGroup.destroyEach();
  }
    
  switch(score) {
    case 10: monkey.scale = 0.12;
        break;
    case 20: monkey.scale = 0.14;
        break;        
    case 30: monkey.scale = 0.16;
        break;
    case 40: monkey.scale = 0.18;
        break;        
    default: break;
   }
  
  if (obstacleGroup.isTouching(monkey)) {
      monkey.scale = 0.2;
  }

  textSize(20);
  fill("white");
  text("Score:" + score,300,50);
  console.log(score);
 
  food();
  obstacles();

 drawSprites(); 
}


function food () {
  if (frameCount % 60 === 0) {
    var banana = createSprite(400,100,10,10);
    banana.y = random(120,200);
    banana.addImage("Banana",bananaImage);
    banana.scale = 0.06;
    banana.velocityX = -3;
    banana.lifetime = 125;
    
    bananaGroup.add(banana);
  }
  
}

function obstacles () {
  if (frameCount % 80 === 0) {
    var stone = createSprite(400,328,10,10);
    stone.velocityX = -6;
    stone.addImage("Stone",obstacleImage);
    stone.scale = 0.15;
    stone.lifetime = 67;
    
    obstacleGroup.add(stone);
  }
  
}
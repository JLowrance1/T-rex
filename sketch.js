var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var score;
var cloudGroup;
var cactiGroup;
var PLAY = 1
var END = 0
var gameState = PLAY;
var restart, gameOver;
var restartImage, gameOverImage;
var checkpoint, jump, die;


function preload() {
    trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
    trex_collided = loadImage("trex_collided.png");

    groundImage = loadImage("ground2.png");
  
    cloudImage = loadImage("cloud.png");
  
    restartImage = loadImage("restart.png");
  
    gameOverImage = loadImage("gameOver.png");
  
    obstacle1 = loadImage("obstacle1.png");
    obstacle2 = loadImage("obstacle2.png");
    obstacle3 = loadImage("obstacle3.png");
    obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
    obstacle6 = loadImage("obstacle6.png");
    
    jump = loadSound("jump.mp3");
    die = loadSound("die.mp3");    
    checkpoint = loadSound("checkPoint.mp3");
    
  }

function setup() {
  createCanvas(600, 600);

  //create a trex sprite
  trex = createSprite(50,400,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("trexMix.exe is not responding", trex_collided)
  
  
  //create a restart and gameover sprite
  restart = createSprite(300,200,10,10);
  restart.addImage("restart", restartImage);
  gameOver = createSprite(300,100,10,10);
  gameOver.addImage("gameOver", gameOverImage);
  

  
  //create a ground sprite
  ground = createSprite(200,400,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  

  //invisible ground
    invisibleGround = createSprite(200,421,400,20);
    invisibleGround.visible = false;
    
  //score setup
    score = 0
  
  //cloud setup
  cloudGroup = createGroup();
  
  //cacti setup
  cactiGroup = createGroup();
  
  trex.setCollider("circle",0,0,40);
  
  //trex.setCollider("rectangle",0,0,300,100)
  
  trex.debug = false
  
  
  
  }

function draw() {
    
    background("black");
  
    if (gameState === PLAY) {
        ground.velocityX = -(6+score/200);
        spawnClouds();
        spawnObstacles();
        restart.visible = false;
        gameOver.visible = false;
        //jump when the space button is pressed
        if (keyDown("space") && trex.y > 387){
            trex.velocityY = -15;
            jump.play();
        }
        
        trex.velocityY = trex.velocityY + 0.4
      
        if (ground.x < 0) {
            ground.x = ground.width / 2;
        }
        score = score+ Math.round(frameRate()/30);
        
        //console.log(frameRate());
        
        
        if (score > 0 && score%100 === 0) {
            checkpoint.play();
        }

        if (cactiGroup.isTouching(trex)) {
            gameState = END
            die.play();
            //jump.play();
            //trex.velocityY = -10
        }
        
        if (trex.y > 387) {
            trex.changeAnimation("running", trex_running)
        }
        
        if (trex.y < 380) {
            trex.changeAnimation("trexMix.exe is not responding",               trex_collided)
        }
      
    }
  
    else if (gameState === END) {
        ground.velocityX = 0;
        cactiGroup.setVelocityXEach(0);
        trex.velocityY = 0;
        cloudGroup.setVelocityEach(0,0);
        cloudGroup.setLifetimeEach(-1);
        cactiGroup.setLifetimeEach(-1);
        trex.changeAnimation("trexMix.exe is not responding", trex_collided)
        gameOver.visible = true;
        restart.visible = true;
        if (mousePressedOver(restart)) {
            gameState = PLAY;
            cactiGroup.destroyEach();
            cloudGroup.destroyEach();
            score = 0
            
        }
    } 
    
    

    

    

    
    textSize(20);
    text("score: ",500,40);
    text(score,500,60);
    
    
    

    trex.collide(invisibleGround);
    drawSprites();
    
    }

function spawnClouds() {
    
    //console.log(trex.depth);
    
  
    if (frameCount%100 === 0) {
      var cloud = createSprite(650,200);
      cloud.velocityX = -5;
      cloud.addImage(cloudImage);
      cloud.scale = 1.35;
      cloud.depth = trex.depth;
      trex.depth++  
      cloudGroup.add(cloud);
      cloud.y = random(10,300);
      cloud.lifetime = 200
  }
  
}

function spawnObstacles() {
  
  if (frameCount%200 === 0) {
    var obstacle = createSprite(600,350,10,100);
    obstacle.velocityX = -(6+score/200)
    cactiGroup.add(obstacle);
    console.log(obstacle.velocityX)
    var randomObstacle = Math.round(random(1,5));
    //obstacle.debug = true
    switch(randomObstacle) {
      case 1: obstacle.addImage(obstacle1);
        break;
      case 2: obstacle.addImage(obstacle2);
        break;
      case 3: obstacle.addImage(obstacle3);
        break;
      case 4: obstacle.addImage(obstacle5);
        break;
      case 5: obstacle.addImage(obstacle6);
        break;
      default:
        break;
        
    }
    obstacle.scale = 1.35
    obstacle.lifetime = 200
  }
  
}
  
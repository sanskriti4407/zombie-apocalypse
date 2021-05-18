var bbg,bg,pbg,g,p;
var gameState=0;
var form,name,player,pim;
var base,canvas;
var mpouch,mim;
var bg2;
var bullet,bim;
var zombie,zim;
var ground,ig;
var zombieGroup;
var bulletGroup;
var lifes=3;
var lim,lifes2,lifes3,lifes1;
var gun,gim;
var score=0;

function preload(){
bg=loadImage("images/bg.jpg");
base=loadImage("images/base1.jpg");
pim=loadImage("images/player.png")
mim=loadImage("images/pouch.png");
bg2=loadImage("images/bg2.jpg")
bim=loadImage("images/bullet.png");
zim=loadImage("images/z1.png","images/z2.png","images/z3.png")
lim=loadImage("images/2.png");
gim=loadImage("images/gun1.png");
}
 

function setup(){
  canvas = createCanvas(displayWidth, displayHeight);
  zombieGroup=new Group();
  bulletGroup=new Group();
  lifes1=createSprite(20,20);
    lifes2=createSprite(50,20);
    lifes3=createSprite(80,20);
    lifes1.addImage(lim);
    lifes1.scale=0.05;
    lifes2.addImage(lim);
    lifes2.scale=0.05;
    lifes3.addImage(lim);
    lifes3.scale=0.05;
    lifes1.visible=false;
    lifes2.visible=false;
    lifes3.visible=false;
    if(gameState===0){
      form = new Form()
      form.display();
    
     }
     if(gameState===1){
     // Text("enter",200,300);
     }

     ground = createSprite(300,200,displayWidth/2+150, displayHeight/2+125);
  ground.addImage(bg2);
  ground.velocityX = -(4 + 2*score/100);
  ground.visible=false;
  ground.scale=1.7;
  player=createSprite(200,600)
  player.addImage(pim);
  player.scale=0.8;
  player.visible=false;
  mpouch=createSprite(850,420);
  mpouch.addImage(mim);
  mpouch.scale=0.2;
  mpouch.visible=false;
  gun=createSprite(0,0);
  gun.addImage(gim);
  gun.x=player.x+100;
  gun.y=player.y-50;
  gun.scale=0.3;
  gun.visible=false;
  
    
 //ig = createSprite(300,600,displayWidth+150, 10);
 //ig.shapeColor="red";
 //ig.debug=true;
// ig.visible=false;
 
}

function draw(){
 
  
  if(gameState===2){
    gs2();
  }
  if(gameState===3){
    play();
  }

  if(gameState===4){
    play2();
  }
  if(gameState===5){
    play3();
  }
  drawSprites();
}

function gs2(){
  
  form.hide();
  clear();
  background("pink");
  
 image(base,0,0,displayWidth, displayHeight);
  
 player.visible=true;
 mpouch.visible=true;
  
  if(keyIsDown(67)){
    gameState=3;
  }
 
  
}

function play(){
  clear();
  
 // image(bg2,0,0,displayWidth/2+150, displayHeight/2+125);
 
 //text(lifes+"lifes",30,40);
 textSize(30)
  text("Score: "+ score, 200,30);
  ground.visible=true;
  player.visible=true;
  mpouch.visible=false;
  gun.visible=true;
  player.debug=true;
  
  lifes1.depth=ground.depth;
    lifes1.depth+=1;
    lifes2.depth=ground.depth;
    lifes2.depth+=1;
    lifes3.depth=ground.depth;
    lifes3.depth+=1;
    if(lifes===3){
      lifes1.visible=true;
      lifes2.visible=true;
      lifes3.visible=true;
    }
    console.log(lifes);
    console.log(bulletGroup);
  if(keyWentDown("space")){
      bullet=createSprite(290,370);
      bullet.addImage(bim);
      bullet.scale=0.1;
      bullet.velocityX=4;
      bulletGroup.add(bullet);
      bullet.y=gun.y-25;
      bullet.x=gun.x+75;
      bullet.debug=true;
  }
  zombies();
  
    if(ground.x<550){
      ground.x=800
    }
   // player.collide(ig);
    if(keyDown("down")){
      player.y=player.y+5;
      gun.y=gun.y+5;
    }
    if(keyDown("up")){
      player.y=player.y-5;
      gun.y=gun.y-5;
    }
    
  for(var i = 0; i < zombieGroup.length; i++){ 
    for(var j = 0; j < bulletGroup.length; j++){ 
      if(bulletGroup.get(j).isTouching(zombieGroup.get(i))){ 
        zombieGroup.get(i).remove();
      bulletGroup.get(j).remove();
      
     }
    }
    if(zombieGroup.get(i).isTouching(bulletGroup)){ 
      
    zombieGroup.get(i).remove();
    
  }
}
  


     
     for(var i = 0; i < zombieGroup.length; i++){ 
      if(zombieGroup.get(i).isTouching(player)){ 
        zombieGroup.get(i).remove();
   // gameState=4;
    lifes=lifes-1;
   
  
     }
  }
  if(lifes===0){
    gameState=4;
    lifes1.visible=false;
  }
  
  if(lifes===2){
    lifes3.visible=false;
  }
  if(lifes===1){
    lifes2.visible=false;
    
  }
  
  
  score = score + Math.round(getFrameRate()/60);
    
  console.log(score);
  if(score===5000){
    gameState=5;
  }
 
}


function play2(){
  clear();
  background("cyan");
  zombie.visible=false;
  player.visible=false;
  ground.visible=false;
  
  textSize(50);
  text("BETTER LUCK NEXT TIME",500,400);
}

function zombies(){
  if (frameCount % 200 === 0) {
    zombie = createSprite(1600,random(300,700), 100, 100);
    
    zombie.addImage(zim);
    zombie.velocityX = -3;
    zombie.scale=1.7;
    zombieGroup.add(zombie);
    zombie.debug=true;
    }
}

function play3(){
  clear();
  background("pink");
  zombie.visible=false;
  player.visible=false;
  ground.visible=false;
  textSize(50);
  text("ROUND 2",500,400);
}

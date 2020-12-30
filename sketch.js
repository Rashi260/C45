const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var engine, world;
var ground, groundImg, invisibleGround;
var gameState= 0;
var girl1Img, g1;
var storyImg, story;
var boy, boyGroup, boyImg, boy2Img;
var life = 3;
var sg;
var gameOver, restart, restartImg;
var coins, coinsGroup;
var cCount= 0;

function preload(){
    groundImg = loadImage("images/sprite_0.png");
    storyImg = loadImage("images/story.jpg");
    girl1Img = loadAnimation("images/g1.png","images/g2.png","images/g3.png","images/g4.png","images/g5.png","images/g6.png","images/g7.png","images/g8.png");
    boyImg = loadImage("images/bike.png");
    boy2Img = loadImage("images/boy.png");
    sg = loadAnimation("images/g1.png");
}

function setup(){
    var canvas = createCanvas(800,400);
    engine = Engine.create();
    world = engine.world;

    form= new Form();

    ground = createSprite(0,0,800,400);
    ground.addImage(groundImg);
    ground.scale = 2.5;
   //ground.velocityX= -2;

    g1 = createSprite(50,100);
    g1.addAnimation("Running",girl1Img);
    g1.scale = 0.1;
    g1.addAnimation("Still",sg);

    story = createSprite(400,200);
    story.addImage(storyImg);
    story.scale = 0.5;

    invisibleGround = createSprite(400,450,800,5);
    invisibleGround.visible = false;

    boyGroup= new Group();

    gameOver = createSprite(400,150,40,10);
    gameOver.visible= false;

    restart = createSprite(400,200,20,10);
    restart.visible= false;

    coinsGroup = new Group();

}
function draw(){
    background(102, 255, 179);
    Engine.update(engine);

    if(gameState===0){
        form.display();
        g1.visible=false;
        ground.visible=false;
        story.visible = true;
    }

    if(gameState===1){
        ground.scale = 5.5;
        //ground.velocityX= -4;
        story.visible = false;
        g1.visible=true;
        ground.visible=true;

        camera.position.y = 200;
        camera.position.x = 400;

        if(keyIsDown(32) && g1.y >= 300){
            g1.velocityY= -20;
        }


        evils();
        coinsCount();

        if(coinsGroup.isTouching(g1)){
            cCount = cCount+1;
        }

        if(boyGroup.isTouching(g1)){
            life = life-1;
        }

        if(life === 0){
            gameState=2;
        }
    }
    else if(gameState=== 2){
        g1.changeAnimation("Still",sg);
        boyGroup.setVelocityXEach(0);
        boyGroup.setLifetimeEach(-1);
        coinsGroup.setVelocityXEach(0);
        coinsGroup.setLifetimeEach(-1);
        gameOver.visible=true;
        restart.visible=true;

    }

    g1.velocityY = g1.velocityY + 0.8;
    g1.collide(invisibleGround);
    drawSprites();
}

    function evils(){
        if(frameCount% 250 === 0){
            boy = createSprite(800,300);
            var ran = random(1,2);
            switch(ran){
                case 1:
                    boy.addImage(boyImg);
                break;
                case 2: 
                     boy.addImage(boy2Img);
                break;
            }
            boy.addImage(boyImg);
            boy.scale=0.2;
            boy.velocityX= -2;
            boy.lifetime = 400;
            boy.depth = g1.depth;
            g1.depth= g1.depth+1;
            boyGroup.add(boy);
        }
    }

    function coinsCount(){
        if(frameCount%200 === 0){
            for(var i = 0; i<5; i++){
            coins = createSprite(800+i*20,160,10,10);
            coins.velocityX = -4;
            coinsGroup.add(coins);
            }
        }
    }
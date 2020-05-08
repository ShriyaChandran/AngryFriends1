const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, enemy1,enemy3;
var backgroundImg,platform;
var player, slingshot;
var score = 0;

var gameState = "onSling";

function preload() {
    getTime();
}

function setup(){
    getTime();
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    enemy1 = new Enemy(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    enemy3 = new Enemy(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    player = new Player(200,50);

    slingshot = new SlingShot(player.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg!=null){
        background(backgroundImg);
    }
    noStroke(); 
    textSize(35);
    fill("white");
    text("Score " + score, width-300, 50);
    Engine.update(engine);
    box1.display();
    box2.display();
    ground.display();
    enemy1.display();
    enemy1.score();
    log1.display();

    box3.display();
    box4.display();
    enemy3.display();
    enemy3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    player.display();
    platform.display();
    slingshot.display();    
}

function mouseDragged(){
    if (gameState!=="launched"){
        Matter.Body.setPosition(player.body, {x: mouseX , y: mouseY});
    }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32&&player.body.speed<1){
        player.trajectory=[];

     Matter.Body.setPosition(player.body,{
         x:200,
         y:50
     })
        slingshot.attach(player.body);
     }
}

async function getTime(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/kolkata");
    var responseJSON = await response.json();
    var hour = responseJSON.datetime.slice(11,13);
    if(hour>=05&&hour<=19){
        bg = "sprites/bgDay.jpg";
    }
    else{
        bg = "sprites/bgNight.jpg";
    }
    backgroundImg = loadImage(bg);
}
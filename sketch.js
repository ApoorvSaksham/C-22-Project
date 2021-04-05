var starImg,bgImg;
var star;
var Bgmusic;
var fairy, fairyImage;
var sEngine, sWorld;
 
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var starBody;

function preload()
{
	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starryNight.jpg");

    fairyImage = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	Bgmusic = loadSound("Bgmusic.mp3");
	
}

function setup() {
	createCanvas(800, 700);

	Bgmusic.play();

    fairy = createSprite(100,300,20,20);
	fairy.addAnimation("fairyImg",fairyImage);
	fairy.scale = 0.25;
	fairy.debug = false;
	fairy.setCollider("rectangle",0,0,900,1280)

	

	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;


	sEngine = Engine.create();
	sWorld = sEngine.world;

	starOptions = {
		isStatic: true,
		restitution: 0.6
	}
	starBody = Bodies.circle(650 , 30 , 5 ,starOptions);
	World.add(sWorld,starBody);
	
	Engine.run(sEngine);

}


function draw() {
  background(bgImg);
  edges = createEdgeSprites();
  fairy.bounceOff(edges);

  star.x = starBody.position.x;
  star.y = starBody.position.y;
  
  ellipseMode(CENTER);
  ellipse(starBody.position.x,starBody.position.y,5,5);

  if(star.y>255 && starBody.position.y>255){
	  Matter.Body.setStatic(starBody,true);
  }

  drawSprites();

}

function keyPressed() {

	if (keyCode === DOWN_ARROW) {
		Matter.Body.setStatic(starBody,false); 
	}

	if(keyCode === LEFT_ARROW){
		fairy.x = fairy.x-10;
	}
	if(keyCode === RIGHT_ARROW){
		fairy.x = fairy.x+10;
	}
	
}

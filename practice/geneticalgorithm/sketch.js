var vehicles = [];
var food = [];
var poison = [];
var debug;

function setup() {
  createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < 50; i++) {
    vehicles[i] = new Vehicle(random(width), random(height));
  }

  for (var i = 0; i < 40; i++) {
    food.push(createVector(random(width), random(height)));
  }

  for (var i = 0; i < 20; i++) {
    poison.push(createVector(random(width), random(height)));
  }
  debug = createCheckbox();
  debug.position(0,0);
}

function mouseDragged() {
  vehicles.push(new Vehicle(mouseX, mouseY));
}

function draw() {
  background(51);

  if (random(1) < 0.1) {
    food.push(createVector(random(width), random(height)));
  }

  if (random(1) < 0.01) {
    poison.push(createVector(random(width),random(height)));
  }

  for (var i = 0; i < food.length; i++) {
    fill(0, 255, 0);
    noStroke();
    ellipse(food[i].x, food[i].y, 8, 8);
  }

  for (var i = 0; i < poison.length; i++) {
    fill(255, 0, 0);
    noStroke();
    ellipse(poison[i].x, poison[i].y, 8, 8);
  }

  for (var i = vehicles.length - 1; i >= 0; i--) {
    vehicles[i].boundaries();
    vehicles[i].behaviors(food, poison);
    vehicles[i].update();
    vehicles[i].display();

    var newVehicle = vehicles[i].clone();
    if (newVehicle != null) vehicles.push(newVehicle);

    if (vehicles[i].dead()) {
      var x = vehicles[i].pos.x;
      var y = vehicles[i].pos.y;
      food.push(createVector(x, y));
      vehicles.splice(i, 1);
    }
  }
}

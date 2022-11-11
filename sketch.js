boids = [];
boids_num = 10;

function setup() {
  createCanvas(400, 400);

  for (let i = 0; i < boids_num; i++) {
    boids.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  background(220);

  for(let boid of boids) {
    boid.update(boids);
    boid.draw();
  }

  // noLoop();
}
boids = [];
boids_num = 100;

function setup() {
  createCanvas(800, 500);

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
}
class Boid
  {
    constructor(x, y)
    {
      this.pos = createVector(float(x), float(y));
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.maxspeed = 2;
      this.maxforce = 0.05;
      this.r = 5;
    }

    // Method to update location
    update(boids)
    {
      // Update position based on cohesion, separation, and alignment
      var sep = this.separation(boids);
      var ali = this.alignment(boids);
      var coh = this.cohesion(boids);

      // print("Cohesion: " + coh);

      this.vel.add(sep).add(ali).add(coh);

      this.vel.limit(this.maxspeed);

      this.pos.add(this.vel);

      // Wraparound
      if (this.pos.x > width) this.pos.x = 0;
      if (this.pos.x < 0) this.pos.x = width;
      if (this.pos.y > height) this.pos.y = 0;
      if (this.pos.y < 0) this.pos.y = height;
    }

    draw()
    {
      // Draw a triangle rotated in the direction of velocity
      var theta = this.vel.heading() + radians(90);
      fill(127);
      stroke(200);

      push();

      translate(this.pos.x, this.pos.y);

      rotate(theta);

      beginShape(TRIANGLES);

      vertex(0, -this.r * 2);
      vertex(-this.r, this.r * 2);
      vertex(this.r, this.r * 2);

      endShape(CLOSE);

      pop();
    }

    cohesion(boids)
    {
      let max_dist = 50;

      let sum = createVector(0, 0);

      let count = 0;

      for (let other of boids)
      {
        // print("pos: " + this.pos + " other.pos: " + other.pos);
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);

        if (d > 0 && d < max_dist)
        {
          sum.add(other.pos);

          count++;
        }
      }

      if (count > 0)
      {
        sum.div(count);

        return sum.sub(this.pos).div(100.0);
      }
    }

    separation(boids)
    {
     let max_dist = 25;

      let sum = createVector(0, 0);

      for(let other of boids)
      {
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);

        if (d > 0 && d < max_dist)
        {
          let diff = p5.Vector.sub(this.pos, other.pos);

          diff.div(d);

          sum.add(diff);
        }
      }

      return sum;
    }

    alignment(boids)
    {

    }
  }
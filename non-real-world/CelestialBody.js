class CelestialBody {
  constructor({ pos, vel, mass, colour }) {
    this.pos = pos;
    this.vel = vel;
    this.mass = mass;
    this.colour = colour;
    this.history = [this.pos];
  }

  update(otherBodies) {
    const { mult, add } = p5.Vector;
    const { pos, vel } = this;

    const acc = this.calcAcc(otherBodies);

    // Update velocity and position using Euler's method
    this.vel = add(vel, mult(acc, dt));
    this.pos = add(pos, mult(vel, dt));

    this.history.push(this.pos);
  }

  calcAcc(otherBodies) {
    const { add } = p5.Vector;

    let acc = createVector(0, 0);

    // Add together all accelerations to get a final heading
    otherBodies.forEach((other) => {
      acc = add(acc, this.calcGrav(other));
    });

    return acc;
  }

  // Calculate gravity between two bodies as a vector such that direction can be
  // taken into account.
  calcGrav(other) {
    const gravSize = this.calcGravSize(other);

    const horDist = other.pos.x - this.pos.x;
    const verDist = other.pos.y - this.pos.y;

    const totalDist = Math.abs(horDist) + Math.abs(verDist);

    const x = (gravSize / totalDist) * horDist;
    const y = (gravSize / totalDist) * verDist;

    return createVector(x, y);
  }

  // Newton's law of universal gravitation
  calcGravSize(other) {
    const r = this.pos.dist(other.pos);
    const m1m2 = this.mass * other.mass;
    const pull = G * m1m2 / r ** 2;

    return pull;
  }
}
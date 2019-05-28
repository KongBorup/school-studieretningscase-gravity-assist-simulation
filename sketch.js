let bodies = [];
let curIndex = 0;

const framerates = [];

function setup() {
  createCanvas(1200, 600);

  bodies = [
    new CelestialBody({
      pos: createVector(-7, 2),
      vel: createVector(TWO_PI, 0),
      immovable: false,
    }),
    new CelestialBody({
      pos: createVector(-3, 0),
      vel: createVector(0, 0),
      immovable: true,
    }),
    new CelestialBody({
      pos: createVector(1, 0),
      vel: createVector(0, 0),
      immovable: true,
    }),
  ];
  
  calculateTrajectories();
}

function calculateTrajectories() {
  for (let i = 0; i < numSteps; i++) {
    bodies.forEach((body) => {
      const allOthers = bodies.filter(other => body !== other);
      body.update(allOthers);
    });
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  scale(70);
  strokeWeight(0.05);
  stroke(34, 139, 34);

  noFill();
  bodies.forEach((body) => {
    const colour = body.immovable ? [218, 165, 32] : [34, 139, 34];

    if (!body.immovable) {
      noFill();
      stroke(...colour);

      beginShape(LINES);
      for (let i = 0; i <= curIndex; i += animSpeed) {
        const { x, y } = body.history[i];
        vertex(x, y);
      }
      endShape();
    }
    
    const { x, y } = body.immovable ? body.history[0] : body.history[curIndex];
    const r = body.immovable ? 0.5 : 0.2;

    noStroke();
    fill(...colour);
    circle(x, y, r);
  });

  curIndex += animSpeed;

  framerates.push(frameRate());

  if (curIndex >= numSteps) {
    console.log('FINISHED ANIMATING');
    noLoop();
  }
}
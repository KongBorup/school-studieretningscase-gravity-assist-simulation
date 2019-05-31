let bodies = [];
let curIndex = 0;

const framerates = [];

function setup() {
  createCanvas(800, 600);

  bodies = [
    // Sun
    new CelestialBody({
      pos: createVector(0, 0),
      vel: createVector(0, 0),
      mass: 333060.402,
      immovable: true,
      colour: [253, 229, 34],
      name: 'Solen',
    }),
    new CelestialBody({
      pos: createVector(1, 0).rotate(-HALF_PI + 0.1246),
      vel: createVector(0, -2.7 * PI).rotate(-HALF_PI + 0.1249),
      mass: 1.381358768e-22,
      immovable: false,
      colour: [0],
      name: 'Voyager 2',
    }),
    // Earth
    // new CelestialBody({
    //   pos: createVector(1, 0),
    //   vel: createVector(0, -TWO_PI),
    //   mass: 1,
    //   immovable: true,
    //   colour: [11, 102, 35],
    //   name: 'Jorden',
    // }),
    // Mars: https://en.wikipedia.org/wiki/Mars
    // new CelestialBody({
    //   pos: createVector(1.523679, 0),
    //   vel: createVector(0, -1.523679 * TWO_PI / 1.88082), // Circumference / Year length
    //   mass: 0.107,
    //   immovable: false,
    //   colour: [161, 37, 27],
    //   name: 'Mars',
    // }),
    // Jupiter: https://en.wikipedia.org/wiki/Jupiter
    new CelestialBody({
      pos: createVector(5.2044, 0).rotate(-PI - QUARTER_PI),
      vel: createVector(0, -5.2044 * TWO_PI / 11.862).rotate(-PI - QUARTER_PI), // Circumference / Year length
      mass: 317.8,
      immovable: true,
      colour: [116, 102, 57],
      name: 'Jupiter',
    }),
    // Saturn: https://en.wikipedia.org/wiki/Saturn
    new CelestialBody({
      pos: createVector(9.5826, 0).rotate(0.88569),
      vel: createVector(0, -9.5826 * TWO_PI / 29.4571).rotate(0.88569), // Circumference / Year length
      mass: 95.159,
      immovable: true,
      colour: [218, 165, 32],
      name: 'Saturn',
    }),
    // Uranus: https://en.wikipedia.org/wiki/Uranus
    new CelestialBody({
      pos: createVector(19.2184, 0).rotate(0.1989),
      vel: createVector(0, -19.2184 * TWO_PI / 84.0205).rotate(0.1989), // Circumference / Year length
      mass: 14.536,
      immovable: true,
      colour: [150, 160, 200],
      name: 'Uranus',
    }),
  ];
  
  calculateTrajectories();
}

function calculateTrajectories() {
  for (let i = 0; i < numSteps; i++) {
    bodies.forEach((body, i) => {
      if (i === 1) {
        const allOthers = bodies.filter(other => body !== other);
        body.update(allOthers);
      } else {
        body.update([bodies[0]]);
      }
    });
  }
}

function draw() {
  background(255);
  translate(width / 4, height / 2);
  scale(20);
  strokeWeight(0.05);

  noFill();
  bodies.forEach((body) => {
    if (!body.immovable) {
      noFill();
      stroke(...body.colour);

      beginShape();
      for (let i = 0; i <= curIndex; i += animSpeed) {
        const { x, y } = body.history[i].pos;
        vertex(x, y);
      }
      endShape();
    }
    
    const { x, y } = body.immovable ? body.history[0].pos : body.history[curIndex].pos;
    // const r = body.immovable ? 1 : 0.4;
    const r = body.mass < 400 ?
      map(body.mass, 0, 999, 0.4, 0.9)
      : 1;

    noStroke();
    fill(...body.colour);
    circle(x, y, r);
    textSize(0.5);
    text(body.name, x + 0.45, y - 0.45);
  });

  curIndex += animSpeed;

  framerates.push(frameRate());

  if (curIndex >= numSteps) {
    console.log('FINISHED ANIMATING');
    noLoop();

    const framerateSum = framerates.reduce((acc, val) => acc + val);
    const avgFramerate = framerateSum / frameCount;
    console.log('Average framerate:', avgFramerate);

    displayData(bodies[1]);
  }
}
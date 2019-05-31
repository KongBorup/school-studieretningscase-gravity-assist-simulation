function displayData(body) {
  console.log('Simulation duration:', simulationTime());
  console.log('Body travelled a distance of', distanceTravelled(body));
  console.log('Average velocity of', avgVelocity(body));

  calculateTrajectoryFromEndingConditions(bodies);

  // Uncomment below lines if you want the data. Commented by default, because
  // it fills up the browser with copyable lines - not wanted!
  // const others = bodies.filter(other => body !== other);
  // const csvData = generateCsvData(body, others);
  // createP(csvData);
}

function calculateTrajectoryFromEndingConditions(finishedBodies) {
  // We don't want to modify the originals, so let's deep copy it all
  const bodies = finishedBodies
    .map(body => Object.assign( Object.create( Object.getPrototypeOf(body)), body));
  // And we don't want to be able to cheat, let's delete the history!
  // We do want to be able to compare to the initial starting conditions, so
  // these will be saved
  const [origStartConds] = bodies[0].history;
  bodies.forEach(body => {
    body.history = [];
    body.saveState();
  });
  
  // Do a reverse Euler method
  for (let i = 0; i < numSteps; i++) {
    bodies.forEach((body) => {
      // All this reverse logic shouldn't be in the class itself as it is not
      // part of a celestial body's behaviour

      if (body.immovable) {
        return;
      }

      const { mult, sub } = p5.Vector;
      const { pos, vel } = body;
      
      const otherBodies = bodies.filter(other => body !== other);
      const acc = body.calcAcc(otherBodies);
  
      // Update velocity and position using reverse Euler's method
      body.vel = sub(vel, mult(acc, dt));
      body.pos = sub(pos, mult(vel, dt));

      body.saveState(acc);
    });
  }

  const { sub } = p5.Vector;
  const newStartConds = bodies[0].history[bodies[0].history.length - 1];
  const diffPos = sub(newStartConds.pos, origStartConds.pos);
  const diffVel = sub(newStartConds.vel, origStartConds.vel);

  console.log('Pos difference:', diffPos, '\nVel difference:', diffVel);
}

function distanceTravelled(body) {
  let sum = 0;

  for (let i = 1; i < body.history.length; i++) {
    const cur = body.history[i].pos;
    const prev = body.history[i - 1].pos;
    const dist = cur.dist(prev);

    sum += dist;
  }

  return sum;
}

function simulationTime() {
  return numSteps * dt;
}

function avgVelocity(body, travelDist) {
  if (!travelDist) travelDist = distanceTravelled(body);

  return travelDist / simulationTime();
}

function avgDistancesToOtherBodies(body, others) {
  const avgDists = body.history.map(({ pos }) => {
    let sum = 0;
    others.forEach(other => sum += pos.dist(other.pos));
    const avg = sum / others.length;

    return avg;
  });

  return avgDists;
}

function generateCsvData(body, others) {
  const vels = body.history.map(({ vel }) => vel.mag());
  const accs = body.history.map(({ acc }) => acc.mag());
  const dists = body.history
    .map(({ pos }) => others.map((other) => pos.dist(other.pos)));
  const names = others.map(({ name }) => name);
  const headers = 'time,vel,acc,x,y,' + names.join(',');

  const lines = [headers];

  for (let i = 0; i < numSteps; i += 25) {
    const t = dt * i;
    const vel = vels[i];
    const acc = accs[i];
    const curDists = dists[i];
    const { x, y } = body.history[i].pos;

    const line = `${[t, vel, acc, x, y].join(',')},${curDists.join(',')}`;
    lines.push(line);
  }

  return lines.join('<br/>');
}

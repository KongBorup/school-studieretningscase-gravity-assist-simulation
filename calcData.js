function displayData(body) {
  console.log('Simulation duration:', simulationTime());
  console.log('Body travelled a distance of', distanceTravelled(body));
  console.log('Average velocity of', avgVelocity(body));

  // Uncomment below lines if you want the data. Commented by default, because
  // it fills up the browser with copyable lines - not wanted!
  // const csvData = generateCsvData(body, [bodies[1], bodies[2]]);
  // createP(csvData);
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

  const lines = ['time,vel,acc,x,y,dist0,dist1'];

  for (let i = 0; i < numSteps; i += 100) {
    const t = dt * i;
    const vel = vels[i];
    const acc = accs[i];
    const { x, y } = body.history[i].pos;
    const [distleft, distright] = dists[i];

    const line = [t, vel, acc, x, y, distleft, distright].join(',');
    lines.push(line);
  }

  return lines.join('<br/>');
}

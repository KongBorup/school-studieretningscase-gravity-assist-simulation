// Masses are measured in Earth masses
const SUN_MASS = 332946; // https://en.wikipedia.org/wiki/Solar_mass
const EARTH_MASS = 1;
const SPACE_SHUTTLE_MASS = 0.001; // according to Google conversion from 2030 tonnes
// const SPACE_SHUTTLE_MASS = 3.39908811e-19; // according to Google conversion from 2030 tonnes
const JUPITER_MASS = 317.8;

// Universal gravitational constant rescaled from m^3 kg^-1 s^-2 to
// AU^3 M⊕^-1 a^-2 (in order: astronomical units, earth masses, years)
const G = 1.185651e-4;

// Options
const dt = 0.0001;
const numSteps = 6 / dt;
const animSpeed = 100;
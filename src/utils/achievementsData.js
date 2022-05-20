export const TEST = 0;
export const WIN1 = 1;
export const WIN10 = 2;
export const WIN100 = 3;
export const SPEED40 = 4;
export const SPEED30 = 5;
export const SPEED20 = 6;
export const HARD1 = 7;
export const HARD10 = 8;
export const HARD100 = 9;

const achievementsData = [
  // {
  //   type: TEST,
  //   title: "Test Achievement",
  //   description: "Just a test...",
  // },
  {
    type: WIN1,
    title: "Cladder Rookie",
    description: "Win 1 game",
  },
  {
    type: WIN10,
    title: "Cladder Gamer",
    description: "Win 10 games",
  },
  {
    type: WIN100,
    title: "Cladder Century",
    description: "Win 100 games",
  },
  {
    type: HARD1,
    title: "Cladder Rookie*",
    description: "Win 1 game on hard mode",
  },
  {
    type: HARD10,
    title: "Cladder Gamer*",
    description: "Win 10 games on hard mode",
  },
  {
    type: HARD100,
    title: "Cladder Century*",
    description: "Win 100 games on hard mode",
  },
  {
    type: SPEED40,
    title: "Slow and Steady",
    description: "Win a game in under 40 seconds",
  },
  {
    type: SPEED30,
    title: "Fast Fingers",
    description: "Win a game in under 30 seconds",
  },
  {
    type: SPEED20,
    title: "Cladder Champion",
    description: "Win a game in under 20 seconds",
  },
];

export default achievementsData;

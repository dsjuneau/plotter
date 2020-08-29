//Select canvas and set initial width
let canvas1 = document.getElementById("canvas-1");
let canvas2 = document.getElementById("canvas-2");
let c1 = canvas1.getContext("2d");
let c2 = canvas2.getContext("2d");
canvas1.width = 1200;
canvas1.height = 800;
canvas2.width = 1200;
canvas2.height = 800;

//Select buttons and assign call back functions
const coin = document.getElementById("btn-1");
coin.addEventListener("click", () =>
  plot(generateRandomSet(1000, 1000, "coin", 1000), c1)
);

const referenceCoin = document.getElementById("btn-3");
referenceCoin.addEventListener("click", () => {
  plot2(generateCoinSet(100), c2, 2);
});

//Draw Grid on canvas
drawGrid(c1);
drawGrid(c2);

/* Callback functions for buttons  ******************************
 *****************************************************************
 ****************************************************************/

//Function generates a probability distrubution depending on the input
const generateRandomSet = (arrayLength, iterations, type, typeNumber) => {
  const numSet = [];
  numSet.length = arrayLength;
  numSet.fill(0);
  let normalNumSet = [];
  switch (type) {
    case "coin":
      for (i = 0; i < iterations; i++) {
        let count = 0;
        for (j = 0; j < typeNumber; j++) {
          let a = Math.floor(2 * Math.random());
          count = count + a;
        }
        numSet[count] = numSet[count] + 1;
      }
      normalNumSet = numSet.map((x) => x * 10);

      break;
    case "dice":
      for (i = 0; i < iterations; i++) {
        let a = Math.floor(1000 * Math.random());
        numSet[a] = numSet[a] + 2;
      }
      break;
    default:
      throw new Error("Must pick an experiment type");
  }
  //let normal = numSet.reduce((a, b) => a + b, 0) / numSet.length / 600;
  //console.log(normal);

  return normalNumSet;
};

//Function plots the probability distribution
const plot = (numSet, c) => {
  for (let i = 0; i < numSet.length; i++) {
    c.beginPath();
    c.moveTo(100 + i, 750);
    c.lineTo(100 + i, 750 - numSet[i]);
    c.strokeStyle = "blue";
    c.stroke();
  }
};

const plot2 = (numSet, c, factor) => {
  let interval = Math.ceil(1100 / numSet.length);
  let addInterval = interval / 2;
  interval = interval * factor;

  const left = 600 + addInterval - (numSet.length / 2) * interval;
  for (let i = 0; i < numSet.length; i++) {
    c.beginPath();
    c.moveTo(left + addInterval, 750);
    c.lineTo(left + addInterval, 750 - numSet[i] * 7 * factor);
    c.strokeStyle = "blue";
    c.stroke();
    addInterval = addInterval + interval;
  }
};

//Function creates a reference graph for coin flips

const generateCoinSet = (numOfCoins) => {
  const numSet = [];
  const denominator = Math.pow(2, numOfCoins);
  for (i = 0; i < numOfCoins + 1; i++) {
    let numerator = fac(numOfCoins) / (fac(i) * fac(numOfCoins - i));
    numSet.push((100 * numerator) / denominator);
  }
  console.log(numSet);
  return numSet;
};

//Function draws a grid on the canvas
function drawGrid(c) {
  c.beginPath();
  c.moveTo(50, 50);
  c.lineTo(50, 751);
  c.lineTo(1150, 751);
  c.strokeStyle = "black";
  c.stroke();

  for (i = 1; i < 11; i++) {
    c.font = "16px Arial";
    c.fillText(`${i * 5}%`, 3, 756 - (i / 10) * 700);
    c.beginPath();
    c.moveTo(45, 750 - (i / 10) * 700);
    c.lineTo(55, 750 - (i / 10) * 700);
    c.strokeStyle = "black";
    c.stroke();
  }
  c.beginPath();
  c.moveTo(600, 756);
  c.lineTo(600, 746);
  c.strokeStyle = "black";
  c.stroke();
  c.fillText(`Mean`, 578, 775);
}

//Factorial function
function fac(n) {
  //base case
  if (n == 0 || n == 1) {
    return 1;
    //recursive case
  } else {
    return n * fac(n - 1);
  }
}

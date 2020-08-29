//Select canvas and set initial width
let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
canvas.width = 1200;
canvas.height = 800;

//Select buttons and assign call back functions

//Draw Grid on canvas
//Function draws a grid on the canvas
const drawGrid = () => {
  c.beginPath();
  c.moveTo(50, 50);
  c.lineTo(50, 751);
  c.lineTo(1150, 751);
  c.strokeStyle = "black";
  c.stroke();

  for (i = 1; i < 11; i++) {
    c.font = "16px Arial";
    c.fillText(`${i * 10}%`, 3, 756 - (i / 10) * 700);
    c.beginPath();
    c.moveTo(45, 750 - (i / 10) * 700);
    c.lineTo(55, 750 - (i / 10) * 700);
    c.strokeStyle = "black";
    c.stroke();
  }
};
drawGrid();
/* Callback functions for buttons  ******************************
 *****************************************************************
 ****************************************************************/

//Function generates a probability distrubution depending on the input
const generateRandomSet = (arrayLength, iterations, type) => {
  const numSet = [];
  numSet.length = arrayLength;
  numSet.fill(0);
  switch (type) {
    case "coin":
      for (i = 0; i < iterations; i++) {
        let a = Math.floor(1000 * Math.random());
        numSet[a] = numSet[a] + 1;
      }
      break;
    case "dice":
      for (i = 0; i < iterations; i++) {
        let a = Math.floor(1000 * Math.random());
        numSet[a] = numSet[a] + 1;
      }
      break;
    default:
      throw new Error("Must pick an experiment type");
  }
  let normal = numSet.reduce((a, b) => a + b, 0) / numSet.length / 600;
  console.log(normal);
  return numSet;
};

//Function plots the probability distribution
const plot1 = (numSet, normal) => {
  for (let i = 0; i < numSet.length; i++) {
    c.beginPath();
    c.moveTo(100 + i, 800);
    c.lineTo(100 + i, 800 - numSet[i] / normal);
    c.strokeStyle = "blue";
    c.stroke();
  }
};

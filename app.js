let canvas = document.querySelector("canvas");
let c = canvas.getContext("2d");
let occurancesEl = document.getElementById("occurances");
canvas.width = 1200;
canvas.height = 800;

const numSet = [];
numSet.length = 1000;
numSet.fill(0);

for (i = 0; i < 10000; i++) {
  let a = Math.floor(1000 * Math.random());
  numSet[a] = numSet[a] + 1;
}

let normal = numSet.reduce((a, b) => a + b, 0) / numSet.length / 600;
console.log(normal);

const plot1 = (numSet, normal) => {
  for (let i = 0; i < numSet.length; i++) {
    c.beginPath();
    c.moveTo(100 + i, 800);
    c.lineTo(100 + i, 800 - numSet[i] / normal);
    c.strokeStyle = "blue";
    c.stroke();
  }
};

plot1(numSet, normal);

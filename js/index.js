var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var W = c.getAttribute("width");
var H = c.getAttribute("height");
var Origin = [0.2 * W, 0.35 * H]; // pixels
var period = W; // pixels
var dx = 4; // pixels
var dt = 20; // miliseconds
var Amp = H / 50; // pixels
var phase = 0; // rad
var phaseInc = -0.01; // rad
// 1 cm = 37.8 cm

function wave() {
  var v1 = Number(document.getElementById("v1").value);
  var f1 = Number(document.getElementById("f1").value);
  var A1 = Number(document.getElementById("A1").value);
  var v2 = Number(document.getElementById("v2").value);
  var f2 = Number(document.getElementById("f2").value);
  var A2 = Number(document.getElementById("A2").value);

  ctx.fillStyle = "beige";
  ctx.fillRect(0, 0, W, H);

  // X axis
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.beginPath();
  ctx.moveTo(0, Origin[1]);
  ctx.lineTo(W, Origin[1]);
  ctx.stroke();
  // Y axis
  ctx.beginPath();
  ctx.moveTo(Origin[0], 0);
  ctx.lineTo(Origin[0], H);
  ctx.stroke();

  // draw sine curve
  for (var x = -Origin[0]; x < W - Origin[0]; x += dx) {
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    var w11 =
      ySinX(x, Amp * A1, 2 * Math.PI * f1 / period, v1 * phase) + 2 * Origin[1];
    var w12 =
      ySinX(x + dx, Amp * A1, 2 * Math.PI * f1 / period, v1 * phase) +
      2 * Origin[1];
    var w21 =
      ySinX(x, Amp * A2, 2 * Math.PI * f2 / period, v2 * phase) + 2 * Origin[1];
    var w22 =
      ySinX(x + dx, Amp * A2, 2 * Math.PI * f2 / period, v2 * phase) +
      2 * Origin[1];
    ctx.moveTo(x + Origin[0], w11);
    ctx.lineTo(x + dx + Origin[0], w12);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.moveTo(x + Origin[0], w21);
    ctx.lineTo(x + dx + Origin[0], w22);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.lineWidth = 2;
    ctx.moveTo(x + Origin[0], w11 + w21 - 3 * Origin[1]);
    ctx.lineTo(x + dx + Origin[0], w12 + w22 - 3 * Origin[1]);
    ctx.stroke();
  }

  //increase or decrease the phase
  phase += phaseInc;
}

function ySinX(x, A, w, phi) {
  return A * Math.sin(w * x + phi);
}

setInterval(wave, dt);
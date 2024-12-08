// Define the two option lists
const freshOptions = ["fresh", "rottar", "õnne-fresh", "doble-rottar", "värske", "soft", "grant-extreme", "super-soft", "uus keerutus"];
const monsterOptions = ["Mango Loco", "Classic", "White", "Pineapple", "Redla!", "Ultra Violet", "Punch", "Watermelon", "Juiced"];

// Declare the 'options' variable that will hold the current set of options
let options = freshOptions;  // Initially set to freshOptions

// Get references to the button and list elements
const toggleBtn = document.getElementById('toggleBtn');
const optionsList = document.getElementById('optionsList');

// Function to update the displayed options based on the current 'options' variable
function updateOptions() {
  // Clear the current list
  optionsList.innerHTML = '';

  // Populate the list with the current 'options' array
  options.forEach(option => {
    const li = document.createElement('li');
    li.textContent = option;
    optionsList.appendChild(li);
  });

  // Update the button text based on the current options
  toggleBtn.textContent = options === freshOptions ? 'Switch to Monster' : 'Switch to Fresh';

  // Update the roulette wheel whenever options change
  drawRouletteWheel();  // Call this to redraw the roulette wheel with updated options
}

// Add an event listener to the toggle button
toggleBtn.addEventListener('click', function() {
  // Toggle between the two options lists
  options = (options === freshOptions) ? monsterOptions : freshOptions;
  
  // Update the options display and redraw the wheel
  updateOptions();
});

// Initialize with the "Fresh" options
updateOptions();


/* R U L E T T E  */

var startAngle = 0;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 10;
var spinTime = 0;
var spinTimeTotal = 0;

var ctx;

document.getElementById("spin").addEventListener("click", spin);

function byte2Hex(n) {
  var nybHexString = "0123456789ABCDEF";
  return String(nybHexString.substr((n >> 4) & 0x0F,1)) + nybHexString.substr(n & 0x0F,1);
}

function RGB2Color(r,g,b) {
	return '#' + byte2Hex(r) + byte2Hex(g) + byte2Hex(b);
}

function getColor(item, maxitem) {
  var phase = 0;
  var center = 128;
  var width = 127;
  var frequency = Math.PI*2/maxitem;
  
  red   = Math.sin(frequency*item+2+phase) * width + center;
  green = Math.sin(frequency*item+0+phase) * width + center;
  blue  = Math.sin(frequency*item+4+phase) * width + center;
  
  return RGB2Color(red,green,blue);
}

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 280;
    var textRadius = 220;
    var insideRadius = 180;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,500,500);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;

    ctx.font = 'bold 25px Helvetica, Arial';

    arc = Math.PI / (options.length / 2); // Update arc based on the length of options

    for(var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;
      ctx.fillStyle = getColor(i, options.length);

      ctx.beginPath();
      ctx.arc(280, 280, outsideRadius, angle, angle + arc, false);
      ctx.arc(280, 280, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.shadowOffsetX = -1;
      ctx.shadowOffsetY = -1;
      ctx.shadowBlur    = 0;
      ctx.shadowColor   = "rgb(220,220,220)";
      ctx.fillStyle = "black";
      ctx.translate(280 + Math.cos(angle + arc / 2) * textRadius, 
      280 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    } 

    //Arrow
    ctx.fillStyle = "#df0a83";
    ctx.beginPath();
    ctx.moveTo(280 - 4, 280 - (outsideRadius + 5));
    ctx.lineTo(280 + 4, 280 - (outsideRadius + 5));
    ctx.lineTo(280 + 4, 280 - (outsideRadius - 5));
    ctx.lineTo(280 + 9, 280 - (outsideRadius - 5));
    ctx.lineTo(280 + 0, 280 - (outsideRadius - 13));
    ctx.lineTo(280 - 9, 280 - (outsideRadius - 5));
    ctx.lineTo(280 - 4, 280 - (outsideRadius - 5));
    ctx.lineTo(280 - 4, 280 - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3 + 4 * 1000;
  rotateWheel();
}

function rotateWheel() {
  spinTime += 30;
  if(spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.font = 'bold 30px Helvetica, Arial';
  var text = options[index];
  ctx.fillText(text, 280 - ctx.measureText(text).width / 2, 280 + 10);
  ctx.restore();
}

function easeOut(t, b, c, d) {
  var ts = (t/=d)*t;
  var tc = ts*t;
  return b+c*(tc + -3*ts + 3*t);
}

drawRouletteWheel();

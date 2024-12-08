$(document).on('mousemove', function(e) {
  var xPos = e.pageX;
  var yPos = e.pageY;
  console.log(xPos, yPos);
  $('.cursor-track').css({
    'top': yPos,
    'left': xPos
  });
  
});

var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

/* for (var i = 0; i < 5; i++) {
  var x = Math.random() * window.innerWidth;
  var y = Math.random() * window.innerHeight;
  var c = canvas.getContext("2d");
  c.fillRect(x, y, 100, 100);
}  */

function animate() {
  requestAnimationFrame(animate);

  c.beginPath();
  c.arc(200, 200, 30, 0, Math.PI * 2, false);
  c.strokeStyle = 'blue'
  c.stroke();
}

c.fillRect(200, 200, 100, 100);

console.log('canvas')

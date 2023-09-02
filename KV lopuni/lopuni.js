/* T I M E D   C O M M A N D S */

setTimeout(() => {
  document.querySelectorAll("#laadimine").forEach(element => {
    element.style.display = 'none';
  });
  document.querySelectorAll("#laetud").forEach(element => {
    element.style.display = 'block';
  });  
  changeElementText(".kvlopuni");
  changeElementText(".tehtud");
}, 3000);


/* S H U F F L E   E F F E C T */

const letters = "abcdefghijklmnopqrstuvwxyz"; /* ABCDEFGHIJKLMNOPQRSTUVWXYZ */            
let interval = null;
var shuffleArv = 6;

function changeElementText(elementSelector) {
  const element = document.querySelector(elementSelector);
  
  if (element) {
    let iteration = 0;
    clearInterval(element.interval);
    element.interval = setInterval(() => {
      element.innerText = element.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return element.dataset.value[index];
          }
          return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // Random uppercase letter
        })
        .join("");
      
      if (iteration >= element.dataset.value.length) {
        clearInterval(element.interval);
      }
      
      iteration += 1 / 3;
    }, shuffleArv); /* Originally 30 */
  }
  console.log(shuffleArv);

  shuffleArv = 3;
  console.log(shuffleArv);
}



/* C O U N T D O W N */

var countDownDate = new Date("jun 19, 2024 14:00:00").getTime();

var x = setInterval(function() {
  /* DAYS TO GO */
  var now = new Date().getTime();
  var distance = countDownDate - now;
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);


  document.getElementById("aega").innerHTML = days + "d " + hours + "h ";
    
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("aega").innerHTML = "EXPIRED";
  }

  /* D E B U G */
  /* console.log(`${days}d ${hours}h ${minutes}m ${seconds}s`); */

  /* TEENISTUSE PERCENTAGE */
  var AllTime = 29048400000;
  var done = Math.floor(AllTime - distance);
  var percentage = parseFloat((done * 100 / AllTime).toFixed(2));

  document.getElementById("protsente").innerHTML = percentage + "%";

  /* D E B U G */
/*   console.log("now" + now);
  console.log("AllTime " + AllTime);
  console.log("distance " + distance);
  console.log("done " + done);
  console.log("percentage " + percentage); */
}, 1000);

/* document.querySelector("p").onclick = event => {
  document.write();
  <img src="/explosion.gif" alt="explosion">;
} */


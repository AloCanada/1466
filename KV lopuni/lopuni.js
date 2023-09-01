setTimeout(() => {
    var elements = document.getElementsByClassName("kvlopuni");
    for (var i = 0; i < elements.length; i++) {
      elements[i].style.display = 'block';
    }
    
    console.log('5sek');
}, 5000);

/* SHUFFLE EFFECT */

const letters = "abcdefghijklmnopqrstuvwxyz"; /* ABCDEFGHIJKLMNOPQRSTUVWXYZ */
                   
let interval = null;

console.log(document.querySelector("h1"));

document.querySelector(".kvlopuni").onmouseover = event => {  
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
        event.target.innerText = event.target.innerText
      .split("")
      .map((letter, index) => {
          if(index < iteration) {
              return event.target.dataset.value[index];
            }
            
            return letters[Math.floor(Math.random() * 26)]
        })
      .join("");
      
      if(iteration >= event.target.dataset.value.length){ 
          clearInterval(interval);
        }
        
        iteration += 1 / 3;
    }, 9); /* originaalselt 30 */
}




/* document.querySelector("a").onclick = event => {
    document.write()
    <img src="/explosion.gif" alt="explosion" />
} */

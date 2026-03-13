
function mousefollower(){
    // var main = document.querySelector("#main");

window.addEventListener("mousemove",function (dets) {
    gsap.to("#cursor",{
        x:dets.x,
        y:dets.y
    })
});
}
mousefollower()

window.addEventListener('scroll', function () {
    var header = document.querySelector('header');
    var scrolldown = this.document.querySelector("#scrolldown")
    header.classList.toggle('sticky', window.scrollY > 0);
    scrolldown.classList.toggle('scrolldowncls',window.scrollY > 0);
});


function toggleMenu() {
    var menutoggle = document.querySelector('.toggle');
    var menu = document.querySelector('.menu');
    menutoggle.classList.toggle('active');
    menu.classList.toggle('active')
}



function mousefollower() {
    var main = document.querySelector("#main");

    main.addEventListener("mousemove", function (dets) {
        gsap.to("#cursor", {
            x: dets.x,
            y: dets.y
        })
    });
}
mousefollower()


var tl = gsap.timeline()

gsap.from("header a", {
    delay:1,
    scale:0,
    duration:0.5,
    stagger:0.25
})

gsap.from(".text-banner", {
    delay:1,
    scale: 0,
    duration: 1,
    yoyo: true
})

tl.from("#scrolldown", {
    y: -50,
    yoyo: true,
    repeat: -1,
    opacity: 0,
    duration: 1.6
});

gsap.from(".about",{
    scale:0,
    opacity:0,
    scrollTrigger:{
        trigger:".heading",
        scroller:"body",
        start:"top 200%",
        scrub:1,
    }
})

gsap.from(".services",{
    scale:0,
    opacity:0,
    scrollTrigger:{
        trigger:".services",
        scroller:"body",
        start:"top 200%",
        scrub:1,
    }
})

gsap.from(".work",{
    scale:0,
    scrub:2,
    scrollTrigger:".work"
})


// get the element
const text = document.querySelector('#passion');

// make a words array
const words = [
  "Graphic Designer.",
  "Video Editor.",
  "Web Designer.",
  "Full-Stack Developer."
];

// start typing effect
setTyper(text, words);

function setTyper(element, words) {

  const LETTER_TYPE_DELAY = 150;
  const WORD_STAY_DELAY = 100;

  const DIRECTION_FORWARDS = 0;
  const DIRECTION_BACKWARDS = 1;

  var direction = DIRECTION_FORWARDS;
  var wordIndex = 0;
  var letterIndex = 0;

  var wordTypeInterval;

  startTyping();

  function startTyping() {
    wordTypeInterval = setInterval(typeLetter, LETTER_TYPE_DELAY);
  }

  function typeLetter() {
    const word = words[wordIndex];

    if (direction == DIRECTION_FORWARDS) {
      letterIndex++;

      if (letterIndex == word.length) {
        direction = DIRECTION_BACKWARDS;
        clearInterval(wordTypeInterval);
        setTimeout(startTyping, WORD_STAY_DELAY);
      }

    } else if (direction == DIRECTION_BACKWARDS) {
      letterIndex--;

      if (letterIndex == 0) {
        nextWord();
      }
    }

    const textToType = word.substring(0, letterIndex);

    element.textContent = textToType;
  }

  function nextWord() {

    letterIndex = 0;
    direction = DIRECTION_FORWARDS;
    wordIndex++;

    if (wordIndex == words.length) {
      wordIndex = 0;
    }

  }
}

document.getElementById("SourceCode").addEventListener("click", function() {
    window.location.href = "https://github.com/Asynchronous-Javascriptor/Asynchronous-Javascriptor";
});

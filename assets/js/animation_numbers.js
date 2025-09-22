/**
The script animates numbers incrementing when the user scrolls 
down to the section containing elements with the class .numbers-increment.

Each number begins at 0 and increases step by step until it reaches its target in exactly 2 seconds (DURATION).
The update happens every 20 ms (DELAY), and the size of each step is calculated for different target.
 
Constants:

  DURATION - total duration of the animation in milliseconds.
  DELAY - delay between each increment step in milliseconds.
  STEPS - number of steps in the animation, calculated from DURATION and DELAY.
  inc - the increment value for each step, calculated as target / STEPS, so all numbers finish at the same time.
 */


document.addEventListener('DOMContentLoaded', () => {
  const DURATION = 2000
  const DELAY = 20
  const STEPS = Math.ceil(DURATION / DELAY);
  let started = false;

  function animateNumbers() {
    document.querySelectorAll('.numbers-increment').forEach((number) => {
      const target = parseInt(number.textContent, 10);
      let current = 0, counter = 0, inc = target / STEPS;

      const timer = setInterval(() => {
        counter++;
        current += inc;

        if (counter >= STEPS) {
          clearInterval(timer);
          number.textContent = String(target) + '+';
        } else {
          number.textContent = String(Math.floor(current));
        }
      }, DELAY);
    });
  }

  const section = document.querySelector('.numbers-increment');
  if (!section) return;

  document.addEventListener('scroll', function onScroll() {
    if (!started && window.scrollY + window.innerHeight >= section.offsetTop) {
      started = true;
      animateNumbers();
      document.removeEventListener('scroll', onScroll);
    }
  });
});

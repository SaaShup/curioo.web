/**
The script slides the "create your guide" step cards into view one after
another when the user scrolls down to the section containing the
.create-guide-steps row.
*/

document.addEventListener('DOMContentLoaded', () => {
  const VISIBLE_PART = 0.25;

  const steps = document.querySelector('.create-guide-steps');
  if (!steps || !('IntersectionObserver' in window)) return;

  steps.classList.add('anim-ready');

  function onIntersect(entries, observer) {
    const rowIsVisible = entries.some((entry) => entry.isIntersecting);
    if (!rowIsVisible) return;

    steps.classList.add('in-view');
    observer.disconnect();
  }

  new IntersectionObserver(onIntersect, { threshold: VISIBLE_PART }).observe(steps);
});

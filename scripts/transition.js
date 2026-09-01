// TRANSITION LAYER: drives the "veil" overlay (see .veil in index.html) through
// three phases — RISE (covers the screen), HOLD (fully covered, safe to swap
// content), FALL (uncovers) — timed in milliseconds.
const RISE = 900, HOLD = 400, FALL = 1000;

// ACCESSIBILITY: respects the OS-level reduced-motion preference, checked once at load.
export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ANIMATION SEQUENCER: runs the rise/hold/fall phases via nested setTimeout,
// calling `swap` (the actual DOM/state change) once the veil fully covers the
// screen, then reveals it again. Durations shrink drastically under reduced-motion.
// setWaveClass: callback that applies the CSS class driving the veil animation.
// swap: callback that performs the hidden state change (e.g. view switch).
export function runTransition(setWaveClass, swap) {
  return new Promise(resolve => {
    const rise = reducedMotion ? 220 : RISE, hold = reducedMotion ? 60 : HOLD, fall = reducedMotion ? 220 : FALL;
    setWaveClass('rising');
    setTimeout(() => {
      swap(); // content is fully hidden behind the veil at this point
      setTimeout(() => {
        setWaveClass('falling');
        setTimeout(() => { setWaveClass(''); resolve(); }, fall);
      }, hold);
    }, rise);
  });
}

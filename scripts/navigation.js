// NAVIGATION LAYER: orchestrates view switching, browser history, and the
// transition animation. Takes the Alpine `app` state object as first argument
// (plain functions instead of methods, so they stay testable/composable).
import { loadSection as fetchSectionHtml } from './data.js';
import { runTransition } from './transition.js';

// CORE LOADER: fetches a section's HTML and swaps the view, optionally animated.
// Shared by goToSection (animated) and syncFromHash (not animated, e.g. on reload).
export async function loadSectionInto(app, section, animate = true) {
  app.error = '';
  let html;
  try {
    html = await fetchSectionHtml(section);
  } catch (e) {
    // ERROR PATH: fetch failed, fall back to index view with an error message
    app.error = e.message;
    console.error('[portfolio] loadSection:', e);
    app.view = 'index';
    app.waveClass = '';
    return;
  }
  // STATE SWAP: applied either instantly or wrapped in the veil transition
  const apply = () => {
    app.current = section;
    app.currentHtml = html;
    app.view = 'section';
    window.scrollTo(0, 0);
  };
  if (!animate) { apply(); return; }
  await runTransition(cls => { app.waveClass = cls; }, apply);
}

// ACTION: user clicks a section link — push a history entry, then load it.
export function goToSection(app, section) {
  if (app.waveClass) return; // guard: ignore clicks while a transition is in flight
  history.pushState({ id: section.id }, '', '#' + section.id);
  loadSectionInto(app, section, true);
}

// ACTION: user clicks "back" — pop the hash, animate back to index view.
export function goBack(app) {
  if (app.waveClass) return; // guard: ignore clicks while a transition is in flight
  history.pushState({ id: null }, '', location.pathname + location.search);
  runTransition(cls => { app.waveClass = cls; }, () => {
    app.view = 'index';
    app.current = null;
    window.scrollTo(0, 0);
  });
}

// HISTORY SYNC: derives the view from the current URL hash — used on initial
// load (deep link) and on popstate (browser back/forward buttons).
export function syncFromHash(app) {
  const id = location.hash.replace('#', '');
  const section = app.sections.find(s => s.id === id);
  if (section) loadSectionInto(app, section, false);
  else { app.view = 'index'; app.current = null; app.waveClass = ''; window.scrollTo(0, 0); }
}

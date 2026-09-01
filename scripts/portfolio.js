// APP COMPONENT: Alpine.js factory consumed by `x-data="portfolio()"` in index.html.
// Acts as the single source of truth (STATE) for the UI, delegating data
// fetching to data.js and view/history orchestration to navigation.js.
import { loadManifest } from './data.js';
import { loadSectionInto, goToSection, goBack, syncFromHash } from './navigation.js';

export function portfolio() {
  return {
    // STATE
    view: 'index',                          // 'index' | 'section' — controls x-show in index.html
    meta: { name: '', role: '', contacts: [] }, // site-wide info from manifest.json
    sections: [],                           // ordered list of navigable sections
    current: null,                          // currently displayed section object
    currentHtml: '',                        // rendered Markdown for the current section
    waveClass: '',                          // '' | 'rising' | 'falling' — drives the transition veil
    error: '',                              // last fetch error message, shown in the UI

    // GETTER: 1-based, zero-padded position of the current section (e.g. "02")
    get currentIndex() {
      if (!this.current) return '';
      const i = this.sections.findIndex(s => s.id === this.current.id);
      return String(i + 1).padStart(2, '0');
    },

    // LIFECYCLE: runs once via x-init="init()" — loads the manifest, then
    // hooks up browser history so deep links and back/forward navigation work.
    async init() {
      try {
        const data = await loadManifest();
        this.meta = data.meta || this.meta;
        this.sections = (data.sections || []).slice().sort((a, b) => a.order - b.order);
      } catch (e) {
        this.error = e.message;
        console.error('[portfolio] init:', e);
        return;
      }
      window.addEventListener('popstate', () => syncFromHash(this));
      if (location.hash) syncFromHash(this);
    },

    // ACTIONS: thin wrappers exposing navigation.js functions as component
    // methods, so templates can call e.g. @click="go(s)" or "back()".
    loadSection(section, animate = true) {
      return loadSectionInto(this, section, animate);
    },

    go(section) {
      goToSection(this, section);
    },

    back() {
      goBack(this);
    },

    syncFromHash() {
      syncFromHash(this);
    }
  };
}

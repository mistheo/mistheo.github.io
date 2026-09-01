// ENTRY POINT: wires the Alpine.js factory function to the global scope
// so the inline `x-data="portfolio()"` attribute in index.html can resolve it.
import { portfolio } from './portfolio.js';

window.portfolio = portfolio;

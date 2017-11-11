let pub = null;

if(typeof window !== 'undefined') {
  pub = require('./browser.js').default;
}
else {
  pub = require('./non-browser.js').default;
}

export { pub as default };

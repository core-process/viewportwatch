// detect mobile
import MobileDetect from 'mobile-detect';
const isMobile = !!(new MobileDetect(window.navigator.userAgent)).mobile();

// calculate dimension
let calculateDimensions = null;

if(isMobile) {
  (() => {
    const widths = new Map(),
          heights = new Map();

    function addWidth(ow, iw) {
      if(!widths.has(ow)) {
        widths.set(ow, new Set([ iw ]));
      }
      else {
        widths.get(ow).add(iw);
      }
    }

    function addHeight(oh, ih) {
      if(!heights.has(oh)) {
        heights.set(oh, new Set([ ih ]));
      }
      else {
        heights.get(oh).add(ih);
      }
    }

    calculateDimensions = () => {
      const iw = window.innerWidth,
            ow = window.outerWidth,
            ih = window.innerHeight,
            oh = window.outerHeight;
      addWidth(ow, iw);
      addHeight(oh, ih);
      const ws = Array.from(widths.get(ow).values()),
            hs = Array.from(heights.get(oh).values());
      return Object.freeze({
        current: Object.freeze({
          width: iw,
          height: ih,
        }),
        maximum: Object.freeze({
          width: Math.max(...ws),
          height: Math.max(...hs),
        }),
        minimum: Object.freeze({
          width: Math.min(...ws),
          height: Math.min(...hs),
        }),
      });
    };
  })();
}
else {
  calculateDimensions = () => {
    const iw = window.innerWidth,
          ih = window.innerHeight;
    return Object.freeze({
      current: Object.freeze({
        width: iw,
        height: ih,
      }),
      maximum: Object.freeze({
        width: iw,
        height: ih,
      }),
      minimum: Object.freeze({
        width: iw,
        height: ih,
      }),
    });
  };
}

// handle resize event
import deepEqual from 'deep-equal';

let _dimensions = calculateDimensions();
const _emitter = require('event-emitter')({});

function onPotentialResize() {
  // get new dimensions and check for changes
  const newDimensions = calculateDimensions();
  if(deepEqual(newDimensions, dimensions)) {
    return;
  }

  // store new dimensions and dispatch event
  _dimensions = newDimensions;
  _emitter.emit('resize', _dimensions);
}

// setup event handler
if(isMobile) {
  window.addEventListener('scroll', onPotentialResize);
}
window.addEventListener('resize', onPotentialResize);
window.addEventListener('orientationchange', onPotentialResize);
window.addEventListener('DOMContentLoaded', onPotentialResize);
window.addEventListener('load', onPotentialResize);

// public interface
const pub = {
  dimensions() {
    return _dimensions;
  },
  on(...args) {
    return _emitter.on(...args);
  },
  off(...args) {
    return _emitter.on(...args);
  },
  once(...args) {
    return _emitter.on(...args);
  }
};

export { pub as default };

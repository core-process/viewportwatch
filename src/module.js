// global viewportwatch object
window.viewportwatch = {
  dimensions: null,
};

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

// current detected dimensions
let dimensions
  = window.viewportwatch.dimensions
  = calculateDimensions();

// setup event handler
window.addEventListener('scroll', onPotentialResize);
window.addEventListener('resize', onPotentialResize);
window.addEventListener('orientationchange', onPotentialResize);

// handle potential resize event
import deepEqual from 'deep-equal';

function onPotentialResize() {
  // get new dimensions and check for changes
  const newDimensions = calculateDimensions();
  if(deepEqual(newDimensions, dimensions)) {
    return;
  }

  dimensions
    = window.viewportwatch.dimensions
    = newDimensions;

  // dispatch event
  const event = document.createEvent('CustomEvent');
  event.initCustomEvent('viewportwatch:resize', true, true, dimensions);
  window.dispatchEvent(event);
}

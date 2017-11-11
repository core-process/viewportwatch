// various stubs
const calculateDimensions = () => {
  return Object.freeze({
    current: Object.freeze({
      width: null,
      height: null,
    }),
    maximum: Object.freeze({
      width: null,
      height: null,
    }),
    minimum: Object.freeze({
      width: null,
      height: null,
    }),
  });
};

const _dimensions = calculateDimensions();
const _emitter = require('event-emitter')({});

// public interface
const pub = {
  dimensions() {
    return _dimensions;
  },
  on(...args) {
    return _emitter.on(...args);
  },
  off(...args) {
    return _emitter.off(...args);
  },
  once(...args) {
    return _emitter.once(...args);
  }
};

export { pub as default };

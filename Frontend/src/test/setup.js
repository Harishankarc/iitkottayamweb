import '@testing-library/jest-dom/vitest';

// Provide a simple localStorage polyfill for test environments where it is unavailable.
const storage = {
  _data: {},
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this._data, key) ? this._data[key] : null;
  },
  setItem(key, value) {
    this._data[key] = String(value);
  },
  removeItem(key) {
    delete this._data[key];
  },
  clear() {
    this._data = {};
  }
};

if (!globalThis.localStorage || typeof globalThis.localStorage.getItem !== 'function') {
  Object.defineProperty(globalThis, 'localStorage', {
    value: storage,
    configurable: true
  });
}

if (!globalThis.window) {
  globalThis.window = {};
}

if (!globalThis.window.localStorage || typeof globalThis.window.localStorage.getItem !== 'function') {
  Object.defineProperty(globalThis.window, 'localStorage', {
    value: storage,
    configurable: true
  });
}

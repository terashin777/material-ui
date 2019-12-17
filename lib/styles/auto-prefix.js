'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inlineStylePrefixer = require('inline-style-prefixer');

var _inlineStylePrefixer2 = _interopRequireDefault(_inlineStylePrefixer);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var prefixers = {};

var hasWarnedAboutUserAgent = false;

exports.default = {
  getTransform: function getTransform(userAgent) {
    if (userAgent === undefined && typeof navigator !== 'undefined') {
      userAgent = navigator.userAgent;
    }

    if (userAgent === undefined && !hasWarnedAboutUserAgent) {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Material-UI: userAgent should be supplied in the muiTheme context\n        for server-side rendering.') : void 0;

      hasWarnedAboutUserAgent = true;
    }

    if (userAgent === false) {
      // Disabled autoprefixer
      return function (style) {
        return style;
      };
    } else if (userAgent === 'all' || userAgent === undefined) {
      // Prefix for all user agent
      return _inlineStylePrefixer2.default.prefixAll;
    } else {
      var prefixer = new _inlineStylePrefixer2.default({
        userAgent: userAgent
      });

      return function (style) {
        return prefixer.prefix(style);
      };
    }
  },
  getPrefixer: function getPrefixer() {
    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Material-UI: getPrefixer() is no longer used. Do not use it.') : void 0;

    if (typeof navigator === 'undefined') {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Material-UI expects the global navigator.userAgent to be defined\n        for server-side rendering. Set this property when receiving the request headers.') : void 0;

      return null;
    }

    var userAgent = navigator.userAgent;

    // Get prefixing instance for this user agent
    var prefixer = prefixers[userAgent];
    // None found, create a new instance
    if (!prefixer) {
      prefixer = new _inlineStylePrefixer2.default({ userAgent: userAgent });
      prefixers[userAgent] = prefixer;
    }

    return prefixer;
  },
  all: function all(style) {
    if (!style) {
      return {};
    }

    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Material-UI: all() is no longer used, it will be removed. Do not use it') : void 0;

    var prefixer = this.getPrefixer();

    if (prefixer) {
      return prefixer.prefix(style);
    } else {
      return _inlineStylePrefixer2.default.prefixAll(style);
    }
  },
  set: function set(style, key, value, muiTheme) {
    style[key] = value;

    if (muiTheme) {
      style = muiTheme.prefix(style);
    } else {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Material-UI: you need to provide the muiTheme to the autoPrefix.set()') : void 0;

      var prefixer = this.getPrefixer();

      if (prefixer) {
        style = prefixer.prefix(style);
      } else {
        style = _inlineStylePrefixer2.default.prefixAll(style);
      }
    }
  },
  getPrefix: function getPrefix(key) {
    process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Material-UI: getPrefix() is no longer used, it will be removed. Do not use it') : void 0;

    var style = {};
    style[key] = true;

    var prefixer = this.getPrefixer();
    var prefixes = void 0;

    if (prefixer) {
      prefixes = Object.keys(prefixer.prefix(style));
    } else {
      prefixes = Object.keys(_inlineStylePrefixer2.default.prefixAll(style));
    }

    return prefixes ? prefixes[0] : key;
  }
};
module.exports = exports['default'];
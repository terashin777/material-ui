'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsPureRenderMixin = require('react-addons-pure-render-mixin');

var _reactAddonsPureRenderMixin2 = _interopRequireDefault(_reactAddonsPureRenderMixin);

var _stylePropable = require('./mixins/style-propable');

var _stylePropable2 = _interopRequireDefault(_stylePropable);

var _colors = require('./styles/colors');

var _colors2 = _interopRequireDefault(_colors);

var _children = require('./utils/children');

var _children2 = _interopRequireDefault(_children);

var _events = require('./utils/events');

var _events2 = _interopRequireDefault(_events);

var _keyCode = require('./utils/key-code');

var _keyCode2 = _interopRequireDefault(_keyCode);

var _focusRipple = require('./ripples/focus-ripple');

var _focusRipple2 = _interopRequireDefault(_focusRipple);

var _touchRipple = require('./ripples/touch-ripple');

var _touchRipple2 = _interopRequireDefault(_touchRipple);

var _lightRawTheme = require('./styles/raw-themes/light-raw-theme');

var _lightRawTheme2 = _interopRequireDefault(_lightRawTheme);

var _themeManager = require('./styles/theme-manager');

var _themeManager2 = _interopRequireDefault(_themeManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styleInjected = false;
var listening = false;
var tabPressed = false;

function injectStyle() {
  if (!styleInjected) {
    // Remove inner padding and border in Firefox 4+.
    var style = document.createElement('style');
    style.innerHTML = '\n      button::-moz-focus-inner,\n      input::-moz-focus-inner {\n        border: 0;\n        padding: 0;\n      }\n    ';

    document.body.appendChild(style);
    styleInjected = true;
  }
}

function listenForTabPresses() {
  if (!listening) {
    _events2.default.on(window, 'keydown', function (e) {
      tabPressed = e.keyCode === _keyCode2.default.TAB;
    });
    listening = true;
  }
}

var EnhancedButton = _react2.default.createClass({
  displayName: 'EnhancedButton',


  propTypes: {
    centerRipple: _react2.default.PropTypes.bool,
    children: _react2.default.PropTypes.node,
    containerElement: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.element]),
    disableFocusRipple: _react2.default.PropTypes.bool,
    disableKeyboardFocus: _react2.default.PropTypes.bool,
    disableTouchRipple: _react2.default.PropTypes.bool,
    disabled: _react2.default.PropTypes.bool,
    focusRippleColor: _react2.default.PropTypes.string,
    focusRippleOpacity: _react2.default.PropTypes.number,
    keyboardFocused: _react2.default.PropTypes.bool,
    linkButton: _react2.default.PropTypes.bool,
    onBlur: _react2.default.PropTypes.func,
    onFocus: _react2.default.PropTypes.func,
    onKeyDown: _react2.default.PropTypes.func,
    onKeyUp: _react2.default.PropTypes.func,
    onKeyboardFocus: _react2.default.PropTypes.func,
    onTouchTap: _react2.default.PropTypes.func,

    /**
     * Override the inline-styles of the root element.
     */
    style: _react2.default.PropTypes.object,
    tabIndex: _react2.default.PropTypes.number,
    touchRippleColor: _react2.default.PropTypes.string,
    touchRippleOpacity: _react2.default.PropTypes.number,
    type: _react2.default.PropTypes.string
  },

  contextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: _react2.default.PropTypes.object
  },

  mixins: [_reactAddonsPureRenderMixin2.default, _stylePropable2.default],

  getDefaultProps: function getDefaultProps() {
    return {
      containerElement: 'button',
      onBlur: function onBlur() {},
      onFocus: function onFocus() {},
      onKeyboardFocus: function onKeyboardFocus() {},
      onKeyDown: function onKeyDown() {},
      onKeyUp: function onKeyUp() {},
      onTouchTap: function onTouchTap() {},
      tabIndex: 0,
      type: 'button'
    };
  },
  getInitialState: function getInitialState() {
    return {
      isKeyboardFocused: !this.props.disabled && this.props.keyboardFocused && !this.props.disableKeyboardFocus,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : _themeManager2.default.getMuiTheme(_lightRawTheme2.default)
    };
  },
  getChildContext: function getChildContext() {
    return {
      muiTheme: this.state.muiTheme
    };
  },
  componentDidMount: function componentDidMount() {
    injectStyle();
    listenForTabPresses();
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    var newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({ muiTheme: newMuiTheme });

    if ((nextProps.disabled || nextProps.disableKeyboardFocus) && this.state.isKeyboardFocused) {
      this.setState({ isKeyboardFocused: false });
      if (nextProps.onKeyboardFocus) {
        nextProps.onKeyboardFocus(null, false);
      }
    }
  },
  isKeyboardFocused: function isKeyboardFocused() {
    return this.state.isKeyboardFocused;
  },
  removeKeyboardFocus: function removeKeyboardFocus(e) {
    if (this.state.isKeyboardFocused) {
      this.setState({ isKeyboardFocused: false });
      this.props.onKeyboardFocus(e, false);
    }
  },
  setKeyboardFocus: function setKeyboardFocus(e) {
    if (!this.state.isKeyboardFocused) {
      this.setState({ isKeyboardFocused: true });
      this.props.onKeyboardFocus(e, true);
    }
  },
  _cancelFocusTimeout: function _cancelFocusTimeout() {
    if (this._focusTimeout) {
      clearTimeout(this._focusTimeout);
      this._focusTimeout = null;
    }
  },
  _createButtonChildren: function _createButtonChildren() {
    var _props = this.props,
        centerRipple = _props.centerRipple,
        children = _props.children,
        disabled = _props.disabled,
        disableFocusRipple = _props.disableFocusRipple,
        disableKeyboardFocus = _props.disableKeyboardFocus,
        disableTouchRipple = _props.disableTouchRipple,
        focusRippleColor = _props.focusRippleColor,
        focusRippleOpacity = _props.focusRippleOpacity,
        touchRippleColor = _props.touchRippleColor,
        touchRippleOpacity = _props.touchRippleOpacity;
    var isKeyboardFocused = this.state.isKeyboardFocused;

    //Focus Ripple

    var focusRipple = isKeyboardFocused && !disabled && !disableFocusRipple && !disableKeyboardFocus ? _react2.default.createElement(_focusRipple2.default, {
      color: focusRippleColor,
      opacity: focusRippleOpacity,
      show: isKeyboardFocused
    }) : undefined;

    //Touch Ripple
    var touchRipple = !disabled && !disableTouchRipple ? _react2.default.createElement(
      _touchRipple2.default,
      {
        centerRipple: centerRipple,
        color: touchRippleColor,
        opacity: touchRippleOpacity },
      children
    ) : undefined;

    return _children2.default.create({
      focusRipple: focusRipple,
      touchRipple: touchRipple,
      children: touchRipple ? undefined : children
    });
  },
  _handleKeyDown: function _handleKeyDown(e) {
    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      if (e.keyCode === _keyCode2.default.ENTER && this.state.isKeyboardFocused) {
        this._handleTouchTap(e);
      }
    }
    this.props.onKeyDown(e);
  },
  _handleKeyUp: function _handleKeyUp(e) {
    if (!this.props.disabled && e.keyCode === _keyCode2.default.SPACE && this.state.isKeyboardFocused) {
      this._handleTouchTap(e);
    }
    this.props.onKeyUp(e);
  },
  _handleBlur: function _handleBlur(e) {
    this._cancelFocusTimeout();
    this.removeKeyboardFocus(e);
    this.props.onBlur(e);
  },
  _handleFocus: function _handleFocus(e) {
    var _this = this;

    if (!this.props.disabled && !this.props.disableKeyboardFocus) {
      //setTimeout is needed because the focus event fires first
      //Wait so that we can capture if this was a keyboard focus
      //or touch focus
      this._focusTimeout = setTimeout(function () {
        if (tabPressed) {
          _this.setKeyboardFocus(e);
        }
      }, 150);

      this.props.onFocus(e);
    }
  },
  _handleTouchTap: function _handleTouchTap(e) {
    this._cancelFocusTimeout();
    if (!this.props.disabled) {
      tabPressed = false;
      this.removeKeyboardFocus(e);
      this.props.onTouchTap(e);
    }
  },
  render: function render() {
    var _props2 = this.props,
        centerRipple = _props2.centerRipple,
        children = _props2.children,
        containerElement = _props2.containerElement,
        disabled = _props2.disabled,
        disableFocusRipple = _props2.disableFocusRipple,
        disableKeyboardFocus = _props2.disableKeyboardFocus,
        disableTouchRipple = _props2.disableTouchRipple,
        focusRippleColor = _props2.focusRippleColor,
        focusRippleOpacity = _props2.focusRippleOpacity,
        linkButton = _props2.linkButton,
        touchRippleColor = _props2.touchRippleColor,
        touchRippleOpacity = _props2.touchRippleOpacity,
        onBlur = _props2.onBlur,
        onFocus = _props2.onFocus,
        onKeyUp = _props2.onKeyUp,
        onKeyDown = _props2.onKeyDown,
        onTouchTap = _props2.onTouchTap,
        style = _props2.style,
        tabIndex = _props2.tabIndex,
        type = _props2.type,
        other = _objectWithoutProperties(_props2, ['centerRipple', 'children', 'containerElement', 'disabled', 'disableFocusRipple', 'disableKeyboardFocus', 'disableTouchRipple', 'focusRippleColor', 'focusRippleOpacity', 'linkButton', 'touchRippleColor', 'touchRippleOpacity', 'onBlur', 'onFocus', 'onKeyUp', 'onKeyDown', 'onTouchTap', 'style', 'tabIndex', 'type']);

    var mergedStyles = this.prepareStyles({
      border: 10,
      background: 'none',
      boxSizing: 'border-box',
      display: 'inline-block',
      font: 'inherit',
      fontFamily: this.state.muiTheme.rawTheme.fontFamily,
      tapHighlightColor: _colors2.default.transparent,
      appearance: linkButton ? null : 'button',
      cursor: disabled ? 'default' : 'pointer',
      textDecoration: 'none',
      outline: 'none'
    }, style);

    if (disabled && linkButton) {
      return _react2.default.createElement(
        'span',
        _extends({}, other, {
          style: mergedStyles }),
        children
      );
    }

    var buttonProps = _extends({}, other, {
      style: mergedStyles,
      disabled: disabled,
      onBlur: this._handleBlur,
      onFocus: this._handleFocus,
      onTouchTap: this._handleTouchTap,
      onKeyUp: this._handleKeyUp,
      onKeyDown: this._handleKeyDown,
      tabIndex: tabIndex,
      type: type
    });
    var buttonChildren = this._createButtonChildren();

    // Provides backward compatibity. Added to support wrapping around <a> element.
    var targetLinkElement = buttonProps.hasOwnProperty('href') ? 'a' : 'span';

    return _react2.default.isValidElement(containerElement) ? _react2.default.cloneElement(containerElement, buttonProps, buttonChildren) : _react2.default.createElement(linkButton ? targetLinkElement : containerElement, buttonProps, buttonChildren);
  }
});

exports.default = EnhancedButton;
module.exports = exports['default'];
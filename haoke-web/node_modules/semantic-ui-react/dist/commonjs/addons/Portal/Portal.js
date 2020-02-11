"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _invoke2 = _interopRequireDefault(require("lodash/invoke"));

var _keyboardKey = _interopRequireDefault(require("keyboard-key"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _lib = require("../../lib");

var _Ref = _interopRequireDefault(require("../Ref"));

/**
 * A component that allows you to render children outside their parent.
 * @see Modal
 * @see Popup
 * @see Dimmer
 * @see Confirm
 */
var Portal =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Portal, _Component);

  function Portal() {
    var _getPrototypeOf2;

    var _temp, _this;

    (0, _classCallCheck2.default)(this, Portal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _possibleConstructorReturn2.default)(_this, (_temp = _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Portal)).call.apply(_getPrototypeOf2, [this].concat(args))), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleDocumentClick", function (e) {
      var _this$props = _this.props,
          closeOnDocumentClick = _this$props.closeOnDocumentClick,
          closeOnRootNodeClick = _this$props.closeOnRootNodeClick;

      if (!_this.rootNode || // not mounted
      !_this.portalNode || // no portal
      (0, _lib.doesNodeContainClick)(_this.triggerNode, e) || // event happened in trigger (delegate to trigger handlers)
      (0, _lib.doesNodeContainClick)(_this.portalNode, e) // event happened in the portal
      ) {
          return;
        } // ignore the click


      var didClickInRootNode = (0, _lib.doesNodeContainClick)(_this.rootNode, e);

      if (closeOnDocumentClick && !didClickInRootNode || closeOnRootNodeClick && didClickInRootNode) {
        _this.close(e);
      }
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleEscape", function (e) {
      if (!_this.props.closeOnEscape) return;
      if (_keyboardKey.default.getCode(e) !== _keyboardKey.default.Escape) return;

      _this.close(e);
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handlePortalMouseLeave", function (e) {
      var _this$props2 = _this.props,
          closeOnPortalMouseLeave = _this$props2.closeOnPortalMouseLeave,
          mouseLeaveDelay = _this$props2.mouseLeaveDelay;
      if (!closeOnPortalMouseLeave) return;
      _this.mouseLeaveTimer = _this.closeWithTimeout(e, mouseLeaveDelay);
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handlePortalMouseEnter", function () {
      // In order to enable mousing from the trigger to the portal, we need to
      // clear the mouseleave timer that was set when leaving the trigger.
      var closeOnPortalMouseLeave = _this.props.closeOnPortalMouseLeave;
      if (!closeOnPortalMouseLeave) return;
      clearTimeout(_this.mouseLeaveTimer);
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTriggerBlur", function (e) {
      var _this$props3 = _this.props,
          trigger = _this$props3.trigger,
          closeOnTriggerBlur = _this$props3.closeOnTriggerBlur; // Call original event handler

      for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
      }

      _invoke2.default.apply(void 0, [trigger, 'props.onBlur', e].concat(rest)); // do not close if focus is given to the portal


      var didFocusPortal = (0, _invoke2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), 'rootNode.contains', e.relatedTarget);
      if (!closeOnTriggerBlur || didFocusPortal) return;

      _this.close(e);
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTriggerClick", function (e) {
      var _this$props4 = _this.props,
          trigger = _this$props4.trigger,
          closeOnTriggerClick = _this$props4.closeOnTriggerClick,
          openOnTriggerClick = _this$props4.openOnTriggerClick;
      var open = _this.state.open; // Call original event handler

      for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        rest[_key3 - 1] = arguments[_key3];
      }

      _invoke2.default.apply(void 0, [trigger, 'props.onClick', e].concat(rest));

      if (open && closeOnTriggerClick) {
        _this.close(e);
      } else if (!open && openOnTriggerClick) {
        _this.open(e);
      }
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTriggerFocus", function (e) {
      var _this$props5 = _this.props,
          trigger = _this$props5.trigger,
          openOnTriggerFocus = _this$props5.openOnTriggerFocus; // Call original event handler

      for (var _len4 = arguments.length, rest = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
        rest[_key4 - 1] = arguments[_key4];
      }

      _invoke2.default.apply(void 0, [trigger, 'props.onFocus', e].concat(rest));

      if (!openOnTriggerFocus) return;

      _this.open(e);
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTriggerMouseLeave", function (e) {
      clearTimeout(_this.mouseEnterTimer);
      var _this$props6 = _this.props,
          trigger = _this$props6.trigger,
          closeOnTriggerMouseLeave = _this$props6.closeOnTriggerMouseLeave,
          mouseLeaveDelay = _this$props6.mouseLeaveDelay; // Call original event handler

      for (var _len5 = arguments.length, rest = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
        rest[_key5 - 1] = arguments[_key5];
      }

      _invoke2.default.apply(void 0, [trigger, 'props.onMouseLeave', e].concat(rest));

      if (!closeOnTriggerMouseLeave) return;
      _this.mouseLeaveTimer = _this.closeWithTimeout(e, mouseLeaveDelay);
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleTriggerMouseEnter", function (e) {
      clearTimeout(_this.mouseLeaveTimer);
      var _this$props7 = _this.props,
          trigger = _this$props7.trigger,
          mouseEnterDelay = _this$props7.mouseEnterDelay,
          openOnTriggerMouseEnter = _this$props7.openOnTriggerMouseEnter; // Call original event handler

      for (var _len6 = arguments.length, rest = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
        rest[_key6 - 1] = arguments[_key6];
      }

      _invoke2.default.apply(void 0, [trigger, 'props.onMouseEnter', e].concat(rest));

      if (!openOnTriggerMouseEnter) return;
      _this.mouseEnterTimer = _this.openWithTimeout(e, mouseEnterDelay);
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "open", function (e) {
      var onOpen = _this.props.onOpen;
      if (onOpen) onOpen(e, _this.props);

      _this.trySetState({
        open: true
      });
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "openWithTimeout", function (e, delay) {
      // React wipes the entire event object and suggests using e.persist() if
      // you need the event for async access. However, even with e.persist
      // certain required props (e.g. currentTarget) are null so we're forced to clone.
      var eventClone = (0, _objectSpread2.default)({}, e);
      return setTimeout(function () {
        return _this.open(eventClone);
      }, delay || 0);
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "close", function (e) {
      var onClose = _this.props.onClose;
      if (onClose) onClose(e, _this.props);

      _this.trySetState({
        open: false
      });
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "closeWithTimeout", function (e, delay) {
      // React wipes the entire event object and suggests using e.persist() if
      // you need the event for async access. However, even with e.persist
      // certain required props (e.g. currentTarget) are null so we're forced to clone.
      var eventClone = (0, _objectSpread2.default)({}, e);
      return setTimeout(function () {
        return _this.close(eventClone);
      }, delay || 0);
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "attachRenderSubTreeSubscribers", function (eventPool) {
      // Prevent race condition bug
      // https://github.com/Semantic-Org/Semantic-UI-React/issues/2401
      if (!_this.rootNode) return null;
      _this.portalNode = _this.rootNode.firstElementChild;

      _lib.eventStack.sub('mouseleave', _this.handlePortalMouseLeave, {
        pool: eventPool,
        target: _this.portalNode
      });

      _lib.eventStack.sub('mouseenter', _this.handlePortalMouseEnter, {
        pool: eventPool,
        target: _this.portalNode
      });
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "mountPortal", function () {
      if (!(0, _lib.isBrowser)() || _this.rootNode) return;
      var _this$props8 = _this.props,
          eventPool = _this$props8.eventPool,
          _this$props8$mountNod = _this$props8.mountNode,
          mountNode = _this$props8$mountNod === void 0 ? (0, _lib.isBrowser)() ? document.body : null : _this$props8$mountNod,
          prepend = _this$props8.prepend;
      _this.rootNode = document.createElement('div');

      if (prepend) {
        mountNode.insertBefore(_this.rootNode, mountNode.firstElementChild);
      } else {
        mountNode.appendChild(_this.rootNode);
      }

      _lib.eventStack.sub('click', _this.handleDocumentClick, {
        pool: eventPool
      });

      _lib.eventStack.sub('keydown', _this.handleEscape, {
        pool: eventPool
      });

      (0, _invoke2.default)(_this.props, 'onMount', null, _this.props);
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "unmountPortal", function () {
      if (!(0, _lib.isBrowser)() || !_this.rootNode) return;
      var eventPool = _this.props.eventPool;

      _reactDom.default.unmountComponentAtNode(_this.rootNode);

      _this.rootNode.parentNode.removeChild(_this.rootNode);

      _lib.eventStack.unsub('mouseleave', _this.handlePortalMouseLeave, {
        pool: eventPool,
        target: _this.portalNode
      });

      _lib.eventStack.unsub('mouseenter', _this.handlePortalMouseEnter, {
        pool: eventPool,
        target: _this.portalNode
      });

      _this.rootNode = null;
      _this.portalNode = null;

      _lib.eventStack.unsub('click', _this.handleDocumentClick, {
        pool: eventPool
      });

      _lib.eventStack.unsub('keydown', _this.handleEscape, {
        pool: eventPool
      });

      (0, _invoke2.default)(_this.props, 'onUnmount', null, _this.props);
    }), (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "handleRef", function (c) {
      return _this.triggerNode = c;
    }), _temp));
  }

  (0, _createClass2.default)(Portal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.renderPortal();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // NOTE: Ideally the portal rendering would happen in the render() function
      // but React gives a warning about not being pure and suggests doing it
      // within this method.
      // If the portal is open, render (or re-render) the portal and child.
      this.renderPortal();

      if (prevState.open && !this.state.open) {
        this.unmountPortal();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unmountPortal(); // Clean up timers

      clearTimeout(this.mouseEnterTimer);
      clearTimeout(this.mouseLeaveTimer);
    } // ----------------------------------------
    // Document Event Handlers
    // ----------------------------------------

  }, {
    key: "renderPortal",
    value: function renderPortal() {
      var _this2 = this;

      if (!this.state.open) return;
      var _this$props9 = this.props,
          children = _this$props9.children,
          className = _this$props9.className,
          eventPool = _this$props9.eventPool;
      this.mountPortal(); // Server side rendering

      if (!(0, _lib.isBrowser)()) return null;
      this.rootNode.className = className || ''; // when re-rendering, first remove listeners before re-adding them to the new node

      if (this.portalNode) {
        _lib.eventStack.unsub('mouseleave', this.handlePortalMouseLeave, {
          pool: eventPool,
          target: this.portalNode
        });

        _lib.eventStack.unsub('mouseenter', this.handlePortalMouseEnter, {
          pool: eventPool,
          target: this.portalNode
        });
      }

      _reactDom.default.unstable_renderSubtreeIntoContainer(this, _react.Children.only(children), this.rootNode, function () {
        return _this2.attachRenderSubTreeSubscribers(eventPool);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var trigger = this.props.trigger;
      if (!trigger) return null;
      return _react.default.createElement(_Ref.default, {
        innerRef: this.handleRef
      }, (0, _react.cloneElement)(trigger, {
        onBlur: this.handleTriggerBlur,
        onClick: this.handleTriggerClick,
        onFocus: this.handleTriggerFocus,
        onMouseLeave: this.handleTriggerMouseLeave,
        onMouseEnter: this.handleTriggerMouseEnter
      }));
    }
  }]);
  return Portal;
}(_lib.AutoControlledComponent);

(0, _defineProperty2.default)(Portal, "defaultProps", {
  closeOnDocumentClick: true,
  closeOnEscape: true,
  eventPool: 'default',
  openOnTriggerClick: true
});
(0, _defineProperty2.default)(Portal, "autoControlledProps", ['open']);
(0, _defineProperty2.default)(Portal, "handledProps", ["children", "className", "closeOnDocumentClick", "closeOnEscape", "closeOnPortalMouseLeave", "closeOnRootNodeClick", "closeOnTriggerBlur", "closeOnTriggerClick", "closeOnTriggerMouseLeave", "defaultOpen", "eventPool", "mountNode", "mouseEnterDelay", "mouseLeaveDelay", "onClose", "onMount", "onOpen", "onUnmount", "open", "openOnTriggerClick", "openOnTriggerFocus", "openOnTriggerMouseEnter", "prepend", "trigger"]);
Portal.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Primary content. */
  children: _propTypes.default.node.isRequired,

  /** Additional classes. */
  className: _propTypes.default.string,

  /** Controls whether or not the portal should close when the document is clicked. */
  closeOnDocumentClick: _propTypes.default.bool,

  /** Controls whether or not the portal should close when escape is pressed is displayed. */
  closeOnEscape: _propTypes.default.bool,

  /**
   * Controls whether or not the portal should close when mousing out of the portal.
   * NOTE: This will prevent `closeOnTriggerMouseLeave` when mousing over the
   * gap from the trigger to the portal.
   */
  closeOnPortalMouseLeave: _propTypes.default.bool,

  /**
   * Controls whether or not the portal should close on a click on the portal background.
   * NOTE: This differs from closeOnDocumentClick:
   * - DocumentClick - any click not within the portal
   * - RootNodeClick - a click not within the portal but within the portal's wrapper
   */
  closeOnRootNodeClick: _propTypes.default.bool,

  /** Controls whether or not the portal should close on blur of the trigger. */
  closeOnTriggerBlur: _propTypes.default.bool,

  /** Controls whether or not the portal should close on click of the trigger. */
  closeOnTriggerClick: _propTypes.default.bool,

  /** Controls whether or not the portal should close when mousing out of the trigger. */
  closeOnTriggerMouseLeave: _propTypes.default.bool,

  /** Initial value of open. */
  defaultOpen: _propTypes.default.bool,

  /** Event pool namespace that is used to handle component events */
  eventPool: _propTypes.default.string,

  /** The node where the portal should mount. */
  mountNode: _propTypes.default.any,

  /** Milliseconds to wait before opening on mouse over */
  mouseEnterDelay: _propTypes.default.number,

  /** Milliseconds to wait before closing on mouse leave */
  mouseLeaveDelay: _propTypes.default.number,

  /**
   * Called when a close event happens
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onClose: _propTypes.default.func,

  /**
   * Called when the portal is mounted on the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onMount: _propTypes.default.func,

  /**
   * Called when an open event happens
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onOpen: _propTypes.default.func,

  /**
   * Called when the portal is unmounted from the DOM
   *
   * @param {null}
   * @param {object} data - All props.
   */
  onUnmount: _propTypes.default.func,

  /** Controls whether or not the portal is displayed. */
  open: _propTypes.default.bool,

  /** Controls whether or not the portal should open when the trigger is clicked. */
  openOnTriggerClick: _propTypes.default.bool,

  /** Controls whether or not the portal should open on focus of the trigger. */
  openOnTriggerFocus: _propTypes.default.bool,

  /** Controls whether or not the portal should open when mousing over the trigger. */
  openOnTriggerMouseEnter: _propTypes.default.bool,

  /** Controls whether the portal should be prepended to the mountNode instead of appended. */
  prepend: _propTypes.default.bool,

  /** Element to be rendered in-place where the portal is defined. */
  trigger: _propTypes.default.node
} : {};
var _default = Portal;
exports.default = _default;
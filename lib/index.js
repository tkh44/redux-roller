'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _react = require('react');

var _reactRedux = require('react-redux');

var _reactMotion = require('react-motion');

var div = _react.DOM.div;
var merge = function merge() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return Object.assign.apply(Object, [{}].concat(args));
};

exports.merge = merge;
var SCROLL = 'roller/SCROLL';
exports.SCROLL = SCROLL;
var CREATE = 'roller/CREATE';

exports.CREATE = CREATE;
var actions = {};

exports.actions = actions;
actions.scroll = function (id, scrollTop) {

    return { type: SCROLL, payload: { id: id, scrollTop: scrollTop } };
};

actions.create = function (id) {
    var scrollTop = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

    return { type: SCROLL, payload: { id: id, scrollTop: scrollTop } };
};

var rollerReducer = function rollerReducer(state, action) {
    if (state === undefined) state = {};
    var type = action.type;
    var _action$payload = action.payload;
    var payload = _action$payload === undefined ? {} : _action$payload;

    switch (type) {

        case SCROLL:

            return merge(state, _defineProperty({}, payload.id, {
                scrollTop: payload.scrollTop
            }));

        default:

            return state;
    }
};

exports.rollerReducer = rollerReducer;

var ScrollContent = (function (_Component) {
    _inherits(ScrollContent, _Component);

    function ScrollContent() {
        _classCallCheck(this, ScrollContent);

        _get(Object.getPrototypeOf(ScrollContent.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(ScrollContent, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {

            if (this.props.scrollTop !== prevProps.scrollTop) {
                this.contentEl.scrollTop = this.props.scrollTop;
                this.props.onScroll(this.props.scrollTop);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this = this;

            var _props = this.props;
            var children = _props.children;
            var className = _props.className;
            var style = _props.style;

            return div({
                ref: function ref(el) {
                    return _this.contentEl = el;
                },
                className: 'scrollarea-content ' + (className || ''),
                style: style
            }, (0, _react.cloneElement)(children, { rollerEl: this.contentEl }));
        }
    }]);

    return ScrollContent;
})(_react.Component);

exports.ScrollContent = ScrollContent;

ScrollContent.propTypes = {
    scrollTop: _react.PropTypes.number
};

var roller = function roller(rollerId, WrappedComponent) {
    if (rollerId === undefined) rollerId = Date.now() * Math.random();

    if (typeof rollerId !== 'string') {
        WrappedComponent = rollerId;
        rollerId = Date.now() * Math.random();
    }

    var Roller = (function (_Component2) {
        _inherits(Roller, _Component2);

        function Roller(props) {
            _classCallCheck(this, Roller);

            _get(Object.getPrototypeOf(Roller.prototype), 'constructor', this).call(this, props);
        }

        _createClass(Roller, [{
            key: 'componentDidMount',
            value: function componentDidMount() {

                this.props.create(rollerId);
            }
        }, {
            key: 'render',
            value: function render() {
                var _this2 = this;

                var rollerConfig = this.props.roller[rollerId];
                var y = rollerConfig ? rollerConfig.scrollTop : 0;

                return (0, _react.createElement)(_reactMotion.Motion, {
                    style: { y: (0, _reactMotion.spring)(y) }
                }, function (current) {

                    return (0, _react.createElement)(ScrollContent, merge(_this2.props, {
                        ref: function ref(el) {
                            return _this2.contentEl = el;
                        },
                        scrollTop: current.y,
                        onScroll: _this2.props.onScroll
                    }), (0, _react.createElement)(WrappedComponent, merge(_this2.props, { rollerId: rollerId })));
                });
            }
        }]);

        return Roller;
    })(_react.Component);

    Roller.propTypes = {
        children: _react.PropTypes.any,
        className: _react.PropTypes.string,
        onScroll: _react.PropTypes.func,
        scrollBarContainerStyle: _react.PropTypes.object,
        scrollBarStyle: _react.PropTypes.object,
        style: _react.PropTypes.object,
        wrapperClassName: _react.PropTypes.string,
        wrapperStyle: _react.PropTypes.object
    };

    Roller.defaultProps = {
        onScroll: function onScroll() {}
    };

    var mapStateToProps = function mapStateToProps(state) {

        return {
            roller: state.roller
        };
    };

    return (0, _reactRedux.connect)(mapStateToProps, {
        scroll: actions.scroll,
        bottom: actions.bottom,
        top: actions.top,
        create: actions.create
    })(Roller);
};
exports.roller = roller;
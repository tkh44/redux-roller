import { Component, PropTypes, createElement, DOM, cloneElement } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

const { div } = DOM;

export const merge = (...args) => {

    return Object.assign({}, ...args);
};

export const SCROLL = 'roller/SCROLL';

export const actions = {};

actions.scroll = (id, scrollTop) => {

    return { type: SCROLL, payload: { id, scrollTop } };
};

actions.update = (id, scrollTop = 0) => {

    return { type: SCROLL, payload: { id, scrollTop } };
};

export const rollerReducer = (state = {} , action = {}) => {

    switch (action.type) {

        case SCROLL:

            return merge(state, {
                [action.payload.id]:  {
                    scrollTop: action.payload.scrollTop
                }
            });

        default:

            return state;
    }
};



export class ScrollContent extends Component {

    render() {

        const {
            className,
            style
        } = this.props;

        return div(merge(this.props, {
            ref: (el) => (this.contentEl = el),
            className: `scrollarea-content ${className || ''}`,
            style
        }));
    }
}

ScrollContent.propTypes = {
    scrollTop: PropTypes.number
};


export const roller = (rollerId, WrappedComponent) => {

    if (typeof rollerId !== 'string' || typeof rollerId !== 'number') {
        WrappedComponent = rollerId;
        rollerId = Date.now() * Math.random();
    }

    class Roller extends Component {

        constructor(props) {

            super(props);
            this.updateScroll = this.updateScroll.bind(this);
        }

        componentDidMount() {

            this.contentEl.onscroll = this.updateScroll;
            this.updateScroll();
        }

        shouldComponentUpdate(nextProps, nextState) {

            return shallowCompare(this, nextProps, nextState);
        }


        render() {

            const rollerConfig = this.props.roller[rollerId];
            const y = rollerConfig ? rollerConfig.scrollTop : 0;

            return createElement(Motion, {
                style: { y: spring(y) }
            },
                (current) => {

                    return createElement(ScrollContent, merge(this.props, {
                        ref: (el) => (this.contentEl = el),
                        scrollTop: current.y,
                        onScroll: this.props.onScroll
                    }),
                        createElement(WrappedComponent, merge(this.props, { rollerId }))
                    );
                }
            );
        }

        updateScroll() {

            var scrollTop = this.contentEl.scrollTop;
            this.props.update(rollerId, { scrollTop });
            this.props.onScroll && this.props.onScroll(scrollTop);
        }
    }

    Roller.propTypes = {
        children: PropTypes.any,
        className: PropTypes.string,
        onScroll: PropTypes.func,
        scrollBarContainerStyle: PropTypes.object,
        scrollBarStyle: PropTypes.object,
        style: PropTypes.object,
        wrapperClassName: PropTypes.string,
        wrapperStyle: PropTypes.object
    };

    Roller.defaultProps = {
        onScroll: () => {}
    };

    const mapStateToProps = (state) => {

        return {
            roller: state.roller
        };
    };

    return connect(mapStateToProps, {
        scroll: actions.scroll,
        bottom: actions.bottom,
        top: actions.top,
        update: actions.update
    })(Roller);
};

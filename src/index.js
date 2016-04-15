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

    componentDidMount() {

        const { scrollTop } = this.props;

        this.scrollContent(scrollTop);
    }

    shouldComponentUpdate(nextProps, nextState) {

        return shallowCompare(this, nextProps, nextState);
    }


    componentDidUpdate(prevProps) {

        if (this.props.scrollTop !== prevProps.scrollTop) {
            this.scrollContent(this.props.scrollTop);
        }
    }

    render() {

        const { className } = this.props;

        return div({
            ref: 'contentEl',
            className: `scrollarea-content ${className || ''}`
        }, this.props.children);
    }

    scrollContent(y) {

        this.refs.contentEl.scrollTop = y;
    }
}

ScrollContent.propTypes = {
    scrollTop: PropTypes.number
};


export const roller = (options) => {

    const { id } = options;

    return (WrappedComponent) => {

        class Roller extends Component {

            shouldComponentUpdate(nextProps, nextState) {

                return shallowCompare(this, nextProps, nextState);
            }

            render() {

                const { scrollState, onScroll } = this.props;
                const { scrollTop } = scrollState;

                return createElement(Motion, {
                        style: { y: spring(parseInt(scrollTop, 10), { stiffness: 170, damping: 26, precision: 0.1 }) }
                    },
                    (current) => {

                        return createElement(ScrollContent, {
                                ref: (el) => (this.contentEl = el),
                                scrollTop: current.y,
                                onScroll: onScroll
                            },
                            createElement(WrappedComponent, merge(this.props, { rollerId: id }))
                        );
                    }
                );
            }
        }

        Roller.propTypes = {
            children: PropTypes.any,
            onScroll: PropTypes.func
        };

        Roller.defaultProps = {
            onScroll: () => {}
        };

        const mapStateToProps = (state) => {

            return {
                scrollState: state.roller[id] || { scrollTop : 0 }
            };
        };

        return connect(mapStateToProps, {
            scroll: actions.scroll
        })(Roller);
    };
};

import { Component, PropTypes, createElement, DOM, cloneElement } from 'react';
import { connect } from 'react-redux';
import { Motion, spring } from 'react-motion';

const { div } = DOM;

export const merge = (...args) => {

    return Object.assign({}, ...args);
};

export const SCROLL = 'roller/SCROLL';
export const CREATE = 'roller/CREATE';

export const actions = {};

actions.scroll = (id, scrollTop) => {

    return { type: SCROLL, payload: { id, scrollTop } };
};

actions.create = (id, scrollTop = 0) => {

    return { type: SCROLL, payload: { id, scrollTop } };
};

export const rollerReducer = (state = {} , action) => {

    const { type, payload = {} } = action;

    switch (type) {

        case SCROLL:

            return merge(state, {
                [payload.id]:  {
                    scrollTop: payload.scrollTop
                }
            });

        default:

            return state;
    }
};



export class ScrollContent extends Component {

    static propTypes = {
        scrollTop: PropTypes.number
    };

    componentDidUpdate(prevProps) {

        if (this.props.scrollTop !== prevProps.scrollTop) {
            this.contentEl.scrollTop = this.props.scrollTop;
            this.props.onScroll(this.props.scrollTop);
        }
    }

    render() {

        const {
            children,
            className,
            style
        } = this.props;

        return div({
            ref: (el) => (this.contentEl = el),
            className: `scrollarea-content ${className || ''}`,
            style
        }, cloneElement(children, { rollerEl: this.contentEl }));
    }
}


export const roller = (Wrapped) => {

    const rollerId = Date.now() * Math.random();

    class Roller extends Component {

        static propTypes = {
            children: PropTypes.any,
            className: PropTypes.string,
            onScroll: PropTypes.func,
            scrollBarContainerStyle: PropTypes.object,
            scrollBarStyle: PropTypes.object,
            style: PropTypes.object,
            wrapperClassName: PropTypes.string,
            wrapperStyle: PropTypes.object
        };

        static defaultProps = {
            onScroll: () => {}
        };

        constructor(props) {

            super(props);
        }

        componentDidMount() {

            this.props.create(rollerId);
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
                        createElement(Wrapped, merge(this.props, { rollerId }))
                    );
                }
            );
        }
    }

    const mapStateToProps = (state) => {

        return {
            roller: state.roller
        };
    };

    return connect(mapStateToProps, {
        scroll: actions.scroll,
        bottom: actions.bottom,
        top: actions.top,
        create: actions.create
    })(Roller);
};

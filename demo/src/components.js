import { Component, PropTypes, createElement, DOM } from 'react';
import ReactDOM from 'react-dom';
import shallowCompare from 'react-addons-shallow-compare';
import { connect } from 'react-redux';
import { roller, actions as rollerActions  } from '../../src';


const { div, h2, p, img, input } = DOM;

const styles = {
    container: {
        fontFamily: '"Roboto", sans-serif',
        margin: 'auto',
        maxWidth: 960,
        minWidth: 400,
        height: '100vh',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
    },
    header: {
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 578,
        minWidth: 400,
        padding: 16
    },
    large: {
        fontSize: 24,
        lineHeight: '26px',
        margin: 4
    },
    small: {
        fontSize: 12,
        lineHeight: '14px',
        margin: 0
    },
    controls: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingTop: 16
    },
    control: {
        background: 'rgba(84, 24, 164, 1)',
        color: 'rgb(255, 255, 255)',
        border: '1px solid rgba(62, 127, 182, 1)',
        fontSize: 14,
        padding: 8,
        borderRadius: 3,
        boxShadow: 'none',
        margin: 16,
        cursor: 'pointer',
        width: '90%'
    },
    list: {
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        minWidth: 400
    },
    item: {
        fontSize: 14,
        borderBottom: '1px solid gray',
        paddingLeft: 8
    }
};

export class App extends Component {

    render() {

        return div(null,
            createElement(Demo),
            div({ dangerouslySetInnerHTML: { __html: '<a href="https://github.com/tkh44/redux-roller" class="github-corner"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>' } })
        );
    }
}

const Demo = connect((state) => ({
    items: state.items,
    roller: state.roller,
    listA: state.roller.listA || { scrollTop: 0 }
}))(class extends Component {

    constructor(props) {

        super(props);

        this.state = { sliderValue: 1 };
        this.scrollHeight = 0;
    }

    componentDidMount() {

        this.setScrollHeight(ReactDOM.findDOMNode(this.scrollerEl));
    }

//    shouldComponentUpdate(nextProps, nextState) {
//
//        return shallowCompare(this, nextProps, nextState);
//    }

    render() {

        const { items } = this.props;

        return div({ style: styles.container },
            div({ style: styles.header },
                h2({ style: styles.large}, 'Redux-Roller'),
                p({ style: styles.small }, 'Manage scrollTop with redux.'),
                p({ style: styles.small }, ' Animate with react-motion.'),
                div({ style: styles.controls },
                    input({
                        style: {
                            width: 64,
                            fontSize: 14,
                            marginBottom: 8
                        },
                        type: 'number',
                        min: 0,
                        max: this.state.scrollHeight,
                        value: this.state.sliderValue,
                        step: 10,
                        onChange: this.handleChange
                    }),
                    input({
                        style: {
//                            width: '100%',
//                            maxWidth: 400,
//                            minWidth: 278
                        },
                        type: 'range',
                        min: 0,
                        max: this.state.scrollHeight,
                        value: this.state.sliderValue,
                        step: 10,
                        onChange: this.handleChange
                    })
                )
            ),
            createElement(ListA, {
                ref: (el) => (this.scrollerEl = el),
                items
            })
        );
    }

    handleChange = (e) => {

        var value = e.target.value;
        this.setState({ sliderValue: value });
        this.props.dispatch(rollerActions.scroll('listA', value));
    };

    setScrollHeight(el) {

        var scrollHeight = el.scrollHeight;
//        this.setState({ scrollHeight: scrollHeight });
        this.scrollHeight = scrollHeight;
    }
});


class List extends Component {

    shouldComponentUpdate(nextProps, nextState) {

        return shallowCompare(this, nextProps, nextState);
    }

    render() {

        const { items } = this.props;

        return div({ style: styles.list },
            items.map((item, i) => {

                return div({
                        key: i,
                        style: styles.item
                    },
                    p(null, `This is item ${item.id}`)
                )
            })
        );
    }
}

List.propTypes = {
    scroll: PropTypes.func,
    rollerId: PropTypes.any
};


export const ListA = roller({id: 'listA'})(List);

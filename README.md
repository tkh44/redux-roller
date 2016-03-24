# redux-roller
Control scrolling with the help of redux.

## Installation

```
$ npm install redux-roller
```

## Example

```js
import { Component, PropTypes, DOM } from 'react';
import { roller } from 'Roller';

const { div } = DOM;

// Add rollerReducer to your main reducer...

class List extends Component {

    static propTypes = {
        scroll: PropTypes.func,
        rollerId: PropTypes.any,
        rollerEl: PropTypes.node
    }

    componentWillUpdate(nextProps) {

        const { rollerEl } = nextProps;

        if (rollerEl) {
            this.shouldScrollToBottom = rollerEl.scrollTop + rollerEl.offsetHeight >= rollerEl.scrollHeight;
        }
    }

    componentDidUpdate(prevProps) {

        const { scroll, rollerId, rollerEl } = this.props;

        if (this.shouldScrollToBottom && this.props.listItems !== prevProps.listItems) {
            scroll(rollerId, rollerEl.scrollHeight);
        }
    }

    render() {

        const { listItems } = this.props;

        return div({
            className: 'list'
        },
            listItems.map((message, i) => {

                return div({
                    key: i,
                    style: {
                        width: '100%',
                        height: '48'
                    }
                },
                    Math.random()
                )
            })
        );
    }
}

// optional id, will be generated if none provided
export default roller(List, 'optional-id');

```

# License

Modified BSD

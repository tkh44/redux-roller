import { createElement } from 'react';
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { App } from './components';
import { rollerReducer } from 'Roller';

const reducer = combineReducers({
  roller: rollerReducer
});

const logger = createLogger();
const finalCreateStore = compose(
    applyMiddleware(logger)
)(createStore);
const store = finalCreateStore(reducer);

const main = () => createElement(Provider, { store }, createElement(App));

render(main(), document.querySelector('#demo'));

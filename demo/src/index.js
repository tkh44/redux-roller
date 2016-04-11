import './style.css';
import { createElement } from 'react';
import { render } from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import { App } from './components';
import { rollerReducer } from '../../src';


const items = Array.from({ length: 1000 }, (v, i) => {

    return { id: i + 1 }
});

const itemsReducer = (state = items) => {

    return state;
};


const reducer = combineReducers({
  roller: rollerReducer,
  items: itemsReducer
});

const logger = createLogger();
const finalCreateStore = compose(
    applyMiddleware(logger)
)(createStore);
const store = finalCreateStore(reducer);

const main = () => createElement(Provider, { store }, createElement(App));

render(main(), document.querySelector('#demo'));

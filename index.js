import React from 'react';
import {render} from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import DevTools from './containers/DevTools';
import Root from './containers/Root';
import {browserHistory} from 'react-router';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';
import styles from './public/css/style.css';

let initialState = window.__INITIAL_STATE__;

const middleware = process.env.NODE_ENV === 'production'
    ? [thunk, routerMiddleware(browserHistory)]
    : [thunk, routerMiddleware(browserHistory), logger()];

const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middleware))
    : compose(applyMiddleware(...middleware), DevTools.instrument());

const store = createStore(reducer, initialState, enhancer);
const history = syncHistoryWithStore(browserHistory, store);

render(
      <Root store={store} history={history} />,
      document.getElementById('root')
);

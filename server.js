var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var express = require('express');
var env = process.env.NODE_ENV || 'development';
if (env === 'production') {
    var config = require('./webpack.production.config');
} else {
    var config = require('./webpack.config');
}

import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import DevTools from './containers/DevTools';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { renderToString } from 'react-dom/server';
import { RouterContext, match } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from './routes';
import collect from './actions/collect';
import styles from './public/css/style.css';

const middleware = process.env.NODE_ENV === 'production' ?
  [ thunk, routerMiddleware(browserHistory) ] :
  [ thunk, routerMiddleware(browserHistory), logger() ];

const enhancer = process.env.NODE_ENV === 'production' ?
  applyMiddleware(...middleware) :
  compose(applyMiddleware(...middleware), DevTools.instrument());

const store = createStore( reducer, enhancer );

export default function(){
    var app = express();
    var http = require('http').Server(app);
    var port = 45807;

    app.use('/static', express.static(__dirname + '/dist/'));

    if (env === 'production') {
        console.log('production');
    } else {
        var compiler = webpack(config);
        app.use(webpackDevMiddleware(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath
        }));
        app.use(webpackHotMiddleware(compiler));
    }

    app.use((req, res) => {
        const location = createLocation(req.url);
        match({ routes, location }, (err, redirectLocation, renderProps) => {
            if (err) {
                console.error(err);
                return res.status(500).end('Internal server error');
            }

            if (!renderProps) return res.status(404).end('Not found.');

            function renderView(){
                const InitialComponent = (
                  <Provider store={store}>
                      <RouterContext {...renderProps}/>
                  </Provider>);

                const initialState = store.getState();
                const componentHTML = renderToString(InitialComponent);
                const HTML = `<!DOCTYPE html>
                  <html>
                    <head>
                      <meta charset="utf-8">
                      <title>Isomorphic Redux Example</title>
                      <link rel="icon" type="image/png" href="img/favicon-32x32.png" sizes="32x32" />
                      <link rel="icon" type="image/png" href="img/favicon-16x16.png" sizes="16x16" />
                      <link rel="stylesheet" href="/static/styles.css" />
                    </head>
                    <body>
                    <script type="application/javascript">
                        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
                    </script>
                    <div id="root"><div>${componentHTML}</div></div>
                    <script src="/static/bundle.js"></script>
                    </body>
                </html>`;

                return HTML;
            }

            collect(store.dispatch, renderProps.components, renderProps.params)
              .then(renderView)
              .then(html => res.end(html))
              .catch(err => res.end(err.message));
        });
    });

    http.listen(port, function(error) {
        if (error) {
            console.error(error);
        } else {
            console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
        }
    });
}

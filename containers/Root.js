import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import routes from '../routes';
import DevTools from './DevTools';
import { Router } from 'react-router';

export default class Root extends Component {

    render() {
        const { store, history } = this.props;
        const isProd = process.env.NODE_ENV === 'production';

        const devTools = (
      <DevTools />
    );

        return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
          {!isProd && devTools}
        </div>
      </Provider>
        );
    }
}

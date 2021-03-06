import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import DashboardPage from './containers/DashboardPage';


export default (
    <Route path="/" component={App}>
        <IndexRoute
            component={DashboardPage} />
    </Route>
);

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { default as entities } from './entities';

export default combineReducers({
    entities,
    routing
});

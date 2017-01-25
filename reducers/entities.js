import {
    keyBy
} from 'lodash';

const initialState = {
    charities: {},
    donations: {}
};

export default function entities(state = initialState, action) {

    if (action.entity) {

        if (!action.remove) {

            if (Array.isArray(action.data)) {
                state = Object.assign({}, state, {
                    [action.entity]: Object.assign({}, state[action.entity], keyBy(action.data, 'id'))
                });
            } else if (action.data && !action.data.id) {
                state = Object.assign({}, state, {
                    [action.entity]: Object.assign({}, state[action.entity], {
                        0: action.data
                    })
                });
            } else {
                state = Object.assign({}, state, {
                    [action.entity]: Object.assign({}, state[action.entity], {
                        [action.data.id]: action.data
                    })
                });
            }
        } else {

            var newState = Object.assign({}, state);
            delete newState[action.entity][action.data.id];
            state = newState;

        }
    }
    return state;

}

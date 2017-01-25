import * as types from '../constants/ActionTypes';
import * as entities from '../constants/Entities';

import {fetchApi,dispatchApiCall} from './helpers';

const APP_ID = '212eebba';
const CHARITY_ID = 2357;

// -----------------------------------------------------------------------------
// Charities List
// -----------------------------------------------------------------------------

export function getCharityInfo(reset = false) {
    return (dispatch) => {

        const fetchUrl =
            `https://api.justgiving.com/${APP_ID}/v1/charity/${CHARITY_ID}`;
        const listPages = fetchApi(fetchUrl);

        return dispatchApiCall(dispatch, listPages, {
            request: types.CHARITIES_REQUEST,
            success: types.CHARITIES_SUCCESS,
            failure: types.CHARITIES_FAILURE,
            entity: entities.CHARITIES,
            reset
        });

    };
}
// -----------------------------------------------------------------------------
// Donations List
// -----------------------------------------------------------------------------

export function getCharityDonationInfo(reset = false) {
    return (dispatch) => {

        const fetchUrl =
            `https://api.justgiving.com/${APP_ID}/v1/charity/${CHARITY_ID}/donations`;
        const listPages = fetchApi(fetchUrl);

        return dispatchApiCall(dispatch, listPages, {
            request: types.DONATIONS_REQUEST,
            success: types.DONATIONS_SUCCESS,
            failure: types.DONATIONS_FAILURE,
            entity: entities.DONATIONS,
            reset
        });

    };
}

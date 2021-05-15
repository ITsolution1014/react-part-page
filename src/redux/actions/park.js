import ActionTypes from './actionTypes';

import axios from 'axios';

import * as config from '../../static/constants';

export const ParkInfo = (parkCode,stateCode = "me") => async dispatch => {
    try {
        let res = await axios.get(`${config.BACKEND_URL}?api_key=${config.api_key}&parkCode=${parkCode}&stateCode=${"me"}`, {});
        dispatch({
            type: ActionTypes.ParkInfo,
            payload: res.data
        })
    } catch(err) {
        console.log(err, 'ParkInfo');
    }
}
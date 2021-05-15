import ActionTypes from '../actions/actionTypes';

const INITIAL_STATE = {
    parkInfo:[]
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        
        case ActionTypes.ParkInfo:
            return ({
                ...state,
                parkInfo: action.payload,
            });
        default:
            return state;
    }

}
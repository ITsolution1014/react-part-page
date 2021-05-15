import {combineReducers} from 'redux';

import parkReducer from './park';

export default combineReducers({
    park: parkReducer
});


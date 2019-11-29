import { combineReducers } from 'redux';

import changeAuthReducer from './changeAuthReducer'

export default combineReducers({
    auth: changeAuthReducer
});
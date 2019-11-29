import { combineReducers } from 'redux';

import {reducer as formReducer} from 'redux-form';

import changeAuthReducer from './changeAuthReducer'

export default combineReducers({
    auth: changeAuthReducer,
    form: formReducer
});
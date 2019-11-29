import { combineReducers } from 'redux';

import { reducer as formReducer } from 'redux-form';

import changeAuthReducer from './changeAuthReducer';
import { streamsReducer } from './streamsReducer';

export default combineReducers({
    auth: changeAuthReducer,
    form: formReducer,
    streams: streamsReducer
});
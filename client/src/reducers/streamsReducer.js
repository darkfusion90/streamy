import _ from 'lodash';

import {
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            //mapKeys essentially takes the response from the api server (which is an array of streams)
            //and then will create a new object with 'id' of each element of the array as the key
            //and the actual array element as value
            //Then finally we destructure the object using ... and combine it and ...state 
            //to create a brand new object with new list of streams merged with state
            return { ...state, ..._.mapKeys(action.payload, 'id') }

        case FETCH_STREAM:
        case CREATE_STREAM:
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload.id);
        default:
            return state;
    }
}
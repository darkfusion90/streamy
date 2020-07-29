import history from '../../history';
import streams from '../../apis/streams';
import { CREATE_STREAM, EDIT_STREAM, DELETE_STREAM, FETCH_STREAMS, FETCH_STREAM } from '../types';

const navigateToHomePage = () => {
    history.push('/');
}

export const createStream = formValues => async (dispatch, getState) => {
    const response = await streams.post(
        "/streams",
        { ...formValues, 'userId': getState().auth.userId }
    );

    dispatch({ type: CREATE_STREAM, payload: response.data });
    navigateToHomePage();
}

export const editStream = (id, formValues) => async (dispatch, getState) => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
    navigateToHomePage();
}

export const deleteStream = id => async dispatch => {
    const response = await streams.delete(`/streams/${id}`);

    return new Promise((resolve, reject) => {
        dispatch({ type: DELETE_STREAM, payload: { id: id } });
        console.log(response);
        if (response.status === 200) {
            resolve();
        } else {
            reject();
        }
    });
}

export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get("/streams");
    dispatch({ type: FETCH_STREAMS, payload: response.data });
}


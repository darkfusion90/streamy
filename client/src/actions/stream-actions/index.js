import streams from '../../apis/streams';
import { CREATE_STREAM, EDIT_STREAM, DELETE_STREAM, FETCH_STREAMS, FETCH_STREAM } from '../types';

export const createStream = formValues => async dispatch => {
    const response = await streams.post("/streams", formValues);

    dispatch({ type: CREATE_STREAM, payload: response.data });
}

export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.put(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });
}

export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: { id: id } });
}

export const fetchStream = id => async dispatch => {
    const response = await streams.post(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get("/streams");

    dispatch({ type: FETCH_STREAMS, payload: response.data });
}


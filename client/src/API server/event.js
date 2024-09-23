import axios from "axios";
import {deleteEvents, setEvent, setEvents} from "../reducers/eventReducer";

export const addEvent = (object) => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:5000/api/event/addEvent', object);
            dispatch(setEvent(response.data));
        } catch (e) {
            console.log(e);
        }
    }
}
export const deleteEvent = id => {
    return async dispatch => {
        try {
            const response =
                await axios.delete(`http://localhost:5000/api/event/deleteEvent?id=${id}`);
            dispatch(deleteEvents(id));
        } catch (e) {
            console.log(e);
        }
    }
}
export const updateEvent = object => {
    return async dispatch => {
        try {
            const response =
                await axios.put(`http://localhost:5000/api/event/updateEvent`, object);
        } catch (e) {
            console.log(e);
        }
    }
}

export const getEvents = (sort, currentPage, sizePage) => {
    return async dispatch => {
        try {
            let url = 'http://localhost:5000/api/event/events';
            let queryParams = [];

            if (sort) {
                queryParams.push(`sort=${sort}`);
            }
            if (currentPage) {
                queryParams.push(`currentPage=${currentPage}`);
            }
            if (sizePage) {
                queryParams.push(`sizePage=${sizePage}`);
            }

            if (queryParams.length > 0) {
                url += `?${queryParams.join('&')}`;
            }

            const response = await axios.get(url);

            dispatch(setEvents(response.data));
        } catch (e) {
            console.log(e);
        }
    }
}

export const registerClient = object => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:5000/api/event/register', object);
        } catch (e) {
            console.log(e);
        }
    }
}
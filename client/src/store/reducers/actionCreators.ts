import {AppDispatch} from "../store";
import axios from "axios";
import {IEvent} from "../../models/IEvents";
import {eventsSlice} from "./eventsSlice";

export const fetchEvents = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(eventsSlice.actions.getEventsRequest())
        const response = await axios.get<IEvent[]>('http://localhost:5000/api/event/events');
        dispatch(eventsSlice.actions.getEventsSuccess(response.data));
    } catch (e:any) {
        dispatch(eventsSlice.actions.getEventsError(e));
    }
}

export const addEvent = (values: IEvent) => async (dispatch: AppDispatch) => {
    try {
        dispatch(eventsSlice.actions.addEventRequest())
        const response = await axios.post<IEvent>('http://localhost:5000/api/event/addEvent', values);
        dispatch(eventsSlice.actions.addEventSuccess(response.data));
    } catch (e:any) {
        dispatch(eventsSlice.actions.addEventError(e));
    }
}

export const deleteEvent = (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
        dispatch(eventsSlice.actions.deleteEventRequest())
        const response = await axios.delete<IEvent>(`http://localhost:5000/api/event/deleteEvent?id=${event._id}`);
        dispatch(eventsSlice.actions.deleteEventSuccess(event));
    } catch (e:any) {
        dispatch(eventsSlice.actions.deleteEventError(e));
    }
}

export const updateEvent = (event: IEvent) => async (dispatch: AppDispatch) => {
    try {
        dispatch(eventsSlice.actions.updateEventRequest())
        const response = await axios.put<IEvent>(`http://localhost:5000/api/event/updateEvent`, event);
        dispatch(eventsSlice.actions.updateEventSuccess(response.data));
    } catch (e:any) {
        dispatch(eventsSlice.actions.updateEventError(e));
    }
}
import {IEvent} from "../../models/IEvents";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface EventsState {
    events: IEvent[];
    loading: boolean;
    error: string;
}

const initialState: EventsState = {
    events: [],
    loading: false,
    error: '',
}

export const eventsSlice = createSlice({
    name: "events",
    initialState: initialState,
    reducers: {
        getEventsRequest: (state) => {
            state.loading = true;
        },
        getEventsSuccess: (state, action: PayloadAction<IEvent[]>) => {
            state.loading = false;
            state.events = action.payload;
            state.error = '';
        },
        getEventsError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        addEventRequest: (state) => {
            state.loading = true;
        },
        addEventSuccess: (state, action: PayloadAction<IEvent>) => {
            state.loading = false;
            state.events = [...state.events, action.payload];
            state.error = '';
        },
        addEventError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        deleteEventRequest: (state) => {
            state.loading = true;
        },
        deleteEventSuccess: (state, action: PayloadAction<IEvent>) => {
            state.loading = false;
            state.events = state.events.filter(elem => elem._id !== action.payload._id);
            state.error = '';
        },
        deleteEventError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        updateEventRequest: (state) => {
            state.loading = true;
        },
        updateEventSuccess: (state, action: PayloadAction<IEvent>) => {
            state.loading = false;
            state.events = [...state.events, action.payload];
            state.error = '';
        },
        updateEventError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export default eventsSlice.reducer
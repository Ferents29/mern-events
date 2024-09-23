const SET_EVENTS = 'SET_EVENTS';
const ADD_EVENTS = 'ADD_EVENTS';
const DELETE_EVENT = 'DELETE_EVENT';

const getInitialState = () => ({
    loading: false,
    error: '',
    events: [],
});

export const eventReducer = (state = getInitialState(), action) => {
    switch (action.type) {
        case SET_EVENTS:
            return {
                ...state,
                loading: true,
                events: action.payload,
            }
        case ADD_EVENTS:
            return {
                ...state,
                loading: true,
                events: [...state.events, action.payload],
            }
        case DELETE_EVENT:
            return {
                ...state,
                loading: false,
                events: state.events.filter(elem => elem._id !== action.payload),
            }

        default:
            return state;
    }
}

export const setEvents = events => {
    return {
        type: SET_EVENTS,
        payload: events,
    }
};
export const setEvent = event => {
    return {
        type: ADD_EVENTS,
        payload: event,
    }
};
export const deleteEvents = id => {
    return {
        type: DELETE_EVENT,
        payload: id,
    }
};
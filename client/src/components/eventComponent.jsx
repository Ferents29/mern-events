import React from 'react';
import {NavLink, useHistory} from "react-router-dom";
import moment from "moment";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {deleteEvent} from "../API server/event";
import {useDispatch} from "react-redux";

const EventComponent = ({ elem, setEventId, setIsModalOpen, setInitialEvent }) => {
    const dispatch = useDispatch();

    const deleteHandler = () => {
        dispatch(deleteEvent(elem._id));
    }

    function updateHandler() {
        setIsModalOpen(true);
        setInitialEvent(elem);
    }

    return (
        <div className="event-element-wrapper">
            <div className="remove-update-button">
                <EditOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => updateHandler()}
                />
                <DeleteOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteHandler()}
                />
            </div>
            <div className="event-element-wrapper-title">
                {elem.title}
            </div>
            <div className="event-element-wrapper-description">
                {elem.description}
            </div>
            <div className="event-element-wrapper-organizer">
                {elem.organizer}
            </div>
            <div className="event-element-wrapper-date">
                {moment(elem.date).format("DD MMM YYYY")}
            </div>
            <div className="event-element-wrapper-links">
                <NavLink
                    to="/register"
                    onClick={() => setEventId(elem._id)}
                >
                    Register
                </NavLink>
                <NavLink
                    to="/view"
                    onClick={() => setEventId(elem._id)}
                >
                    View
                </NavLink>
            </div>
        </div>
    );
};

export default EventComponent;
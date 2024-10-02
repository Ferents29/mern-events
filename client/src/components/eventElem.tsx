import React, {FC} from 'react';
import moment from "moment";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import {deleteEvent} from "../store/reducers/actionCreators";
import {useAppDispatch} from "../hooks/redux";
import {IEvent} from "../models/IEvents";

interface EventElemProps {
    event: any;
    setIsModalOpen: (isOpen: boolean) => void;
    setInitialEvent: (event: IEvent) => void;
}

const EventElem: FC<EventElemProps> = ({event, setIsModalOpen, setInitialEvent}) => {
    const dispatch = useAppDispatch();

    const updateHandler = () => {
        setIsModalOpen(true);
        setInitialEvent(event)
    }

    return (
        <div className="event-wrapper">
            <div className="event-btns">
                <DeleteOutlined
                    style={{cursor: 'pointer'}}
                    onClick={() => dispatch(deleteEvent(event))}
                />
                <EditOutlined
                    style={{cursor: 'pointer'}}
                    onClick={() => updateHandler()}
                />
            </div>
            <div className="event-title">{event.title}</div>
            <div className="event-description">{event.description}</div>
            <div className="event-dateEvent">{moment(event.date).format("DD MMM YYYY")}</div>
            <div className="event-organizer">{event.organizer}</div>
        </div>
    );
};

export default EventElem;
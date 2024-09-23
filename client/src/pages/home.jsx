import React, {useState} from 'react';
import AddEventModal from "../components/addEventModal";
import EventComponent from "../components/eventComponent";
import {Select} from "antd";

const Home = ({events, dispatch, setEventId, setSort, sort}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialEvent, setInitialEvent] = useState({});

    const handleChange = value => setSort(value);

    return (
        <>
            <Select
                value={sort}
                defaultValue="Вибрати значення"
                style={{ width: 220 }}
                onChange={handleChange}
                options={[
                    {
                        value: 'title',
                        label: 'Title',
                    },
                    {
                        value: 'description',
                        label: 'Description',
                    },
                    {
                        value: 'date',
                        label: 'Date',
                    },
                    {
                        value: 'organizer',
                        label: 'Organizer',
                    },
                ]}
            />
            <AddEventModal
                dispatch={dispatch}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                initialEvent={initialEvent}
                setInitialEvent={setInitialEvent}
            />
            <div className="events-wrapper">
                {events.length > 0 && events.map(elem => {
                        return (
                            <EventComponent
                                elem={elem}
                                setEventId={setEventId}
                                setIsModalOpen={setIsModalOpen}
                                setInitialEvent={setInitialEvent}
                            />
                        )
                    }
                )}
            </div>
        </>
    );
};

export default Home;
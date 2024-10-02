import React, {useEffect, useState} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {fetchEvents} from "./store/reducers/actionCreators";
import EventElem from "./components/eventElem";
import AddEventModalForm from "./components/AddEventModalForm";
import {Button, Form} from "antd";
import {IEvent} from "./models/IEvents";
import isEmpty from "lodash/isEmpty";

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [initialEvent, setInitialEvent] = useState({} as IEvent);
    const {events} = useAppSelector(state => state.eventsReducer);
    const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchEvents())
  }, [dispatch])

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        setInitialEvent({} as IEvent);
    };

    function getTitleModal() {
        if (!isEmpty(initialEvent)){
            return 'Update event'
        }
        return 'Add event'
    }

    return (
    <div className="app-wrapper">
      <div className="app-header">
          <Button type="primary" onClick={showModal}>
              Add event
          </Button>
          <AddEventModalForm
              isModalOpen={isModalOpen}
              handleOk={handleOk}
              initialEvent={initialEvent}
              title={getTitleModal()}
              setIsModalOpen={setIsModalOpen}
              setInitialEvent={setInitialEvent}
          />
      </div>
      <div className="events-wrapper">
          {events.map((event) => (
              <EventElem
                  key={event._id}
                  event={event}
                  setIsModalOpen={setIsModalOpen}
                  setInitialEvent={setInitialEvent}
              />
          ))}
      </div>
    </div>
  );
}

export default App;

import './App.css';
import {useEffect, useState} from "react";
import {getEvents, registerClient} from "./API server/event";
import {useDispatch, useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import View from "./pages/view";
import Register from "./pages/register";
import Home from "./pages/home";

function App() {
    const [eventId, setEventId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sizePage, setSizePage] = useState(5);
    const [sort, setSort] = useState('');
    const dispatch = useDispatch();
    const { events } = useSelector(state => state.eventReducer);

    const numberSizePage = Number(sizePage);
    const numberCurrentPage = Number(currentPage);

    useEffect(() => {
        dispatch(getEvents(sort, numberCurrentPage, numberSizePage));
    },[dispatch, sort, numberCurrentPage, numberSizePage]);

    const registerHandler = object => {
        const newObject = {
            ...object,
            id: eventId,
        };
        dispatch(registerClient(newObject));
    }

    function getUsers() {
        return events?.find(elem => elem._id === eventId)?.users;
    }

    return (
        <>
            <div className="app-container">
                <Switch>
                    <Route exact path="/">
                        <Home
                            events={events}
                            dispatch={dispatch}
                            setEventId={setEventId}
                            sort={sort}
                            setSort={setSort}
                        />
                    </Route>
                    <Route path="/register">
                        <Register registerHandler={registerHandler}/>
                    </Route>
                    <Route path="/view">
                        <View users={getUsers()}/>
                    </Route>
                    <Redirect to={'/'} />
                </Switch>
                {[1,2,3,4,5].map(elem => {
                    return (
                        <div
                            className={currentPage === elem ? 'current-page' : 'page'}
                            onClick={() => {setCurrentPage(elem)}}
                        >
                            {elem}
                        </div>
                    );
                })}
                {<select
                    value={sizePage}
                    onChange={e => setSizePage(e.target.value)}
                >
                    <option value={"2"} >{2}</option>
                    <option value={"5"}>{5}</option>
                    <option value={"7"}>{7}</option>
                    <option value={"10"}>{10}</option>
                </select>}
            </div>
        </>
    );
}

export default App;

import React from 'react';
import moment from "moment";
import {NavLink} from "react-router-dom";

const View = ({ users }) => {
    return (
        <>
            <NavLink className="button" to="/">
                На головну
            </NavLink>
            <div className="view-page">
                {users?.length > 0 && users?.map((elem) => (
                        <div className="view-item" key={elem.fullName}>
                            <div className="fullname">Fullname: {elem?.fullname}</div>
                            <div className="email">Email: {elem?.email}</div>
                            <div className="birthday">Birthday: {moment(elem?.birthday).format("DD MMM YYYY")}</div>
                        </div>
                    )
                )}
            </div>
        </>
    )
        ;
};

export default View;
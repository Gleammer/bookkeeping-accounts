import React from "react";
import { Link } from 'react-router-dom';

const Account = (props) => {
    return <div>
        <h4><Link to={props.id}><b>{props.code}</b> {props.name}</Link></h4>
    </div>;
};

export default Account;

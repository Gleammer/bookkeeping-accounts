import React from "react";
import { Link } from "react-router-dom";

const Account = (props) => {
    return (
        <div>
            <h5>
                <Link to={props.id}>
                    <b>{props.code}</b> {props.name}
                </Link>
            </h5>
        </div>
    );
};

export default Account;

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "react-bootstrap-icons";

const Rule = (props) => {
    return (
        <div>
            <h6>
                <Link to={"/rules/" + props.id}>
                    <b>
                        {props.creditCode} <ArrowRight /> {props.debitCode}
                    </b>
                     | condition: {props.condition}
                </Link>
            </h6>
        </div>
    );
};

export default Rule;

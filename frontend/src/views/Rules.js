import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
//import Rule from "../components/Rule";

const Accounts = () => {
    const [rules, setRules] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/v1.0/rules")
            .then((res) => res.data)
            .then((res) => setRules(res))
            .catch((err) => console.warn(err));
    }, []);

    return (
        <Container>
            <Row className="my-5">
                <Col>
                    <h1>List of Rules:</h1>
                    
                </Col>
            </Row>
        </Container>
    );
};

export default Accounts;

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/v1.0/accounts")
            .then((res) => console.log(res))
            .catch((err) => console.warn(err));
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>This is Accounts page!</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Accounts;

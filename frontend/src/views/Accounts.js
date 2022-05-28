import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Account from "../components/Account";

const Accounts = () => {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/v1.0/accounts")
            .then((res) => res.data)
            .then((res) => setAccounts(res))
            .catch((err) => console.warn(err));
    }, []);

    return (
        <Container>
            <Row className="my-5">
                <Col>
                    <h1>List of Accounts:</h1>
                    {accounts.map((account) => (
                        <Account
                            key={account._id}
                            id={account._id}
                            code={account.code}
                            name={account.name}
                        />
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default Accounts;

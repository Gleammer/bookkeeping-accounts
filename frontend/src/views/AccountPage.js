import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const AccountPage = () => {
    let { id } = useParams();
    const [data, setData] = useState({
        _id: undefined,
        code: undefined,
        name: undefined,
    });
    const [debitRules, setDebitRules] = useState([]);
    const [creditRules, setCreditRules] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/v1.0/accounts/${id}`)
            .then((res) => res.data)
            .then((res) => setData(res))
            .catch((err) => console.warn(err));
    }, []);

    return (
        <Container>
            <Row>
                <Col>
                    <h2>
                        <b>{data.code}</b> {data.name}
                    </h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h6>List of Rules as Debit Account (assets in)</h6>
                </Col>
                <Col>
                    <h6>List of Rules as Credit Account (assets out)</h6>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountPage;

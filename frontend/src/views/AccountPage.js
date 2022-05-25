import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import Rule from "../components/Rule";

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

        axios
            .get(`http://localhost:5000/api/v1.0/rules?debitCode=${id}`)
            .then((res) => res.data)
            .then((res) => setDebitRules(res))
            .catch((err) => console.warn(err));

        axios
            .get(`http://localhost:5000/api/v1.0/rules?creditCode=${id}`)
            .then((res) => res.data)
            .then((res) => setCreditRules(res))
            .catch((err) => console.warn(err));
    }, []);

    return (
        <Container>
            <Row className="my-5">
                <Col>
                    <h2>
                        <b>{data.code}</b> {data.name}
                    </h2>
                </Col>
            </Row>
            <Row className="mb-5">
                <Col>
                    <h6>List of Rules as Debit Account (assets in)</h6>
                    <ul>
                        {debitRules.map((rule) => (
                            <li key={rule._id}>
                                <Rule
                                    id={rule._id}
                                    debitCode={rule.debitCode.code}
                                    creditCode={rule.creditCode.code}
                                    condition={rule.condition}
                                />
                            </li>
                        ))}
                    </ul>
                </Col>
                <Col>
                    <h6>List of Rules as Credit Account (assets out)</h6>
                    <ul>
                        {creditRules.map((rule) => (
                            <li  key={rule._id}>
                                <Rule
                                    id={rule._id}
                                    debitCode={rule.debitCode.code}
                                    creditCode={rule.creditCode.code}
                                    condition={rule.condition}
                                />
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

export default AccountPage;

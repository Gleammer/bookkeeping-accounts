import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Rule from "../components/Rule";
import RuleForm from "../components/RuleForm";

const Accounts = () => {
    const [rules, setRules] = useState([]);
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        let endpoints = [
            "http://localhost:5000/api/v1.0/rules",
            "http://localhost:5000/api/v1.0/accounts",
        ];

        Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
            ([{ data: rules }, { data: accounts }]) => {
                setRules(rules);
                setAccounts(accounts);
            }
        );
    }, []); //make initial requests

    const onSubmit = (data) => {
        console.log(data);
        axios
            .post("http://localhost:5000/api/v1.0/rules", data)
            .then((res) => console.log(res))
            .catch((err) => console.warn(err));
    };

    return (
        <Container>
            <Row className="my-5">
                {/* List Rules */}
                <Col>
                    <h1>List of Rules:</h1>
                    {rules.length === 0 ? (
                        <p>No rules found!</p>
                    ) : (
                        rules.map((rule) => (
                            <Rule
                                key={rule._id}
                                id={rule._id}
                                creditCode={rule.creditCode.code}
                                debitCode={rule.debitCode.code}
                                condition={rule.condition}
                            />
                        ))
                    )}
                </Col>
                {/* Create Rule */}
                <Col>
                    <p>Create rule:</p>
                    {accounts.length && (
                        <RuleForm
                            accounts={accounts}
                            submitHandler={onSubmit}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Accounts;

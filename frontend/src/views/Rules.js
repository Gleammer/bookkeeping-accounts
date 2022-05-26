import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import axios from "axios";
import Rule from "../components/Rule";

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
    }, []);

    const handleChange = (e) => {
        console.log(e);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Container>
            <Row className="my-5">
                <Col>
                    <h1>List of Rules:</h1>
                    {rules.length === 0 ? (
                        <p>No rules found!</p>
                    ) : (
                        rules.map((rule) => (
                            <Rule
                                key={rule._id}
                                id={rule._id}
                                debitCode={rule.debitCode}
                                creditCode={rule.creditCode}
                                condition={rule.condition}
                            />
                        ))
                    )}
                </Col>
                <Col>
                    <p>Create rule:</p>
                    <form>
                        <select onChange={handleChange}>
                            {accounts.map((account) => (
                                <option value={account.code}>
                                    {account.code}
                                </option>
                            ))}
                        </select>{" "}
                        <ArrowRight />{" "}
                        <select onChange={handleChange}>
                            {accounts.map((account) => (
                                <option value={account.code}>
                                    {account.code}
                                </option>
                            ))}
                        </select>
                        <br />
                        <input type="text" placeholder="Condition" />
                        <button onClick={handleSubmit}>Create Rule</button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Accounts;

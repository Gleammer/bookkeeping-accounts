import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import Rule from "../components/Rule";

const Accounts = () => {
    const [rules, setRules] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const { register, handleSubmit } = useForm();

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

    const onSubmit = (data) => {
        console.log(data);
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
                                debitCode={rule.debitCode}
                                creditCode={rule.creditCode}
                                condition={rule.condition}
                            />
                        ))
                    )}
                </Col>
                {/* Create Rule */}
                <Col>
                    <p>Create rule:</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <select {...register("creditCode", { required: true })}>
                            <option disabled selected value>
                                -- Credit --
                            </option>
                            {accounts.map((account) => (
                                <option value={account.code}>
                                    {account.code}
                                </option>
                            ))}
                        </select>{" "}
                        <ArrowRight />{" "}
                        <select {...register("debitCode", { required: true })}>
                            <option disabled selected value>
                                -- Debit --
                            </option>
                            {accounts.map((account) => (
                                <option value={account.code}>
                                    {account.code}
                                </option>
                            ))}
                        </select>
                        <br />
                        <br />
                        <input
                            type="text"
                            placeholder="Condition"
                            {...register("condition", { required: true })}
                        />
                        <button type="submit">Create Rule</button>
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Accounts;

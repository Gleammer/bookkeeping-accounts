import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Rule from "../components/Rule";
import RuleForm from "../components/RuleForm";
import { ArrowRight } from "react-bootstrap-icons";

const Accounts = () => {
    const [rules, setRules] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [query, setQuery] = useState({
        creditCode: null,
        debitCode: null,
    });

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

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/v1.0/rules", { params: query })
            .then((res) => res.data)
            .then((res) => setRules(res))
            .catch((err) => console.warn(err));
    }, [query]);

    const onSubmit = (data) => {
        //console.log(data);
        axios
            .post("http://localhost:5000/api/v1.0/rules", data)
            .then((res) => console.log(res))
            .catch((err) => console.warn(err));
    };

    const handleChange = (event) => {
        //console.log(event);
        setQuery({
            ...query,
            [event.target.name]: event.target.value.length
                ? event.target.value
                : null,
        });
    };

    return (
        <Container>
            <Row className="my-5">
                {/* List Rules */}
                <Col>
                    <h1>List of Rules:</h1>
                    <div className="wrapper">
                        <p>Filter rules by Account codes:</p>
                        <select
                        id="creditCode"
                            name="creditCode"
                            defaultValue={null}
                            onChange={handleChange}
                            value={query.creditCode || undefined}
                        >
                            <option value="">--- Credit ---</option>
                            {accounts.map((account) => (
                                <option key={account._id} value={account._id}>
                                    {account.code}
                                </option>
                            ))}
                        </select>{" "}
                        <ArrowRight />{" "}
                        <select
                            name="debitCode"
                            defaultValue={null}
                            onChange={handleChange}
                            value={query.debitCode || undefined}
                        >
                            <option value="">--- Debit ---</option>
                            {accounts.map((account) => (
                                <option key={account._id} value={account._id}>
                                    {account.code}
                                </option>
                            ))}
                        </select>
                    </div>
                    <br />
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

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "react-bootstrap-icons";
import axios from "axios";
import RuleForm from "../components/RuleForm";

const RulePage = () => {
    let { id } = useParams();
    const [data, setData] = useState();
    const [accounts, setAccounts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let endpoints = [
            `http://localhost:5000/api/v1.0/rules/${id}`,
            "http://localhost:5000/api/v1.0/accounts",
        ];

        Promise.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
            ([{ data: rule }, { data: accounts }]) => {
                setData(rule);
                setAccounts(accounts);
            }
        );
    }, [id]);

    const getNewData = () => {
        axios
            .get(`http://localhost:5000/api/v1.0/rules/${id}`)
            .then((res) => res.data)
            .then((res) => setData(res))
            .catch((err) => console.warn(err));
    };

    const onSubmit = (data) => {
        console.log(data);
        axios
            .put(`http://localhost:5000/api/v1.0/rules/${id}`, data)
            .then((res) => {
                console.log(res);
                getNewData();
            })
            .catch((err) => console.warn(err));
    };

    const deleteRule = () => {
        let text = "Delete Rule?";
        if (window.confirm(text)) {
            axios
                .delete(`http://localhost:5000/api/v1.0/rules/${id}`)
                .then((res) => {
                    console.log(res);
                    navigate("/rules/");
                })
                .catch((err) => console.warm(err));
        }
    };

    return (
        <Container>
            <Row className="my-5">
                <Col>
                    {data && (
                        <>
                            <h2>
                                <Link to={"/accounts/" + data.creditCode._id}>
                                    {data.creditCode.code}
                                </Link>
                                <ArrowRight />
                                <Link to={"/accounts/" + data.debitCode._id}>
                                    {data.debitCode.code}
                                </Link>
                            </h2>
                            <h5>{data.condition}</h5>
                        </>
                    )}
                </Col>
            </Row>
            <Row className="mb-5">
                <Col>
                    {data && (
                        <>
                            <p>Data about Accounts:</p>
                            <Row>
                                <Col>
                                    <p>
                                        <b>Credit Account:</b>
                                        <br />
                                        Code: {data.creditCode.code}
                                        <br />
                                        Name: {data.creditCode.name}
                                    </p>
                                </Col>
                                <Col>
                                    <p>
                                        <b>Debit Account:</b>
                                        <br />
                                        Code: {data.debitCode.code}
                                        <br />
                                        Name: {data.debitCode.name}
                                    </p>
                                </Col>
                            </Row>
                        </>
                    )}
                </Col>
            </Row>
            <Row className="my-5">
                <hr />
                <Col>
                    {accounts.length && (
                        <RuleForm
                            accounts={accounts}
                            submitHandler={onSubmit}
                            buttonText={"Update Rule"}
                        />
                    )}
                </Col>
                <Col>
                    <button className="btn btn-danger" onClick={deleteRule}>
                        Delete Rule
                    </button>
                </Col>
            </Row>
        </Container>
    );
};

export default RulePage;

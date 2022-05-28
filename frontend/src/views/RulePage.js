import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { ArrowRight } from "react-bootstrap-icons";
import axios from "axios";

const RulePage = () => {
    let { id } = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/v1.0/rules/${id}`)
            .then((res) => res.data)
            .then((res) => setData(res))
            .catch((err) => console.warn(err));
    }, [id]);

    return (
        <Container>
            <Row className="my-5">
                <Col>
                    {data && (
                        <h2>
                            {data.creditCode.code} <ArrowRight />{" "}
                            {data.debitCode.code} | data.condition
                        </h2>
                    )}
                </Col>
            </Row>
            <Row className="mb-5">
                <Col></Col>
            </Row>
        </Container>
    );
};

export default RulePage;

import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRight } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";
import axios from "axios";
import Rule from "../components/Rule";

const Accounts = () => {
    const [rules, setRules] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const {
        register,
        handleSubmit,
        getValues,
        formState,
        formState: { errors },
    } = useForm({
        defaultValues: {
            creditCode: null,
            debitCode: null,
            condition: "",
        },
    });

    const validateDifference = () => {
        return getValues("creditCode") !== getValues("debitCode");
    };

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <select
                            name="creditCode"
                            {...register("creditCode", {
                                required: true,
                                validate: validateDifference,
                            })}
                            defaultValue={null}
                            disabled={formState.isSubmitting}
                        >
                            <option disabled value>
                                -- Credit --
                            </option>
                            {accounts.map((account) => (
                                <option key={account._id} value={account._id}>
                                    {account.code}
                                </option>
                            ))}
                        </select>{" "}
                        <ArrowRight />{" "}
                        <select
                            name="debitCode"
                            {...register("debitCode", { required: true })}
                            defaultValue={null}
                            disabled={formState.isSubmitting}
                        >
                            <option disabled value>
                                -- Debit --
                            </option>
                            {accounts.map((account) => (
                                <option key={account._id} value={account._id}>
                                    {account.code}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Condition"
                            className="form-control my-2 mr-1"
                            {...register("condition", { required: true })}
                            disabled={formState.isSubmitting}
                        />
                        <button type="submit" class="btn btn-primary">
                            Create Rule
                        </button>
                        {errors.creditCode &&
                            errors.creditCode.type === "validate" && (
                                <div className="error">
                                    Credit code and Debit code should be
                                    different
                                </div>
                            )}
                        {formState.isSubmitted && (
                            <div className="success">
                                Form submitted successfully
                            </div>
                        )}
                    </form>
                </Col>
            </Row>
        </Container>
    );
};

export default Accounts;

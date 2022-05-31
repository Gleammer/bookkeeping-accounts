import React, { useState } from "react";
import { ArrowRight } from "react-bootstrap-icons";
import { useForm } from "react-hook-form";

const RuleForm = (props) => {
    const [accounts, setAccounts] = useState(props.accounts);
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

    return (
        <form onSubmit={handleSubmit(props.submitHandler)}>
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
            <button type="submit" className="btn btn-primary">
                Create Rule
            </button>
            {errors.creditCode && errors.creditCode.type === "validate" && (
                <div className="error">
                    Credit code and Debit code should be different
                </div>
            )}
            {formState.isSubmitted && (
                <div className="success">Form submitted successfully</div>
            )}
        </form>
    );
};

export default RuleForm;

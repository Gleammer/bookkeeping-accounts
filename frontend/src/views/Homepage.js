import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CSVReader from "react-csv-reader";
import axios from "axios";

const Homepage = () => {
    const [data, setData] = useState([]);
    const [response, setResponse] = useState([]);
    const [file, setFile] = useState();

    const handleUpload = (fileData, fileInfo) => {
        setData(fileData.map((elem) => ({ code: elem[0], name: elem[1] })));
        setFile(fileInfo);
    };

    const handleImport = () => {
        Promise.allSettled(
            data.map((account) =>
                axios.post(`http://localhost:5000/api/v1.0/accounts`, account)
            )
        ).then((res) => setResponse(res));
    };

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h1>This is Homepage!</h1>
                    <hr />
                    <h4>Import CSV file:</h4>
                    <CSVReader
                        onFileLoaded={(fileData, fileInfo, originalFile) =>
                            handleUpload(fileData, fileInfo)
                        }
                    />
                    {data.length ? (
                        <>
                            <br />
                            <h6>File name: {file.name}</h6>
                            <p>The imported file has {data.length} lines</p>
                            <button onClick={handleImport}>
                                Import Accounts
                            </button>
                            <div className="import-response">
                                {response.length !== 0 ? (
                                    <>
                                        <br />
                                        <p>
                                            Successful:{" "}
                                            {
                                                response.filter(
                                                    (elem) =>
                                                        elem.status !==
                                                        "rejected"
                                                ).length
                                            }
                                        </p>
                                        <p>
                                            Rejected:{" "}
                                            {
                                                response.filter(
                                                    (elem) =>
                                                        elem.status ===
                                                        "rejected"
                                                ).length
                                            }
                                        </p>
                                    </>
                                ) : null}
                            </div>
                        </>
                    ) : null}
                </Col>
            </Row>
        </Container>
    );
};

export default Homepage;

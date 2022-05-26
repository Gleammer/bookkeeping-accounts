import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CSVReader from "react-csv-reader";
import axios from "axios";

const Homepage = () => {
    const [data, setData] = useState([]);
    const [file, setFile] = useState();

    const handleUpload = (fileData, fileInfo) => {
        setData(fileData.map((elem) => ({ code: elem[0], name: elem[1] })));
        setFile(fileInfo);
    };

    const handleImport = async () => {
        //data.map((account) => console.log(account));

        const res = await Promise.allSettled(data.map(account => axios.post(`http://localhost:5000/api/v1.0/accounts`, account)))
        console.log(res)
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
                            <p>The imported file has {data.length} elements</p>
                            <button onClick={handleImport}>
                                Import Accounts
                            </button>
                        </>
                    ) : null}
                </Col>
            </Row>
        </Container>
    );
};

export default Homepage;

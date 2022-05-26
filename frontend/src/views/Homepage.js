import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CSVReader from "react-csv-reader";

const Homepage = () => {
    const [data, setData] = useState([]);
    const [file, setFile] = useState();

    const handleUpload = (data, fileInfo) => {
        setData(data);
        setFile(fileInfo);
    };

    const handleImport = () => {
        console.log(file)
    }

    return (
        <Container className="my-5">
            <Row>
                <Col>
                    <h1>This is Homepage!</h1>
                    <hr />
                    <h4>Import CSV file:</h4>
                    <CSVReader
                        onFileLoaded={(data, fileInfo, originalFile) =>
                            handleUpload(data, fileInfo)
                        }
                    />
                    {data.length ? (
                        <>
                            <br/>
                            <h6>File name: {file.name}</h6>
                            <p>The imported file has {data.length} elements</p>
                            <button onClick={handleImport}>Import Accounts</button>
                        </>
                    ) : null}
                </Col>
            </Row>
        </Container>
    );
};

export default Homepage;

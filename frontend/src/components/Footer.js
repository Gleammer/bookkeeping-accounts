import { Navbar, Container } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";

const Footer = () => {
    return (
        <Navbar bg="dark">
            <Container>
                <a
                    href="https://github.com/Gleammer/bookkeeping-accounts"
                    className="text-light"
                    target="_blank"
                >
                    <Github /> See source code
                </a>
            </Container>
        </Navbar>
    );
};

export default Footer;

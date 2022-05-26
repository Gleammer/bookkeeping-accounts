import { Navbar, Container } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";

const Footer = () => {
    return (
        <Navbar bg="dark">
            <Container>
                <a href="#" className="text-light">
                    <Github /> See source code
                </a>
            </Container>
        </Navbar>
    );
};

export default Footer;

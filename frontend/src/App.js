import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./views/Homepage";
import Accounts from "./views/Accounts";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/rules" element={<Homepage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;

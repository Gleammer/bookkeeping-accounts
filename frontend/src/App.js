import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "./views/Homepage";
import Accounts from "./views/Accounts";
import AccountPage from "./views/AccountPage";
import Rules from "./views/Rules";
import RulePage from "./views/RulePage";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/accounts/:id" element={<AccountPage />} />
                <Route path="/rules" element={<Rules />} />
                <Route path="/rules/:id" element={<RulePage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import User from "./pages/User";
import Error from "./pages/Error";
import "./designs/css/main.css";


const App = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/User" element={<User />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
       
    );
};

export default App;
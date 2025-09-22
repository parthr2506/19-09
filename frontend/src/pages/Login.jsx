import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

import { useAuth } from "../useAuth"; // Update this import

const Login = () => {
    const { setIsAuthenticated, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [message, setMessage] = useState("")
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/login", form, { withCredentials: true });
            // alert("Login Success");
            setMessage("Login Successfull Redirecting....")
            setIsAuthenticated(true);
            navigate("/home", { replace: true });
        } catch (err) {
            console.error(err);
            // alert("Login Failed. Check your credentials.");
            setMessage("Invalid Credentials! Try Again")
        }
    };
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label htmlFor="email">Email:</label>
            <br />
            <input name="email" placeholder="email" onChange={handleChange} />
            <br /><br />
            <label htmlFor="password">Password:</label>
            <br />
            <input type="password" name="password" placeholder="password" onChange={handleChange} />
            <br /><br />
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Login;

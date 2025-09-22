import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";
import { useAuth } from "../useAuth";

const Signup = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("")
    const { isAuthenticated } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/home", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/signup', formData);
            // alert("record entered successfully");
            setMessage("SignUp Successefull Redirecting....")
            setFormData({ name: '', email: '', password: '' });
            navigate("/login");

        } catch (error) {
            console.error('Error:', error);
            const errorMessage = error.response?.data?.message || error.message || "Network Error";
            // alert(`Error: ${errorMessage}`);
            setMessage("Signup Failed Try Again")
        }
    };

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>SignUp</h2>
            <label htmlFor="name">Name:</label>
            <br />
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
            <br /><br />
            <label htmlFor="email">Email:</label>
            <br />
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            <br /><br />

            <label htmlFor="password">Password:</label>
            <br />
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            <br /><br />

            <button type="submit">Submit</button>
            {message && <p>{message}</p>}
        </form>

    );
};

export default Signup;

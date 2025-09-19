import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(form);
        try {
            const res = await axios.post("http://localhost:5000/api/login", form, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            localStorage.setItem("token", res.data.token)
            alert("Login Success");
            navigate("/home")


        } catch (err) {
            console.log(err)
            alert("Error: ", err);
        };

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
        </form>
    )
}

export default Login


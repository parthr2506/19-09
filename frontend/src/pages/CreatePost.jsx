import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        title: "",
        body: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Inside your CreatePost component
    // ...

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const slug = form.title.toLowerCase().replace(/\s+/g, '-');
        const token = localStorage.getItem("token");
        const authorId = JSON.parse(atob(token.split('.')[1])).id;

        try {
            const response = await axios.post(
                "http://localhost:5000/api/post/create",
                { ...form, slug }, // Add authorId to the request body
                {
                    headers: { Authorization: `BEARER ${token}` },
                    withCredentials: true
                }
            );

            if (response.status === 201) {
                setMessage("Post created successfully!");
                navigate("/home");
            }
        } catch (error) {
            // ...
        }
    };



    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="body">Body:</label>
                    <textarea
                        id="body"
                        name="body"
                        value={form.body}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit">Create Post</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreatePost;

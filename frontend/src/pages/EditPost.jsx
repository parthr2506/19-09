import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from './api';

const EditPost = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [form, setForm] = useState({ title: "", body: "" })
    const [message, setMessage] = useState("")

    useEffect(() => {
        const fetchPost = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await api.get(`/post/${id}`, {
                    headers: { Authorization: `BEARER ${token}` },
                    withCredentials: true
                });
                setForm({ title: response.data.title, body: response.data.body });
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        }
        fetchPost();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        const token = localStorage.getItem("token");

        try {
            const response = await api.put(
                `/post/update/${id}`,
                form,
                {
                    headers: { Authorization: `BEARER ${token}` },
                    withCredentials: true
                }
            );

            if (response.status === 200) {
                setMessage("Updates are successfully!");
                navigate("/home");
            }
        } catch (error) {
            console.error("Error editing post:", error);
            setMessage("Error editing post. Please try again.");
        }
    };

    return (
        <div className='card'>
            <h2>Edit Post</h2>
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
                <br></br>
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
                <button type="submit">Edit</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default EditPost;

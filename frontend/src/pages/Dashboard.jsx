
import { useState, useEffect } from "react";
import axios from "axios"
import { Link } from "react-router-dom";


const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }

        axios.get("http://localhost:5000/api/post/get")
            .then(res => setPosts(res.data))
            .catch(error => console.log("Error fetching posts:", error));

    }, []);

    return (
        <div>
            <h3>All Posts</h3>
            <Link to="/create-post">
                <button>Create a New Post</button>
            </Link>
            {posts.length > 0 ? (
                <div className="posts-container">
                    {posts.map(post => (
                        <div className="post-card" key={post.id}>
                            <h4>{post.title}</h4>
                            <p>{post.body}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    )
}
export default Dashboard;

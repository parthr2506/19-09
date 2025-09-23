import { useState, useEffect } from "react";
import api from "./api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [username, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();
    const fetchDashboardData = async () => {
        if (isAuthenticated === true) {
            try {
                const userRes = await api.get("/user", { withCredentials: true });
                setUserName(userRes.data.user.name);
                const postsRes = await api.get("/post/get", { withCredentials: true });
                setPosts(postsRes.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        } else if (isAuthenticated === false) {
            setLoading(false);
            navigate("/login", { replace: true });
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [isAuthenticated, navigate]);


    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (!token) {
            console.error("No token found. User not authenticated.");
            navigate("/login");
            return;
        }

        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await api.delete(`/post/delete/${id}`, {
                    headers: { Authorization: `BEARER ${token}` },
                    withCredentials: true
                });

                setPosts(posts.filter(post => post.id !== id));

            } catch (error) {
                console.error("Error while Deleting:", error);
            }
        }
    };
    const handleLogout = async () => {
        try {
            await api.get("/logout", { withCredentials: true });
            setIsAuthenticated(false);
            navigate("/login", { replace: true });
        } catch (error) {
            console.error("Error during logout:", error);
            setIsAuthenticated(false);
            navigate("/login", { replace: true });
        }
    };

    if (isAuthenticated === null || loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <h2>Welcome {username}</h2>
            <button style={{ margin: "20px" }} onClick={handleLogout}>Logout</button>
            <br></br>

            <Link to="/create-post">
                <button>Create a New Post</button>
            </Link>
            <h3>All Posts</h3>
            {posts.length > 0 ? (
                <div className="posts-container">
                    {posts.map(post => (
                        <div className="post-card" key={post.id}>
                            <h4>{post.title}</h4>
                            <p>{post.body}</p>
                            <button style={{ margin: '10px' }} onClick={() => navigate(`/edit-post/${post.id}`)}>Edit</button>
                            <button style={{ margin: '10px' }} onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No posts found.</p>
            )}
        </div>
    );
};

export default Dashboard;


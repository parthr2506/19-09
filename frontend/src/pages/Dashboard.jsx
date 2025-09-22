import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";

const Dashboard = () => {
    const [posts, setPosts] = useState([]);
    const [username, setUserName] = useState('');
    const [loading, setLoading] = useState(true);
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (isAuthenticated === true) {
                try {
                    const userRes = await axios.get("http://localhost:5000/api/user", { withCredentials: true });
                    setUserName(userRes.data.user.name);
                    const postsRes = await axios.get("http://localhost:5000/api/post/get", { withCredentials: true });
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
        fetchDashboardData();
    }, [isAuthenticated, navigate]);

    const handleLogout = async () => {
        try {
            await axios.get("http://localhost:5000/api/logout", { withCredentials: true });
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
        <div>
            <h2>Welcome {username}</h2>
            <button onClick={handleLogout}>Logout</button>
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
    );
};

export default Dashboard;

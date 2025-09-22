const prisma = require("../prisma/index");
const jwt = require("jsonwebtoken");

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "You are not logged in" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        });

        if (!req.user) {
            return res.status(401).json({ message: "token invalid or user not found" });
        }

        next();
    } catch (error) {
        console.error("isLoggedIn error:", error);
        return res.status(401).json({ message: "Authentication failed. Please log in again." });
    }
};

module.exports = isLoggedIn;

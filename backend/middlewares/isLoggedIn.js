const prisma = require("../prisma/index")

const jwt = require("jsonwebtoken")

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.send("Please Log In");
            throw new Error("You are not logged in");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await prisma.user.findUnique({
            where: {
                id: decoded.userId
            }
        })
        next();
    } catch (error) {
        throw new Error(error);

    }
}
module.exports = isLoggedIn;
const prisma = require("../prisma/index");
const cookieToken = require("../utils/cookieToken")
const bcrypt = require("bcrypt")

exports.signup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new Error("provide all fields")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })

        cookieToken(user, res)
    } catch (error) {
        console.error("Signup error:", error);
        if (error.code === 'P2002') {
            return res.status(409).json({ message: "Email exists" });
        }
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new Error("provide all fields")
        }

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (!user) {
            throw new Error("user not found")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Incorrect Password" });
        }
        // if (user.password !== password) {
        //     throw new Error("Incorrect Password")
        // }
        cookieToken(user, res)
    } catch (error) {
        throw new Error(error)
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("token")
        res.status(200).json({
            success: true
        })

    } catch (error) {
        throw new Error(error)
    }

}
exports.user = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        res.status(200).json({
            success: true,
            user: {
                name: req.user.name
            }
        });
    } catch (error) {
        next(error);
    }
};
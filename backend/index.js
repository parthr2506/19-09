const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require('cors');

require("dotenv").config();

const app = express();


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const userRouter = require("./routes/userRoutes")
const postRouter = require("./routes/postRoutes")

app.use("/api", userRouter)
app.use("/api", postRouter)


app.get("/", (req, res) => {
    res.send("Hello Form Backend")
})
app.listen(5000, () => {
    console.log("Listening on 5000...")
})
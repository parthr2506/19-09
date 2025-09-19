const express = require("express")
const router = express.Router();
const { createPost, updatePost, deletePost, getAllPosts } = require("../controllers/postControllers")
// const { isLoggedIn } = require("../middlewares/isLoggedIn")

router.route("/post/create").post(createPost)
router.route("/post/update/:id").put(updatePost)
router.route("/post/delete/:id").delete(deletePost)
router.route("/post/get").get(getAllPosts)

module.exports = router;
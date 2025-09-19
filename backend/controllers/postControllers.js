const prisma = require("../prisma/index");

exports.createPost = async (req, res, next) => {
    try {
        const { slug, title, body } = req.body;
        const authorId = req.user.id;

        if (!authorId) {
            return res.status(401).json({ message: "Unauthorized: Author ID missing." });
        }
        const result = await prisma.post.create({
            data: {
                slug,
                title,
                body,
                author: { connect: { id: authorId } }
            }

        });
        res.status(201).json(result);
    } catch (error) {
        console.error("Error creating post:", error);
        next(error);
    }
}

exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, body } = req.body

        const result = await prisma.post.update({
            where: { id: id },
            data: {
                title,
                body
            }
        })
        res.json(result)
    } catch (error) {
        console.error("Error updating post:", error);
        next(error);

    }
}

exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await prisma.post.delete({
            where: { id: id }
        })
        res.json(result)

    } catch (error) {
        console.error("Error deleting post:", error);
        next(error);

    }
}

exports.getAllPosts = async (req, res) => {
    try {
        const result = await prisma.post.findMany();
        res.json(result)

    } catch (error) {
        throw new Error(error)

    }
}
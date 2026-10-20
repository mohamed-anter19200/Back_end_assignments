import * as postsService from "./post.service.js";

export const addPost = async (req, res, next) => {
    try {
        const post = await postsService.addPost(req.body);

        return res.status(200).json({
            message: "Post created  successfully",
            data: post,
        });
    } catch (error) {
        next(error);
    }
}

export const removePost = async (req, res, next) => {
    try {
        await postsService.removePost(
            req.params.postId,
            req.body.userId
        );

        return res.status(200).json({
            message: "Post deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

export const getPostsDetails = async (req, res, next) => {
    try {
        const posts = await postsService.getPostsDetails();

        return res.status(200).json({
            data: posts,
        });
    } catch (error) {
        next(error);
    }
};

export const getPostsCommentCount = async (req, res, next) => {
    try {
        const posts = await postsService.getPostsCommentCount();

        return res.status(200).json({ data: posts });
    } catch (error) {
        next(error);
    }
};
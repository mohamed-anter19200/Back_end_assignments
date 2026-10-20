import * as commentsService from "./comments.service.js";
export const addComments = async (req, res, next) => {
    try {
        const comments = await commentsService.addComments(req.body);

        return res.status(201).json({
            message: "Comments created successfully",
            count: comments.length,
            data: comments,
        });
    } catch (error) {
        next(error);
    }
};

export const editComment = async (req, res, next) => {
    try {
        const { userId, content } = req.body;

        const comment = await commentsService.editComment(
            req.params.commentId,
            userId,
            content
        );

        return res.status(200).json({
            message: "Comment updated successfully",
            data: comment,
        });
    } catch (error) {
        next(error);
    }
};

export const findOrCreateComment = async (req, res, next) => {
    try {
        const [comment, created] =
            await commentsService.findOrCreateComment(req.body);

        return res.status(created ? 201 : 200).json({
            message: created
                ? "Comment created successfully"
                : "Comment already exists",
            created,
            data: comment,
        });
    } catch (error) {
        next(error);
    }
};

export const searchComments = async (req, res, next) => {
    try {
        const { count, rows } = await commentsService.searchComments(
            req.query.word
        );

        return res.status(200).json({
            count,
            data: rows,
        });
    } catch (error) {
        next(error);
    }
};

export const getRecentComments = async (req, res, next) => {
    try {
        const comments = await commentsService.getRecentComments(
            req.params.postId
        );

        return res.status(200).json({
            count: comments.length,
            data: comments,
        });
    } catch (error) {
        next(error);
    }
};

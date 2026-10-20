import { Op } from "sequelize";
import Comments from "./comments.model.js";

export const createComments = async (commentsData) => {
    return await Comments.bulkCreate(commentsData, {
        validate: true,
    });
};

export const getCommentById = async (commentId) => {
    return await Comments.findByPk(commentId);
};

export const updateComment = async (comment, content) => {
    comment.content = content;
    return await comment.save();
};

export const findOrCreateComment = async (commentData) => {
    return await Comments.findOrCreate({
        where: {
            postId: commentData.postId,
            userId: commentData.userId,
            content: commentData.content,
        },
        defaults: commentData,
    });
};

export const searchComments = async (word) => {
    return await Comments.findAndCountAll({
        where: {
            content: {
                [Op.like]: `%${word}%`,
            },
        },
        order: [["createdAt", "DESC"]],
    });
};

export const getRecentComments = async (postId) => {
    return await Comments.findAll({
        where: { postId },
        order: [["createdAt", "DESC"]],
        limit: 3,
    });
};

import * as commentsRepository from "./comments.repository.js";
import * as postsRepository from "../posts/posts.repository.js";
import * as usersRepository from "../users/users.repository.js";

const createError = (message, statusCode) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

const isValidId = (id) =>
    Number.isInteger(Number(id)) && Number(id) > 0;

const validateCommentRelations = async (postId, userId) => {
    if (!isValidId(postId) || !isValidId(userId)) {
        throw createError("Valid postId and userId are required", 400);
    }

    const post = await postsRepository.getPost(Number(postId));

    if (!post) {
        throw createError(`Post ${postId} not found`, 404);
    }

    const user = await usersRepository.findById(Number(userId));

    if (!user) {
        throw createError(`User ${userId} not found`, 404);
    }
};

export const addComments = async (commentsData) => {
    if (!Array.isArray(commentsData) || commentsData.length === 0) {
        throw createError(
            "Provide a non-empty array of comments",
            400
        );
    }

    for (const comment of commentsData) {
        if (
            typeof comment.content !== "string" ||
            !comment.content.trim()
        ) {
            throw createError("Comment content is required", 400);
        }

        await validateCommentRelations(
            comment.postId,
            comment.userId
        );
    }

    const cleanComments = commentsData.map((comment) => ({
        content: comment.content.trim(),
        postId: Number(comment.postId),
        userId: Number(comment.userId),
    }));

    return await commentsRepository.createComments(cleanComments);
};

export const editComment = async (commentId, userId, content) => {
    if (!isValidId(commentId)) {
        throw createError("Invalid commentId", 400);
    }

    if (!isValidId(userId)) {
        throw createError("Valid userId is required", 400);
    }

    if (typeof content !== "string" || !content.trim()) {
        throw createError("Content is required", 400);
    }

    const comment = await commentsRepository.getCommentById(
        Number(commentId)
    );

    if (!comment) {
        throw createError("Comment not found", 404);
    }

    if (Number(comment.userId) !== Number(userId)) {
        throw createError(
            "You are not allowed to update this comment",
            403
        );
    }

    return await commentsRepository.updateComment(
        comment,
        content.trim()
    );
};

export const findOrCreateComment = async (commentData) => {
    const { postId, userId, content } = commentData;

    if (typeof content !== "string" || !content.trim()) {
        throw createError("Content is required", 400);
    }

    await validateCommentRelations(postId, userId);

    return await commentsRepository.findOrCreateComment({
        postId: Number(postId),
        userId: Number(userId),
        content: content.trim(),
    });
};

export const searchComments = async (word) => {
    if (typeof word !== "string" || !word.trim()) {
        throw createError("Search word is required", 400);
    }

    return await commentsRepository.searchComments(word.trim());
};

export const getRecentComments = async (postId) => {
    if (!isValidId(postId)) {
        throw createError("Valid postId is required", 400);
    }

    const post = await postsRepository.getPost(Number(postId));

    if (!post) {
        throw createError("Post not found", 404);
    }

    return await commentsRepository.getRecentComments(Number(postId));
};

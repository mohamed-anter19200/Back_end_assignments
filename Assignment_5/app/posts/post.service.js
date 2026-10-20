import * as usersRepository from "../users/users.repository.js";
import * as postRepository from "./posts.repository.js";
export const addPost = async (postData) => {
    if (!postData.title || !postData.content || !postData.userId) {
        const error = new Error("Title, content and userId are required");
        error.statusCode = 400;
        throw error;
    }

    const user = await usersRepository.findById(Number(postData.userId));

    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    return postRepository.createPost(postData);
};


export const removePost = async (postId, userId) => {
    const post = await postRepository.getPost(postId);

    if (!post) {
        const error = new Error("Post not found");
        error.statusCode = 404;
        throw error;
    }

    if (Number(post.userId) !== Number(userId)) {
        const error = new Error("You are not allowed to delete this post");
        error.statusCode = 403;
        throw error;
    }

    return postRepository.removePost(post);
};

export const getPostsDetails = async () => {
    return await postRepository.getPostsDetails();
};

export const getPostsCommentCount = async () => {
    return await postRepository.getPostsCommentCount();
};
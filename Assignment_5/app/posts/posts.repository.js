import { fn, col } from "sequelize";
import Posts from "./posts.model.js";
import comments from "../comments/comments.model.js";
import users from "../users/users.model.js";

export const createPost = async (postData) => {
    return await Posts.create(postData);
};

export const getPost = async (postId) => {
    return await Posts.findByPk(postId);
};

export const removePost = async (post) => {
    return await post.destroy();
};

export const getPostsCommentCount = async () => {
    return await Posts.findAll({
        attributes: [
            "id",
            "title",
            [fn("COUNT", col("Comments.id")), "commentsCount"],
        ],
        include: [
            {
                model: Comments,
                attributes: [],
            },
        ],
        group: ["Posts.id"],
    });
};


export const getPostsDetails = async () => {
    return await Posts.findAll({
        attributes: ["id", "title"],
        include: [
            {
                model: users,
                attributes: ["id", "name"],
            },
            {
                model: comments,
                attributes: ["id", "content"],
            },
        ],
    });
};
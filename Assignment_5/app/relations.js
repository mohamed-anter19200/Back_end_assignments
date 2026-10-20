
import Users from "./users/users.model.js";
import Posts from "./posts/posts.model.js";
import Comments from "./comments/comments.model.js";

// Users ↔ Posts
Users.hasMany(Posts, { foreignKey: "userId" });
Posts.belongsTo(Users, { foreignKey: "userId" });

// Posts ↔ Comments
Posts.hasMany(Comments, { foreignKey: "postId" });
Comments.belongsTo(Posts, { foreignKey: "postId" });

// Users ↔ Comments
Users.hasMany(Comments, { foreignKey: "userId" });
Comments.belongsTo(Users, { foreignKey: "userId" });

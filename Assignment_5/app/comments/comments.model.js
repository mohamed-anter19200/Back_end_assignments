
import { Model, DataTypes } from "sequelize";
import sequelize from "../../common/db/connection.js";
class Comments extends Model {}

Comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Comments",
        tableName: "comments",
        timestamps: true,
    }
);

export default Comments;

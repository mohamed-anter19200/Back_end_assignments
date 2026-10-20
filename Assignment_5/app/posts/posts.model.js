import { Model, DataTypes } from "sequelize";
import sequelize from "../../common/db/connection.js";

class Posts extends Model {}

Posts.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
    },
    {
        sequelize,
        modelName: "posts",
        timestamps: true,
        paranoid: true,
    }
);

export default Posts;
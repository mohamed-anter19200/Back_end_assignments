import {Sequelize} from "sequelize";
const sequelize = new Sequelize('assignment_5', 'root', '', {
    host: 'localhost',
    dialect:  'mysql',
    paranoid: true,
});
export default sequelize;
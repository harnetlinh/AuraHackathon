import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.NAME_DB,process.env.USERNAME_DB, process.env.PASSWORD_DB, {
    host: process.env.HOST_DB,
    dialect: 'mariadb',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

export default sequelize;
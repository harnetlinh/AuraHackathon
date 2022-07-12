import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const apHO = new Sequelize(
    process.env.DB_NAME_HO,
    process.env.DB_USER_HO,
    process.env.DB_PASSWORD_HO,
    {
        host: process.env.DB_HOST_HO,
        dialect: 'mariadb',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    });
const apPH = new Sequelize(
    process.env.DB_NAME_PH,
    process.env.DB_USER_PH,
    process.env.DB_PASSWORD_PH,
    {
        host: process.env.DB_HOST_PH,
        dialect: 'mariadb',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    });
const apPD = new Sequelize(
    process.env.DB_NAME_PD,
    process.env.DB_USER_PD,
    process.env.DB_PASSWORD_PD,
    {
        host: process.env.DB_HOST_PD,
        dialect: 'mariadb',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    });
const apPK = new Sequelize(
    process.env.DB_NAME_PK,
    process.env.DB_USER_PK,
    process.env.DB_PASSWORD_PK,
    {
        host: process.env.DB_HOST_PK,
        dialect: 'mariadb',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    });
const apPS = new Sequelize(
    process.env.DB_NAME_PS,
    process.env.DB_USER_PS,
    process.env.DB_PASSWORD_PS,
    {
        host: process.env.DB_HOST_PS,
        dialect: 'mariadb',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    });
const apPC = new Sequelize(
    process.env.DB_NAME_PC,
    process.env.DB_USER_PC,
    process.env.DB_PASSWORD_PC,
    {
        host: process.env.DB_HOST_PC,
        dialect: 'mariadb',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    });

export { apPH, apHO, apPD, apPK, apPS, apPC };
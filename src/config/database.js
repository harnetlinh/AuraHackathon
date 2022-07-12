import knex from "knex";
import dotenv from "dotenv";
dotenv.config();

const apHO = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST_HO,
        port: 3306,
        user: process.env.DB_USER_HO,
        password: process.env.DB_PASSWORD_HO,
        database: process.env.DB_NAME_HO,
    },
    pool: { min: 0, max: 7 },
});

const apHN = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST_PH,
        port: 3306,
        user: process.env.DB_USER_PH,
        password: process.env.DB_PASSWORD_PH,
        database: process.env.DB_NAME_PH,
    },
    pool: { min: 0, max: 7 },
});

const apDN = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST_PD,
        port: 3306,
        user: process.env.DB_USER_PD,
        password: process.env.DB_PASSWORD_PD,
        database: process.env.DB_NAME_PD,
    },
    pool: { min: 0, max: 7 },
});

const apTN = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST_PK,
        port: 3306,
        user: process.env.DB_USER_PK,
        password: process.env.DB_PASSWORD_PK,
        database: process.env.DB_NAME_PK,
    },
    pool: { min: 0, max: 7 },
});


const apHCM = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST_PS,
        port: 3306,
        user: process.env.DB_USER_PS,
        password: process.env.DB_PASSWORD_PS,
        database: process.env.DB_NAME_PS,
    },
    pool: { min: 0, max: 7 },
});

const apCT = knex({
    client: "mysql",
    connection: {
        host: process.env.DB_HOST_PC,
        port: 3306,
        user: process.env.DB_USER_PC,
        password: process.env.DB_PASSWORD_PC,
        database: process.env.DB_NAME_PC,
    },
    pool: { min: 0, max: 7 },
});

export { apHN, apHO, apDN, apTN, apHCM, apCT };

import mysql, { Pool } from "mysql2";

const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE } = process.env;

const connection: Pool =  mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_DATABASE,
    connectTimeout: 0,
});

export default connection;

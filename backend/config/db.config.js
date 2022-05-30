module.exports = {
    HOST: process.env.DB_HOST,
    USER: process.env.DB_USER,
    PASSWORD: process.env.DB_PASSWORD,
    DB: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    pool: {
        max: 5, //Maximum number of connections in pool
        min: 0, //Minimum number of connections in pool
        acquire: 30000, // maximum time, in milliseconds, that a connection can be idle before being released
        idle: 10000, //minimum time, in milliseconds, that a connection can be idle before being released
    },
};
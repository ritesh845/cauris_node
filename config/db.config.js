
module.exports = {
    HOST: process.env.DB_HOST || "localhost",
    USER: process.env.DB_USER || "root",
    PORT:process.env.DB_PORT || "8888",
    PASSWORD:process.env.DB_PASSWORD || "",
    DB: process.env.DB_NAME || "cauris",
    dialect: "mysql",
    pool: {  //it's optional used for seqeulize connection
      max: 5, //maximum no of connection in pool
      min: 0,//minimum no of connection in pool
      acquire: 30000, //maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000 //maximum time, in milliseconds, that a connection can be idle before being released
    }
  };

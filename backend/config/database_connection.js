const { Pool } = require("pg");
const logger = require("../utils/logger");

let db;

try {
  db = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  db.connect((err, client, release) => {
    if (err) {
      logger.error("Database connection failed: " + err.message);
      console.error("DB Error:", err.message);
    } else {
      logger.info("Database connected successfully");
      console.log("DB Connected");
      release();
    }
  });
} catch (error) {
  logger.error("DB Init Error: " + error.message);
  console.error("DB Init Error:", error.message);
}

const query = async (text, params) => {
  try {
    const res = await db.query(text, params);
    return res;
  } catch (err) {
    logger.error("Query Error: " + err.message);
    throw err;
  }
};

module.exports = {
  db,
  query,
};
module.exports = db;

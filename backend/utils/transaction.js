const db = require("../config/database_connection");
const logger = require("./logger");

/**
 * Transaction Utility
 * @param {Function} callback - async function(client)
 * @param {Object} options - optional config
 */
const withTransaction = async (callback, options = {}) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    const result = await callback(client);

    await client.query("COMMIT");

    if (options.logSuccess) {
      logger.info("Transaction committed successfully");
    }

    return result;
  } catch (err) {
    await client.query("ROLLBACK");

    logger.error("Transaction rolled back", {
      error: err.message,
    });

    throw err;
  } finally {
    client.release();
  }
};

module.exports = withTransaction;

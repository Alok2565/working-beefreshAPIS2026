const requiredEnv = ["DB_HOST", "DB_USER", "DB_PASSWORD", "JWT_SECRET"];

requiredEnv.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

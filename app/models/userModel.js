const { connectionPool } = require('../../config/db');

const createUser = async (name, email, hashedPassword, provider = 'email') => {
  const result = await connectionPool.query(
    `INSERT INTO users (name,email, password, provider) 
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [name, email, hashedPassword, provider]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await connectionPool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
};
const db = require("../helpers/db.helper");

exports.getUsers = async (filter) => {
  try {

  const query = `
  SELECT * FROM "users"
  LIMIT $1
  OFFSET $2
  `;
    const values = [filter.limit, filter.offset];
  const { rows } = await db.query(query, values);

  return rows;
  } catch (err) {
    if (err) throw err;
  }
};

exports.getUserById = async (id) => {
  const query = `
SELECT * FROM "users" WHERE "id" = $1
  `;

  const value = [id];
  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.insert = async (data) => {
  const query = `
  INSERT INTO users ("email", "password") VALUES ($1, $2) RETURNING *
  `;
  const value = [data.email, data.password];

  const { rows } = await db.query(query, value);

  return rows;
};

exports.update = async (data, id) => {
  const query = `
  UPDATE "users"
  SET "email" = COALESCE(NULLIF($1, ''), "email"), "password" = COALESCE(NULLIF($2, ''), "password")
  WHERE "id" = $3 RETURNING *`;

  const value = [data.email, data.password, id];
  const { rows } = await db.query(query, value);
  return rows[0];
};

exports.deleteUsers = async (id) => {
  const query = `
  DELETE FROM "users"
  WHERE id = $1 RETURNING *
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};



const db = require("../helpers/db.helper");

exports.getUsers = async () => {
  const query = `
  SELECT * FROM "users"
  `;
  const { rows } = await db.query(query);

  return rows;
};

exports.getUserById = async (res) => {
  const query = `
SELECT * FROM "users" WHERE "id" = $1
  `;

  const value = [res.id];
  const { rows } = await db.query(query, value);

  return rows;
};

exports.insert = async (data) => {
  const query = `
  INSERT INTO users ("email", "password") VALUES ($1, $2) RETURNING *
  `;
  const value = [data.email, data.password];

  const { rows } = await db.query(query, value);

  return rows;
};

exports.update = async (data) => {
  const query = `
  UPDATE "users"
  SET "email" = COALESCE(NULLIF($1, ''), "email")
  WHERE "id" = $2 RETURNING *`;

  const value = [data.body.email, data.params.id];

  const { rows } = await db.query(query, value);
  return rows;
};

exports.deleteUsers = async (id) => {
  const query = 'DELETE FROM "users" WHERE id = $1 RETURNING *';
  const { rows } = await db.query(query, [id]);
  return rows;
};

const db = require("../helpers/db.helper");

exports.getUsers = async (filter) => {
  try {
    const query = `
    SELECT * FROM "users"
    WHERE "email" LIKE $3
    ORDER BY "${filter.sort}" ${filter.sortBy}
    LIMIT $1
    OFFSET $2
  `;
    const values = [filter.limit, filter.offset, `%${filter.search}%`];
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

exports.getUserByEmail = async (email) => {
  const query = `
SELECT * FROM "users" WHERE "email" = $1
  `;

  const value = [email];
  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.insert = async (data) => {

  const query = `
  INSERT INTO "users" ("userName", "email", "password") VALUES ($1, $2, $3) RETURNING *
  `;
  const value = [data.userName, data.email, data.password];
console.log(value)
  const { rows } = await db.query(query, value);
console.log(rows)
  return rows[0];
};

exports.update = async (data, id) => {
  const query = `
  UPDATE "users"
  SET "fullName" = COALESCE(NULLIF($1, ''), "userName"), "email" = COALESCE(NULLIF($2, ''), "email"), "password" = COALESCE(NULLIF($3, ''), "password")
  WHERE "id" = $4 RETURNING *`;

  const value = [data.userName, data.email, data.password, id];
  const { rows } = await db.query(query, value);
  return rows[0];
};

exports.updatePassword = async (password, id) => {
  const query = `
  UPDATE "users"
  SET "password" = COALESCE(NULLIF($1, ''), "password")
  WHERE "id" = $2 RETURNING *`;

  const value = [password, id];
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


exports.getUserByFingerprint = async (fingerprint) => {
  const query = `
SELECT * FROM "users" WHERE "fingerprint" = $1
  `;

  const value = [fingerprint];
  const { rows } = await db.query(query, value);

  return rows[0];
};

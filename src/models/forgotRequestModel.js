const db = require("../helpers/db.helper");

exports.getRequestByEmailAndCode = async (code, email) => {
  try {
    const query = `
    SELECT * FROM "forgotRequest"
    WHERE "code" = $1 AND "email" =$2
  `;

    const values = [code, email];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.insert = async (data) => {
  const query = `
  INSERT INTO "forgotRequest" ("email", "code") VALUES ($1, $2) RETURNING *
  `;
  const value = [data.email, data.code];

  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.update = async (data, id) => {
  const query = `
  UPDATE "forgotRequest"
  SET "email" = COALESCE(NULLIF($1, ''), "email"), "code" = COALESCE(NULLIF($2, ''), "code")
  WHERE "id" = $3 RETURNING *`;

  const value = [data.email, data.code, id];
  const { rows } = await db.query(query, value);
  return rows[0];
};

// exports.updatePassword = async (password, id) => {
//   const query = `
//   UPDATE "forgotRequest"
//   SET "password" = COALESCE(NULLIF($1, ''), "password")
//   WHERE "id" = $2 RETURNING *`;

//   const value = [password, id];
//   const { rows } = await db.query(query, value);
//   return rows[0];
// };

exports.delete = async (id) => {
  const query = `
  DELETE FROM "forgotRequest"
  WHERE id = $1 RETURNING *
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

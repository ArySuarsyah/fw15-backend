const db = require("../helpers/db.helper");

exports.getResetPasswordVerify = async (email, code) => {
  const sql = 'SELECT * FROM "resetPassword" WHERE email = $1 AND code = $2';
  const values = [email, code];

  const { rows } = await db.query(sql, values);
  return rows;
};

exports.createResetPassword = async (data) => {
  const sql =
    'INSERT INTO "resetPassword" ("email", "userId", "code", "password", "confirmPassword") VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [
    data.email,
    data.userId,
    data.code,
    data.password,
    data.confirmPassword,
  ];

  const { rows } = await db.query(sql, values);
  return rows;
};

exports.updateResetPassword = async (data) => {
  const sql = `UPDATE "resetPassword" "email" = COALESCE(NULLIF($1, ''), "email"), "userId" = COALESCE(NULLIF($2, '')::INTEGER, "userId"), "code" = COALESCE(NULLIF($3, ''), "code"), password = COALESCE(NULLIF($4, ''), "password"), confirmPassword = COALESCE(NULLIF($5, ''), "confirmPassword") WHERE "id" = $6 RETURNING *`;
  const values = [
    data.body.email,
    data.body.userId,
    data.body.code,
    data.params.id,
  ];

  const { rows } = await db.query(sql, values);
  return rows
};

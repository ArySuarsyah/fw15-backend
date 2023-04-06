const db = require('../helpers/db.helper')


exports.getUsers = (call) => {
  const sql = 'SELECT * FROM "users"';
  db.query(sql, call);
};


exports.getUserById = (res, call) => {
  const sql = 'SELECT * FROM "users" WHERE "id" = $1';
  const value = [res.id];
  db.query(sql, value, call);
};


exports.register = (data, call) => {
  const sql =
    'INSERT INTO users ("email", "password") VALUES ($1, $2) RETURNING *';
  const value = [
    data.email,
    data.password,
  ];

  db.query(sql, value, call);
};



exports.updateUsers = (data, call) => {
  const sql = `UPDATE "users" SET "email" = COALESCE(NULLIF($1, ''), "email") WHERE "id" = $2 RETURNING *`;
  const value = [
    data.body.email,
    data.params.id,
  ];

  db.query(sql, value, call);
};
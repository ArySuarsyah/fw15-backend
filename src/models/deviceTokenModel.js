const db = require("../helpers/db.helper");
const table = "deviceToken";

exports.insertToken = async (id, data) => {
  try {
    const query = `
    INSERT INTO "${table}" ("token", "userId")
    VALUES ($1, $2)
    RETURNING *
  `;
    const values = [data.token, id];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.getToken = async (page, limit, sort, sortBy) => {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 5;
  sort = sort || "id";
  sortBy = sortBy || "ASC";

  const offset = (page - 1) * limit;
  try {
    const query = `
    SELECT * FROM "${table}"
    ORDER BY "${sort}" ${sortBy}
    LIMIT $1
    OFFSET $2
  `;
    const values = [limit, offset];
    const { rows } = await db.query(query, values);
    return rows;
  } catch (err) {
    if (err) throw err;
  }
};

exports.findOneByToken = async (token) => {
  try {
    const query = `
    SELECT * FROM "${table}"
    WHERE token = $1
  `;
    const values = [token];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.updateUserIdByToken = async (token, id) => {
  try {
    const query = `
    UPDATE "${table}"
    SET "userId" = $2
    WHERE token = $1
  `;
    const values = [token, id];
    const { rows } = await db.query(query, values);
    return rows;
  } catch (err) {
    if (err) throw err;
  }
};

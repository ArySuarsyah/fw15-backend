const db = require("../helpers/db.helper");

exports.getPaymentMethod = async (filter) => {
  try {
    const query = `
    SELECT * FROM "paymentMethod"
    WHERE "name" LIKE $3
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

exports.createPaymentMethod = async (data) => {
  try {
    const query = `
    INSERT INTO "paymentMethod" ("name")
    VALUES ($1)
    RETURNING *
  `;
    const values = [data.name];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.getPaymentMethodById = async (id) => {
  const query = `
SELECT * FROM "paymentMethod" WHERE "id" = $1
  `;

  const value = [id];
  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.updatePaymentMethod = async (data, id) => {
  const query = `
  UPDATE "paymentMethod"
  SET "name" = COALESCE(NULLIF($1, ''), "name")
  WHERE "id" = $2 RETURNING *`;

  const value = [ data.name, id];
  const { rows } = await db.query(query, value);
  return rows[0];
};

exports.deletePaymentMethod = async (id) => {
  const query = `
  DELETE FROM "paymentMethod"
  WHERE id = $1 RETURNING *
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

const db = require("../helpers/db.helper");

exports.getCategories = async (filter) => {
  try {
    const query = `
    SELECT * FROM "categories"
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

exports.createCategories = async (data) => {
  try {
    const query = `
    INSERT INTO "categories" ("name")
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

exports.getCategoriesById = async (id) => {
  const query = `
SELECT * FROM "categories" WHERE "id" = $1
  `;

  const value = [id];
  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.updateCategories = async (data, id) => {
  const query = `
  UPDATE "categories"
  SET "name" = COALESCE(NULLIF($1, ''), "name")
  WHERE "id" = $2 RETURNING *`;

  const value = [data.name, id];
  const { rows } = await db.query(query, value);
  return rows[0];
};

exports.deleteCategories = async (id) => {
  const query = `
  DELETE FROM "categories"
  WHERE id = $1 RETURNING *
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

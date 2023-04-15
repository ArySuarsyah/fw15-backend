const db = require("../helpers/db.helper");

exports.getPartners = async (filter) => {
  try {
    const query = `
    SELECT * FROM "partners"
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

exports.createPartners = async (data) => {
  try {
    const query = `
    INSERT INTO "partners" ("picture", "name")
    VALUES ($1, $2)
    RETURNING *
  `;
    const values = [data.picture, data.name];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.getPartnersById = async (id) => {
  const query = `
SELECT * FROM "partners" WHERE "id" = $1
  `;

  const value = [id];
  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.updatePartners = async (data, id) => {
  const query = `
  UPDATE "partners"
  SET "picture" = COALESCE(NULLIF($1, ''), "picture"), "name" = COALESCE(NULLIF($2, ''), "name")
  WHERE "id" = $3 RETURNING *`;

  const value = [data.picture, data.name, id];
  const { rows } = await db.query(query, value);
  return rows[0];
};

exports.deletePartners = async (id) => {
  const query = `
  DELETE FROM "partners"
  WHERE id = $1 RETURNING *
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

const db = require("../helpers/db.helper");

exports.getEventsCategories = async (filter) => {
  try {
    const query = `
    SELECT * FROM "eventCategories"
    ORDER BY "${filter.sort}" ${filter.sortBy}
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

exports.createEventsCategories = async (data) => {
  try {
    const query = `
    INSERT INTO "eventCategories" ("eventId", "categoryId")
    VALUES ($1, $2)
    RETURNING *
  `;
    const values = [
      data.eventId,
      data.categoryId,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.getEventsCategoriesById = async (id) => {
  const query = `
SELECT * FROM "eventCategories" WHERE "id" = $1
  `;

  const value = [id];
  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.updateEventsCategories = async (data, id) => {
  const query = `
  UPDATE "eventCategories"
  SET "eventId" = COALESCE(NULLIF($1, '')::INTEGER, "eventId"), "categoryId" = COALESCE(NULLIF($2, '')::INTEGER, "categoryId")
  WHERE "id" = $3 RETURNING *`;

  const value = [
    data.eventId,
    data.categoryId,
    id,
  ];
  const { rows } = await db.query(query, value);
  return rows[0];
};

exports.deleteEventsCategories = async (id) => {
  const query = `
  DELETE FROM "eventCategories"
  WHERE id = $1 RETURNING *
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

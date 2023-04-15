const db = require("../helpers/db.helper");

exports.getReservationSection = async (filter) => {
  try {
    const query = `
    SELECT * FROM "reservationSection"
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

exports.createReservationSection = async (data) => {
  try {
    const query = `
    INSERT INTO "reservationSection" ("name", "price")
    VALUES ($1, $2)
    RETURNING *
  `;
    const values = [data.name, data.price];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.getReservationSectionById = async (id) => {
  const query = `
SELECT * FROM "reservationSection" WHERE "id" = $1
  `;

  const value = [id];
  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.updateReservationSection = async (data, id) => {
  const query = `
  UPDATE "reservationSection"
  SET "name" = COALESCE(NULLIF($1, ''), "name"), "price" = COALESCE(NULLIF($2, ''), "price")
  WHERE "id" = $3 RETURNING *`;

  const value = [data.name, data.price, id];
  const { rows } = await db.query(query, value);
  return rows[0];
};

exports.deleteReservationSection = async (id) => {
  const query = `
  DELETE FROM "reservationSection"
  WHERE id = $1 RETURNING *
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

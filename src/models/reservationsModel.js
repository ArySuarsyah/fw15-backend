const db = require("../helpers/db.helper");

exports.getReservations = async (filter) => {
  try {
    const query = `
    SELECT * FROM "reservations"
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

exports.createReservations = async (data) => {
  try {
    const query = `
    INSERT INTO "reservations" ("eventId", "userId", "statusId", "paymentMethodId")
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
    const values = [data.eventId, data.userId, data.statusId, data.paymentMethodId];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.getReservationsById = async (id) => {
  const query = `
SELECT * FROM "reservations" WHERE "id" = $1
  `;

  const value = [id];
  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.updateReservations = async (data, id) => {
  const query = `
  UPDATE "reservations"
  SET "eventId" = COALESCE(NULLIF($1, '')::INTEGER, "eventId"), "userId" = COALESCE(NULLIF($2, '')::INTEGER, "userId"), "statusId" = COALESCE(NULLIF($3, '')::INTEGER, "statusId"), "paymentMethodId" = COALESCE(NULLIF($4, '')::INTEGER  , "paymentMethodId")
  WHERE "id" = $5 RETURNING *`;

  const value = [data.eventId, data.userId, data.statusId, data.paymentMethodId, id];
  const { rows } = await db.query(query, value);
  return rows[0];
};

exports.deleteReservations = async (id) => {
  const query = `
  DELETE FROM "reservations"
  WHERE id = $1 RETURNING *
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

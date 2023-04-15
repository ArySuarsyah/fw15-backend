const db = require("../helpers/db.helper");

exports.getReservationTicket = async (filter) => {
  try {
    const query = `
    SELECT * FROM "reservationTicket"
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

exports.createReservationTicket = async (data) => {
  try {
    const query = `
    INSERT INTO "reservationTicket" ("reservationId", "sectionId", "quantityId")
    VALUES ($1, $2, $3)
    RETURNING *
  `;
    const values = [data.reservationId, data.sectionId, data.quantityId];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.getReservationTicketById = async (id) => {
  const query = `
SELECT * FROM "reservationTicket" WHERE "id" = $1
  `;

  const value = [id];
  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.updateReservationTicket = async (data, id) => {
  const query = `
  UPDATE "reservationTicket"
  SET "reservationId" = COALESCE(NULLIF($1, '')::INTEGER, "reservationId"), "sectionId" = COALESCE(NULLIF($2, '')::INTEGER, "sectionId"), "quantityId" = COALESCE(NULLIF($3, '')::INTEGER, "quantityId")
  WHERE "id" = $4 RETURNING *`;

  const value = [data.reservationId, data.sectionId, data.quantityId, id];
  const { rows } = await db.query(query, value);
  return rows[0];
};

exports.deleteReservationTicket = async (id) => {
  const query = `
  DELETE FROM "reservationTicket"
  WHERE id = $1 RETURNING *
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

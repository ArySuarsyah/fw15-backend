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
    const values = [
      data.eventId,
      data.userId,
      data.statusId,
      data.paymentMethodId,
    ];
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

  const value = [
    data.eventId,
    data.userId,
    data.statusId,
    data.paymentMethodId,
    id,
  ];
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

// Main Business Flow

exports.findByName = async (filter) => {
  try {
    const query = `
  SELECT
  "reserv"."id" as "reservationsId",
  "e"."title",
  "reserv"."userId",
  "reserv"."statusId",
  "pay".name as "paymentMethod",
  "reserv"."createdAt",
  "reserv"."updatedAt"
  FROM "reservations" "reserv"
  JOIN "paymentMethod" "pay" on "reserv"."paymentMethodId" = "pay"."id"
  JOIN "events" "e" on "reserv"."eventId" = "e"."id"
  WHERE "pay"."name" LIKE $3
    LIMIT $1
    OFFSET $2
  `;

    const value = [
      filter.limit,
      filter.page,
      `%${filter.searchByPaymentMethod}%`,
    ];
    const { rows } = await db.query(query, value);

    return rows;
  } catch (err) {
    if (err) throw err;
  }
};

exports.findById = async (id) => {
  try {
    const query = `
  SELECT
  "reserv"."id" as "reservationsId",
  "e"."title",
  "reserv"."userId",
  "reserv"."statusId",
  "pay".name as "paymentMethod",
  "reserv"."createdAt",
  "reserv"."updatedAt"
  FROM "reservations" "reserv"
  JOIN "paymentMethod" "pay" on "reserv"."paymentMethodId" = "pay"."id"
  JOIN "events" "e" on "reserv"."eventId" = "e"."id"
  WHERE "reserv"."id"= $1
  `;

    const value = [id];
    const { rows } = await db.query(query, value);

    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.create = async (data) => {
  try {
    const query = `
    INSERT INTO "reservations" ("eventId", "userId", "statusId", "paymentMethodId")
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
    const values = [
      data.eventId,
      data.userId,
      data.statusId,
      data.paymentMethodId,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};



// alternative reservation

exports.findReservation = async (filter) => {
  try {
    const query = `
  SELECT
  "reserv"."id" as "reservationsId",
  "e"."title",
  "reserv"."userId",
  "reserv"."statusId",
  "pay".name as "paymentMethod",
  "reserv"."createdAt",
  "reserv"."updatedAt"
  FROM "reservations" "reserv"
  JOIN "paymentMethod" "pay" on "reserv"."paymentMethodId" = "pay"."id"
  JOIN "events" "e" on "reserv"."eventId" = "e"."id"
  JOIN "reservationTicket" "ticket" on "reserv"."eventId" = "ticket"."reservationId"
  JOIN "reservationSection" "section" on "ticket"."sectionId" = "section"."id"
  WHERE "pay"."name" LIKE $3
    LIMIT $1
    OFFSET $2
  `;

    const value = [
      filter.limit,
      filter.page,
      `%${filter.searchByPaymentMethod}%`,
    ];
    const { rows } = await db.query(query, value);

    return rows;
  } catch (err) {
    if (err) throw err;
  }
};



exports.findByOne = async (id) => {
  try {
    const query = `
SELECT
    "reserv"."id" as "reservationsId",
    "e"."title",
    "reserv"."userId",
    "status"."name" as "status",
    "section"."name",
    "section"."quantity",
    "section"."price",
    "pay"."name" as "paymentMethod",
    "reserv"."createdAt",
    "reserv"."updatedAt"
FROM "reservations" "reserv"
    JOIN "paymentMethod" "pay" on "reserv"."paymentMethodId" = "pay"."id"
    JOIN "events" "e" on "reserv"."eventId" = "e"."id"
    JOIN "reservationTicket" "ticket" on "reserv"."id" = "ticket"."reservationId"
    JOIN "reservationSection" "section" on "ticket"."sectionId" = "section"."id"
    JOIN "reservationStatus" "status" on "reserv"."statusId" = "status"."id"

WHERE "reserv"."id" = $1
  `;

    const value = [id];
    const { rows } = await db.query(query, value);

    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};
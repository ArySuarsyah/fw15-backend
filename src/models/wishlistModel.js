const db = require("../helpers/db.helper");

exports.getWishlist = async (filter) => {
  try {
    const query = `
    SELECT * FROM "wishlist"
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

exports.createWishlist = async (data) => {
  try {
    const query = `
    INSERT INTO "wishlist" ("eventId", "userId")
    VALUES ($1, $2)
    RETURNING *
  `;
    const values = [data.eventId, data.userId];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.getWishlistById = async (id) => {
  const query = `
SELECT
"e"."id",
"e"."title",
"e"."date",
"ct"."name" as "location",
"e"."description"
FROM "wishlist" "ws"
JOIN "events" "e" on "ws"."eventId" = "e"."id"
JOIN "cities" "c" on "e"."cityId" = "c"."id"
WHERE "id" = $1
  `;

  const value = [id];
  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.updateWishlist = async (data, id) => {
  const query = `
  UPDATE "wishlist"
  SET "eventId" = COALESCE(NULLIF($1, '')::INTEGER, "eventId"), "userId" = COALESCE(NULLIF($2, '')::INTEGER, "userId")
  WHERE "id" = $3 RETURNING *`;

  const value = [data.eventId, data.userId, id];
  const { rows } = await db.query(query, value);
  return rows[0];
};

exports.deleteWishlist = async (id) => {
  const query = `
  DELETE FROM "wishlist"
  WHERE id = $1 RETURNING *
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

// main flow

exports.getWishlistByUserId = async (id) => {
  const query = `
SELECT
"e"."id",
"e"."title",
"e"."date",
"ct"."name" as "location",
"e"."description"
FROM "wishlist" "ws"
JOIN "events" "e" on "ws"."eventId" = "e"."id"
JOIN "cities" "ct" on "e"."cityId" = "ct"."id"
WHERE "ws"."userId" = $1
  `;

  const value = [id];
  const { rows } = await db.query(query, value);

  return rows;
};

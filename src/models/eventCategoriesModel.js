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
    const values = [data.eventId, data.categoryId];
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

  const value = [data.eventId, data.categoryId, id];
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









// Main Business Flow

exports.findAllByEventId = async (filter) => {
  try {
    const query = `
    SELECT
    "e"."id",
    "e"."picture",
    "e"."title",
    "e"."date", "ct"."name" as "location",
    "cat"."name" as "category",
    "e"."description" as "description"
    FROM "eventCategories" "ec"
    JOIN "events" "e" ON "e"."id" = "ec"."eventId"
    JOIN "cities" "ct" ON "ct"."id" = "e"."cityId"
    JOIN "categories" "cat" ON "cat"."id" = "ec"."categoryId"
    WHERE "e"."title" LIKE $3
    AND "cat"."name" LIKE $4
    AND "ct"."name" LIKE $5

    ORDER BY "${filter.sort}" ${filter.sortBy}
    LIMIT $1
    OFFSET $2
  `;

    const values = [
      filter.limit,
      filter.page,
      `%${filter.searchByName}%`,
      `%${filter.searchByCategory}%`,
      `%${filter.searchByLocation}%`,
    ];

    const { rows } = await db.query(query, values);
    return rows;
  } catch (err) {
    if (err) throw err;
  }
};

exports.insertEventsCategories = async (data) => {
  try {
    const query = `
    INSERT INTO "eventCategories" ("eventId", "categoryId")
    VALUES ($1, $2)
    RETURNING *
  `;
    const values = [data.eventId, data.categoryId];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.findOneById = async (id) => {
  try {
    const query = `
    SELECT
    "e"."id",
    "e"."picture",
    "e"."title",
    "ct"."name" as "location",
    "cat"."name" as "category",
    "e"."date",
    "e"."description"
    FROM "eventCategories" "ec"
    JOIN "events" "e" ON "e"."id" = "ec"."eventId"
    JOIN "cities" "ct" ON "ct"."id" = "e"."cityId"
    JOIN "categories" "cat" ON "cat"."id" = "ec"."categoryId"
    WHERE "ec"."eventId" = $1
  `;

    const values = [id];

    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};



exports.updateEvntCategories = async (data, id) => {
  try {

  const query = `
  UPDATE "eventCategories"
  SET "eventId" = COALESCE(NULLIF($1, '')::INTEGER, "eventId"), "categoryId" = COALESCE(NULLIF($2, '')::INTEGER, "categoryId")

  WHERE "eventId" = $3 RETURNING *`;

  const value = [data.eventId, data.categoryId, id];
  const { rows } = await db.query(query, value);
  return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};


exports.findOneForDelete = async (id) => {
  try {
    const query = `
    SELECT
    "e"."id",
    "ct"."id" as city,
    "cat"."id" as category,
    "e"."date",
    "e"."description"
    FROM "eventCategories" "ec"
    JOIN "events" "e" ON "e"."id" = "ec"."eventId"
    JOIN "cities" "ct" ON "ct"."id" = "e"."cityId"
    JOIN "categories" "cat" ON "cat"."id" = "ec"."categoryId"
    WHERE "ec"."eventId" = $1
  `;

    const values = [id];

    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};
const db = require("../helpers/db.helper");


exports.getEvents = async (filter) => {
  try {
    const query = `
    SELECT * FROM "events"
    WHERE "title" LIKE $3
    ORDER BY "${filter.sort}" ${filter.sortBy}
    LIMIT $1
    OFFSET $2
  `;
    const values = [filter.limit, filter.page, `%${filter.search}%`];
    const { rows } = await db.query(query, values);
    return rows;
  } catch (err) {
    if (err) throw err;
  }
};

exports.createEvents = async (data) => {
  try {
    const query = `
    INSERT INTO "events" ("picture", "title", "cityId", "date", "description")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
    const values = [
      data.picture,
      data.title,
      data.cityId,
      data.date,
      data.description,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.getEventsById = async (id) => {
  const query = `
SELECT * FROM "events" WHERE "id" = $1
  `;

  const value = [id];
  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.updateEvents = async (data, id) => {
  try {
    const query = `
  UPDATE "events"
  SET "picture" = COALESCE(NULLIF($1, ''), "picture"), "title" = COALESCE(NULLIF($2, ''), "title"), "cityId" = COALESCE(NULLIF($3, '')::INTEGER, "cityId"),"date" = COALESCE(NULLIF($4, '')::DATE, "date"), "description" = COALESCE(NULLIF($5, ''), "description")
  WHERE "id" = $6 RETURNING *`;

  const value = [
    data.picture,
    data.title,
    data.cityId,
    data.date,
    data.description,
    id,
  ];
  const { rows } = await db.query(query, value);
  return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.deleteEvents = async (id) => {
  try {
    const query = `
  DELETE FROM "events"
  WHERE id = $1 RETURNING *
  `;
    const { rows } = await db.query(query, [id]);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

// Main Business Flow

exports.findEvent = async (filter) => {
  try {
    const query = `
SELECT
"e"."id",
"e"."picture",
"e"."title",
"e"."date", "ct"."name" as "location", "cat"."name" as "category"
FROM "eventCategories" "ec"
    JOIN "events" "e" ON "e"."id" = "ec"."eventId"
    JOIN "cities" "ct" ON "ct"."id" = "e"."cityId"
    JOIN "categories" "cat" ON "cat"."id" = "ec"."categoryId"
WHERE "ec"."eventId" = 12
    WHERE "ev". "title" LIKE $3 AND "cat"."name" LIKE $4 AND "ct"."name" LIKE $5
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



exports.insertEvent = async (data) => {
  try {
    const query = `
    INSERT INTO "events" ("picture", "title", "cityId", "date", "description")
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
    
    const values = [
      data.picture,
      data.title,
      data.cityId,
      data.date,
      data.description,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

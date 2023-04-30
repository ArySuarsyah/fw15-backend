const db = require("../helpers/db.helper");

exports.getProfile = async (filter) => {
  try {
    const query = `
    SELECT * FROM "profile"
    WHERE "fullName" LIKE $3
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

exports.createProfile = async (data) => {
  try {
    const query = `
    INSERT INTO "profile" ("picture", "fullName", "phoneNumber", "gender", "profession", "nationality", "birthdate", "userId")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
    const values = [
      data.picture,
      data.fullName,
      data.phoneNumber,
      data.gender,
      data.profession,
      data.nationality,
      data.birthdate,
      data.userId,
    ];
    const { rows } = await db.query(query, values);
    return rows[0];
  } catch (err) {
    if (err) throw err;
  }
};

exports.getProfileById = async (id) => {
  const query = `
SELECT * FROM "profile" WHERE "id" = $1
  `;

  const value = [id];
  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.getProfileByUserId = async (userId) => {
  const query = `
SELECT
"p"."fullName",
"p"."picture",
"u"."userName",
"u"."email",
"p"."phoneNumber",
"p"."gender",
"p"."profession",
"p"."nationality",
"p"."birthdate"
FROM "profile" "p"
JOIN "users" "u" ON u."id" = "p"."userId" WHERE "p"."userId" = $1
  `;

  const value = [userId];
  const { rows } = await db.query(query, value);

  return rows[0];
};

exports.updateProfile = async (data, id) => {
  const query = `
  UPDATE "profile"
  SET "picture" = COALESCE(NULLIF($1, ''), "picture"), "fullName" = COALESCE(NULLIF($2, ''), "fullName"), "phoneNumber" = COALESCE(NULLIF($3, ''), "phoneNumber"),"gender" = COALESCE(NULLIF($4, '')::BOOLEAN, "gender"), "profession" = COALESCE(NULLIF($5, ''), "profession"), "nationality" = COALESCE(NULLIF($6, ''), "nationality"), "birthdate" = COALESCE(NULLIF($7, '')::DATE, "birthdate"), "userId" = COALESCE(NULLLIF($9, ''), "userId")
  WHERE "id" = $8 RETURNING *`;

  const value = [
    data.picture,
    data.fullName,
    data.phoneNumber,
    data.gender,
    data.profession,
    data.nationality,
    data.birthdate,
    id,
    data.userId,
  ];
  const { rows } = await db.query(query, value);
  return rows[0];
};

exports.updateProfileByUserId = async (userId, data) => {
  const query = `
  UPDATE "profile"
  SET "picture" = COALESCE(NULLIF($1, ''), "picture"), "fullName" = COALESCE(NULLIF($2, ''), "fullName"), "phoneNumber" = COALESCE(NULLIF($3, ''), "phoneNumber"),"gender" = COALESCE(NULLIF($4, '')::BOOLEAN, "gender"), "profession" = COALESCE(NULLIF($5, ''), "profession"), "nationality" = COALESCE(NULLIF($6, ''), "nationality"), "birthdate" = COALESCE(NULLIF($7, '')::DATE, "birthdate")
  WHERE "userId" = $8 RETURNING *`;

  const value = [
    data.picture,
    data.fullName,
    data.phoneNumber,
    data.gender,
    data.profession,
    data.nationality,
    data.birthdate,
    userId,
  ];
  const { rows } = await db.query(query, value);
  return rows[0];
};

exports.deleteProfile = async (id) => {
  const query = `
  DELETE FROM "profile"
  WHERE id = $1 RETURNING *
  `;
  const { rows } = await db.query(query, [id]);
  return rows[0];
};

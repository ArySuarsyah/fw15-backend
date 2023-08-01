const db = require("../helpers/db.helper");

exports.getHistoryById = async (id) => {
  try {
    const query = `
SELECT
  "reserv"."id",
  "e"."title",
  "c"."name" as "location",
  "p"."fullName" as "fullname",
  "section"."name",
  "section"."price",
  "pay"."name" as "paymentMethod",
  "status"."name" as "status",
  "reserv"."createdAt",
  "reserv"."updatedAt"
FROM "reservations" "reserv"
JOIN "paymentMethod" "pay" on "reserv"."paymentMethodId" = "pay"."id"
JOIN "reservationTicket" "ticket" on "reserv"."id" = "ticket"."reservationId"
JOIN "reservationSection" "section" on "ticket"."sectionId" = "section"."id"
JOIN "reservationStatus" "status" on "reserv"."statusId" = "status"."id"
JOIN "events" "e" on "reserv"."eventId" = "e"."id"
JOIN "cities" "c" on "e"."cityId" = "c"."id"
JOIN "profile" "p" on "reserv"."userId" = "p"."userId"
WHERE "reserv"."userId" = $1;
  `;

    const value = [id];
    const { rows } = await db.query(query, value);
    return rows;
  } catch (err) {
    if (err) throw err;
  }
};

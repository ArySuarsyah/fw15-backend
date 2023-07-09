
const filterData = (data) => {
  console.log(data.limit);
console.log((parseInt(data.page) - 1) * parseInt(data.limit));
  return {
    limit: parseInt(data.limit || 5),
    page: (parseInt(data.page) - 0) * parseInt(data.limit),
    search: data.search || "",
    sort: data.sort || "id",
    sortBy: data.sortBy || "ASC",
  };
}
module.exports = filterData

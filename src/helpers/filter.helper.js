
const filterData = (data) => {
  return {
    limit: parseInt(data.limit || 5),
    page: (parseInt(data.page) - 0) * parseInt(data.limit),
    search: data.search || "",
    sort: data.sort || "id",
    sortBy: data.sortBy || "ASC",
  };
}
module.exports = filterData

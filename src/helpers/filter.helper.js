
const filterData = (data) => {
  return {
    limit: data.limit || 5,
    page: parseInt((data.page - 0) * data.limit),
    search: data.search || "",
    sort: data.sort || "id",
    sortBy: data.sortBy || "ASC",
  };
}

module.exports = filterData

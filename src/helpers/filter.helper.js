
const filterData = (data) => {
  return {
    limit: data.limit || 5,
    page: (parseInt(data.page) - 1) * parseInt(data.limit)||0,
    search: data.search || "",
    sort: data.sort || "id",
    sortBy: data.sortBy || "ASC",
  };
}

module.exports = filterData

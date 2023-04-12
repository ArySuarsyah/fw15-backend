const filter = (data) => {
  data.page = parseInt(data.page) || 1;
  data.limit = parseInt(data.limit) || 5;
  data.search = data.search || "";
  data.sortBy = data.sortBy || "id";
  data.sort = data.sort || "ASC";



  //  const params = {
  //    limit: data.limit,
  //    offset: (parseInt(data.page) - 1) * data.limit,
  //    search: data.search,
  //    sortBy: data.sortBy,
  //    sort: data.sort,
  //  };


  // con
};

module.exports = filter;

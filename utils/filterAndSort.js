module.exports = (query, model) => {
  let queryResult;
  const reqQuery = { ...query };
  const excludedFields = ["select", "sort"];
  excludedFields.forEach((field) => delete reqQuery[field]);
  let queryString = JSON.stringify(reqQuery);
  queryString.replace(/\b(gt|gte|lt|lte|in)\b/g, (match) => `$${match}`);
  console.log(queryString);
  queryResult = model.find(JSON.parse(queryString));

  if (query.select) {
    const fields = query.select.split(",").join(" ");
    console.log(fields);
    queryResult = queryResult.select(fields);
  }

  if (query.sort) {
    const sortBy = query.sort.split(",").join(" ");
    queryResult = queryResult.sort(sortBy);
  }
  return queryResult;
};

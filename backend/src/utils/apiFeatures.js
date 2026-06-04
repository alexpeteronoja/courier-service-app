class APIFeatures {
  constructor(queryModel, requestQuery) {
    this.queryModel = queryModel;
    this.requestQuery = requestQuery;
  }

  filter() {
    // 1) Filtering
    const queryObj = { ...this.requestQuery };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((item) => delete queryObj[item]);

    // 1B) Advanced filtering

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.queryModel = this.queryModel.find(JSON.parse(queryStr));

    return this;
  }

  // sorting
  sorting() {
    if (this.requestQuery.sort) {
      const sortBy = this.requestQuery.sort.split(',').join(' ');
      this.queryModel = this.queryModel.sort(sortBy);
    } else {
      this.queryModel = this.queryModel.sort('-createdAt');
    }

    return this;
  }

  // 3) Field limiting

  limitFields() {
    if (this.requestQuery.fields) {
      const fields = this.requestQuery.fields.split(',').join(' ');

      this.queryModel = this.queryModel.select(fields);
    } else {
      this.queryModel = this.queryModel.select('-v');
    }
    return this;
  }

  // 4) Pagination

  pagination() {
    const page = parseInt(this.requestQuery.page, 10) || 1;
    const limit = parseInt(this.requestQuery.limit, 10) || 50;
    const skip = (page - 1) * limit;

    this.queryModel = this.queryModel.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;

const pool = require('../utils/pool');

module.exports = class Review {
  id;
  rating;
  review;
  reviewer;
  book;

  constructor(row) {
    this.id = row.id;
    this.rating = row.rating;
    this.review = row.review;
    this.reviewer = row.reviewer;
    this.book = row.book;
  }

  static async insert({ rating, review, reviewer, book }) {
    const { rows } = await pool.query(
      `
          INSERT INTO reviews(rating, review, reviewer, book)
          VALUES ($1, $2, $3, $4)
          RETURNING *;`,
      [rating, review, reviewer, book]
    );
    return new Review(rows[0]);
  }
};

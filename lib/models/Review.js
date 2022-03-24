const pool = require('../utils/pool');
const Reviewer = require('./Reviewer');

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
    this.title = row.title;
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

  static async findAllReviews() {
    const { rows } = await pool.query(
      `
      SELECT reviews.id, reviews.rating, reviews.review, reviews.book, books.title
      FROM reviews
      LEFT JOIN books
      ON reviews.book = books.id
      ORDER BY reviews.rating DESC
      LIMIT 100;
      `
    );
    return rows.map((row) => new Review(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM reviews WHERE id=$1;', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Review(rows[0]);
  }

  async getBook() {
    const { rows } = await pool.query(
      `
      SELECT books.id, books.title
      FROM books
      LEFT JOIN reviews
      ON books.id = reviews.book
      WHERE reviews.book=$1;
      `,
      [this.id]
    );
    this.books = rows;
    return this;
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM reviews WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new Review(rows[0]);
  }
};

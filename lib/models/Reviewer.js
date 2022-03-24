const pool = require('../utils/pool');

module.exports = class Reviewer {
  id;
  name;
  company;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.company = row.company;
  }

  static async insert({ name, company }) {
    const { rows } = await pool.query(
      'INSERT INTO reviewers(name, company) VALUES ($1, $2) RETURNING *;',
      [name, company]
    );
    return new Reviewer(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM reviewers;');
    return rows.map((row) => new Reviewer(row));
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM reviewers WHERE id=$1;', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Reviewer(rows[0]);
  }

  async getReviews() {
    const { rows } = await pool.query(
      `
      SELECT
          reviews.id, reviews.rating, reviews.review, books.id
         AS
             books_id, books.title
         AS
             books_title
         FROM
             reviews
         LEFT JOIN 
             books
         ON
             reviews.book = books.id
         WHERE
             reviews.reviewer = $1`,
      [this.id]
    );
    this.reviews = rows;
    return this;
  }

  static async updateById(id, attributes) {
    const existingReview = await Reviewer.getById(id);
    const updatedAttributes = { ...existingReview, ...attributes };
    const { name, company } = updatedAttributes;

    const { rows } = await pool.query(
      'UPDATE reviewers SET name=$2, company=$3 WHERE id=$1 RETURNING *;',
      [id, name, company]
    );
    if (!rows[0]) return null;
    return new Reviewer(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      'DELETE FROM reviewers WHERE id=$1 RETURNING *;',
      [id]
    );

    if (!rows[0]) return null;
    return new Reviewer(rows[0]);
  }
};

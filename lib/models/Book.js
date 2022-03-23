const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  publisher;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.publisher = row.publisher;
    this.released = row.released;
  }

  static async createBook({ title, publisher, released }) {
    const { rows } = await pool.query(
      'INSERT INTO books (title, publisher, released) VALUES ($1, $2, $3) RETURNING *;',
      [title, publisher, released]
    );
    return new Book(rows[0]);
  }

  static async findAllBooks() {
    const { rows } = await pool.query(
      'SELECT id, title, publisher, released FROM books'
    );
    return rows.map((row) => new Book(row));
  }

  static async findBookById(id) {
    const { rows } = await pool.query('SELECT * FROM books WHERE id=$1', [id]);
    return new Book(rows[0]);
  }

  async getPublisher() {
    const { rows } = await pool.query(
      `
        SELECT publishers.id, publishers.name
        FROM publishers
        LEFT JOIN books
        ON books.publisher = publishers.id
        WHERE books.id=$1;
          `,
      [this.id]
    );
    this.publishers = rows;
    return this;
  }

  async getAuthors() {
    const { rows } = await pool.query(
      `
          SELECT authors.id, authors.name
          FROM authors
          LEFT JOIN authors_books
          ON authors.id = authors_books.authors_id
          LEFT JOIN books
          ON authors_books.books_id = books.id
          WHERE books.id=$1;
          `,
      [this.id]
    );
    this.authors = rows;
    return this;
  }

  async getReviews() {
    const { rows } = await pool.query(
      `
          SELECT reviews.id, reviews.rating, reviews.review, reviews.reviewer
          FROM reviews
          LEFT JOIN reviewers
          ON reviewers.id = reviews.reviewer
          WHERE reviews.reviewer=$1;
          `,
      [this.id]
    );
    this.reviews = rows;
    return this;
  }
};

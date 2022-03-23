const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
  }

  static async createAuthor({ name, dob, pob }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
              authors (name, dob, pob)
          VALUES
              ($1, $2, $3)
          RETURNING
              *
          `,
      [name, dob, pob]
    );

    return new Author(rows[0]);
  }

  static async findAllAuthors() {
    const { rows } = await pool.query(
      `
          SELECT
            id, name
          FROM
            authors
            `
    );

    return rows.map((row) => new Author(row));
  }

  static async findAuthorById(id) {
    const { rows } = await pool.query(
      `
          SELECT
            *
          FROM
            authors
          WHERE
            id=$1
          `,
      [id]
    );
    return new Author(rows[0]);
  }

  async getBook() {
    const { rows } = await pool.query(
      `
      SELECT books.id, books.title, books.released
      FROM books
      LEFT JOIN authors_books
      ON books.id = authors_books.books_id
      LEFT JOIN authors
      ON authors_books.authors_id = authors.id
      WHERE authors.id = $1;
      `,
      [this.id]
    );
    this.books = rows;
    return this;
  }
};

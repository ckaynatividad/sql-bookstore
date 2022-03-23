const pool = require('../utils/pool');

module.exports = class Publisher {
  id;
  name;
  city;
  state;
  country;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.city = row.city;
    this.state = row.state;
    this.country = row.country;
  }

  static async createPublisher({ name, city, state, country }) {
    const { rows } = await pool.query(
      'INSERT INTO publishers(name, city, state, country) VALUES ($1, $2, $3, $4) RETURNING *;',
      [name, city, state, country]
    );

    const publisher = new Publisher(rows[0]);
    return publisher;
  }
  static async findAllPublisher() {
    const { rows } = await pool.query(
      `
                SELECT
                name, id
                FROM
                publishers
                `
    );

    return rows.map((row) => new Publisher(row));
  }

  static async findPublisherId(id) {
    const { rows } = await pool.query('SELECT * FROM publishers WHERE id=$1', [
      id,
    ]);
    return new Publisher(rows[0]);
  }
  async getBooks() {
    const { rows } = await pool.query(
      ` SELECT
          books.title AS title, 
          books.id AS id 
        
         FROM
             publishers
         LEFT JOIN 
             books
         ON
             publishers.id = books.publisher
         WHERE
             publishers.id = $1`,
      [this.id]
    );
    this.books = rows;
    return this;
  }
};

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
                *
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

  static async updatePublisher(id, attributes) {
    const currentPublisher = await Publisher.findPublisherId(id);
    const editedPublisher = { ...currentPublisher, ...attributes };
    const { name, city, state, country } = editedPublisher;

    const { rows } = await pool.query(
      'UPDATE publishers SET name=$2, city=$3, state=$4, country=$5 WHERE id=$1 RETURNING *;',
      [id, name, city, state, country]
    );

    return new Publisher(rows[0]);
  }
};

-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS authors, books, publishers, reviews, reviewers, authors_books CASCADE;

CREATE TABLE publishers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    city TEXT,
    state TEXT,
    country TEXT
);

CREATE TABLE authors (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    dob DATE,
    pob TEXT
);

CREATE TABLE books (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    publisher BIGINT REFERENCES publishers(id),
    released float(4) NOT NULL
);

CREATE TABLE reviewers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    company TEXT NOT NULL
);

CREATE TABLE reviews (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    rating INT NOT NULL CHECK (rating > 0 AND rating < 6),
    reviewer BIGINT REFERENCES reviewers(id),
    review VARCHAR(140) NOT NULL,
    book BIGINT REFERENCES books(id)
);

CREATE TABLE authors_books (
    books_id BIGINT REFERENCES books(id),
    authors_id BIGINT REFERENCES authors(id)
);

INSERT INTO publishers (name, city, state, country)
VALUES ('Penguin Publishers', 'New York City', 'New York', 'USA');

INSERT INTO authors (name, dob, pob)
VALUES ('Pinky Agnew', '01/01/1955', 'New Zealand');

INSERT INTO books (title, publisher, released)
VALUES ('Heartsongs: Readings for Weddings', '1', '2004');

INSERT INTO reviewers (name, company)
VALUES ('Amazon Customer', 'Amazon');

INSERT INTO reviews (rating, reviewer, review, book)
VALUES ('5', '1', 'Its impossible to read this book and not be moved. ', '1');

INSERT INTO authors_books (books_id, authors_id)
VALUES (1, 1);
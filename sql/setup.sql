-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS authors, books, publishers, reviews, reviewers;

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
    publisher BIGINT NOT NULL,
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

INSERT INTO publishers (name, city, state, country)
VALUES ('Penguin Publishers', 'New York City', 'New York', 'USA');
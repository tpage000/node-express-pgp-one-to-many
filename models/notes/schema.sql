DROP TABLE IF EXISTS notes;

CREATE TABLE notes (
  ID SERIAL PRIMARY KEY,
  date DATE NOT NULL,
  comments VARCHAR NOT NULL,
  rating INT NOT NULL CHECK (rating > 0 AND rating < 6),
  book_id INT REFERENCES books
)

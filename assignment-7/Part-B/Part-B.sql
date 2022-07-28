SELECT movie_name,release_date FROM movies;

SELECT first_name,last_name FROM directors;

SELECT * FROM actors
WHERE gender = 'M' AND date_of_birth > '1970-01-01';

SELECT * FROM movies
WHERE movie_lang = 'English' AND movie_length >= 90;


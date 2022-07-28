SELECT movie_name, movie_lang FROM movies
WHERE movie_lang in ('English', 'Korean', 'Spanish');

SELECT first_name, last_name FROM actors
WHERE last_name like 'M%' AND date_of_birth between '1940-01-01' AND '1969-01-01';
-- WHERE LEFT(last_name,1) = 'M' AND date_of_birth between '1940-01-01' AND '1969-01-01';

SELECT first_name, last_name, date_of_birth FROM directors
WHERE nationality in ('British', 'French', 'German') AND date_of_birth between '1950-01-01' AND '1980-01-12';
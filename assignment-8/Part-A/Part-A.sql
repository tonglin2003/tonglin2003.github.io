SELECT count(*) as actor_born_after_1970 FROM actors
WHERE date_of_birth > '01-01-1970';


SELECT 
    MIN(domestic_taking) as Lowest_domestic_taking, 
    MAX(domestic_taking) as highest_domestic_taking
FROM movie_revenues;

SELECT count(*) as age_certificate_15_movies FROM movies
WHERE age_certificate like ('15');

SELECT count(*) as japanese_directors FROM directors
WHERE nationality like ('Japanese');

SELECT AVG(movie_length) as avg_length_chinese_movies FROM movies
WHERE movie_lang like ('Chinese');
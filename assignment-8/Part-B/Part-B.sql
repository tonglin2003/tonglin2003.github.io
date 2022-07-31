-- Part 1 --
SELECT nationality, count(*) from directors
group by nationality;


--Part 2 -- 
SELECT sum(movie_length), age_certificate, movie_lang from movies
group by age_certificate, movie_lang
order by age_certificate;

-- Part 3 -- 
SELECT sum(movie_length), movie_lang from movies
group by movie_lang
having sum(movie_length) > 500




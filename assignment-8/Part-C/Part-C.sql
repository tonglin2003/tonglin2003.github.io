-- Part 1 -- 
-- Select the first and last names of all actors who have 
-- starred in movies directed by Wes Anderson

SELECT 
distinct on (actor_id) a.actor_id,
a.first_name as actor_fname, 
a.last_name as actor_lname
FROM movies_actors m_a
JOIN actors a
ON a.actor_id = m_a.actor_id
JOIN movies m
ON m.movie_id = m_a.movie_id
JOIN directors d
ON d.director_id = m.director_id
WHERE d.first_name like 'Wes' AND d.last_name like 'Anderson';

-- Part 2 -- 
-- Select the first name, last name and date of birth for the 
-- oldest actors of each gender.

SELECT first_name, last_name, date_of_birth FROM actors
WHERE date_of_birth = 
    (select min(date_of_birth) from actors where (gender) like 'M')
union
SELECT first_name, last_name, date_of_birth  FROM actors
WHERE date_of_birth = 
    (select min(date_of_birth) from actors where (gender) like 'F');


-- Part C -- 
-- Select the movie name, movie length, and age certificate for movies
-- with an above average length for their age certificate

select m1.movie_name, m1.age_certificate, m1.movie_length
from movies m1
where m1.movie_length >
    (select avg(movie_length) from movies m2 where m1.age_certificate = m2.age_certificate)
order by age_certificate;




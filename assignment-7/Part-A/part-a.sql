select count(*) from actors
union all
select count(*) from directors
union all
select count(*) from movies
union all
select count(*) from movie_revenues
union all
select count(*) from movies_actors

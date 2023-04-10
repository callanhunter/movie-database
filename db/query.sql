SELECT movies.movie_name AS movie, reviews.review
FROM reviews
JOIN movies
ON reviews.movie_id = movies.id
ORDER BY movies.movie_name;

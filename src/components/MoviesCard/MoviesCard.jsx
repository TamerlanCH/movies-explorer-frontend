import { useEffect, useMemo } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

const MoviesCard = ({ movie, savedMovies, onLikeMovie, onDeleteMovie }) => {
  let location = useLocation();
  const isLikeButton = location.pathname === '/movies';
  const savedMovie = savedMovies
    ? savedMovies.find((item) => item.movieId === movie.id)
    : '';
  const isLiked = savedMovies
    ? savedMovies.some((i) => i.movieId === movie.id)
    : false;
  const isDeleteButton = location.pathname === '/saved-movies';
  const imageUrl = movie.image.url
    ? `${'https://api.nomoreparties.co'}${movie.image.url}`
    : movie.image;

  const normalizedDuration = useMemo(() => {
    const minutes = movie.duration % 60;
    const hours = (movie.duration - minutes) / 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }, [movie.duration]);

  useEffect(() => {
    console.log();
  }, []);

  return (
    <li className="moviescard">
      <div className="moviescard__details">
        <p className="moviescard__name">{movie.nameRU}</p>
        <p className="moviescard__duration">{normalizedDuration}</p>
        {isLikeButton && (
          <button
            onClick={() => onLikeMovie(movie, isLiked, savedMovie?._id)}
            className={`moviescard__like-btn ${isLiked ? ' moviescard__like-btn_liked' : ''}`}
          />
        )}

        {isDeleteButton && (
          <button onClick={() => onDeleteMovie(movie._id)} className={`moviescard__delete-btn`} />
        )}
      </div>
      <a
        className="moviescard__image-container"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="moviescard__image"
          src={imageUrl}
          alt={movie.nameRU}
        />
      </a>
    </li>
  );
};

export default MoviesCard;
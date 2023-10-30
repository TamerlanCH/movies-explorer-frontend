import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import picture from "../../images/pic.png";

const MoviesCard = () => {
  let location = useLocation();
  const isLikeButton = location.pathname === '/movies';
  const isDeleteButton = location.pathname === '/saved-movies';

  return (
    <li className="moviescard">
      <div className="moviescard__details">
        <p className="moviescard__name">Бег это свобода</p>
        <p className="moviescard__duration">1ч 17м</p>
      </div>
      <img
        className="moviescard__image"
        src={picture}
        alt="превью фильма"
      />
      {isLikeButton && (
          <button
            className="moviescard__like-btn moviescard__like-btn_liked"
          />
        )}

        {isDeleteButton && (
          <button className={`moviescard__delete-btn`} />
        )}
    </li>
  );
};

export default MoviesCard;
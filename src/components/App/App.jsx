/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Main from '../../pages/Main/Main';
import Register from '../../pages/Register/Register';
import Login from '../../pages/Login/Login';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import MainApi from '../../utils/MainApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { auth } from '../../utils/Auth';
// import { moviesApi } from '../../utils/MoviesApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const App = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const headerPaths = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPaths = ['/', '/movies', '/saved-movies'];

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [movies, setMovies] = useState([]);
  const [apiErrors, setApiErrors] = useState({
    login: {},
    register: {},
    profile: {}
  });
  const [savedMovies, setSavedMovies] = useState([]);

  const mainApi = new MainApi({
    url: 'https://api.movies.tamerlan.nomoredomainsrocks.ru',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  useEffect(() => {
    setApiErrors({
      login: {},
      register: {},
      profile: {}
    });
  }, [location]);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            navigate(location.pathname);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    isLoggedIn &&
      mainApi
        .getUserInfo()
        .then((user) => {
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(`Что-то пошло не так... (${err})`);
        });

    isLoggedIn &&
      mainApi.getSavedMovies().then((data) => {
        setSavedMovies(data);
        localStorage.setItem('savedMovies', JSON.stringify(data));
      });
  }, [isLoggedIn]);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     if (localStorage.getItem('movies')) {
  //       setMovies(JSON.parse(localStorage.getItem('movies')));
  //     } else {
  //       moviesApi
  //         .getMovies()
  //         .then((movies) => {
  //           localStorage.setItem('movies', JSON.stringify(movies));
  //           setMovies(JSON.parse(localStorage.getItem('movies')));
  //         })
  //         .catch((err) => console.log(err));
  //     }
  //   }
  // }, [isLoggedIn]);

  useEffect(() => {
    isLoggedIn &&
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, isLoggedIn]);

  const handleRegister = (values) => {
    auth
      .register(values.name, values.email, values.password)
      .then((res) => {
        handleLogin(values);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = (values) => {
    auth
      .authorize(values.email, values.password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          setIsLoggedIn(true);
          navigate('/movies');
        }
      })
      .catch((err) => {
        setApiErrors({ ...apiErrors, login: err });
        console.log(err);
      });
  };

  const handleUpdateUser = (user) => {
    mainApi
      .editProfile(user)
      .then(() => {
        setApiErrors({ ...apiErrors, profile: {} });
        setCurrentUser({ ...currentUser, name: user.name, email: user.email });
      })
      .catch((err) => {
        setApiErrors({ ...apiErrors, profile: err });
        console.log(err);
      });
  };

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/');
    setIsLoggedIn(false);

  };

  const handleLikeMovie = (movie, isLiked, id) => {
    if (isLiked) {
      handleDeleteMovie(id);
    } else {
      mainApi
        .saveMovie(movie)
        .then((res) => {
          setSavedMovies([...savedMovies, res]);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteMovie = (id) => {
    const searchedSavedMovies = JSON.parse(
      localStorage.getItem('searchedSavedMovies')
    );
    mainApi
      .deleteMovie(id)
      .then((res) => {
        const updatedSavedMovies = savedMovies.filter(
          (movie) => movie._id !== id
        );
        setSavedMovies(updatedSavedMovies);
        if (searchedSavedMovies) {
          const updatedSearchedSavedMovies = searchedSavedMovies.filter(
            (movie) => movie._id !== id
          );

          localStorage.setItem(
            'searchedSavedMovies',
            JSON.stringify(updatedSearchedSavedMovies)
          );
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser }}>
        {headerPaths.includes(location.pathname) ? <Header isLoggedIn={isLoggedIn} /> : ''}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Register onRegister={handleRegister} isLoggedIn={isLoggedIn} apiErrors={apiErrors} />} />
          <Route path="/signin" element={<Login onLogin={handleLogin} isLoggedIn={isLoggedIn} apiErrors={apiErrors} />} />
          <Route path="/movies" element={<ProtectedRoute element={Movies} isLoggedIn={isLoggedIn} savedMovies={savedMovies} onLikeMovie={handleLikeMovie} />} />
          <Route path="/saved-movies" element={<ProtectedRoute element={SavedMovies} isLoggedIn={isLoggedIn} savedMovies={savedMovies} onDeleteMovie={handleDeleteMovie} />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} isLoggedIn={isLoggedIn} apiErrors={apiErrors} onSignOut={handleSignOut} onUpdateUser={handleUpdateUser} />} />
          <Route path="*" element={<NotFound isLoggedIn={isLoggedIn} />} />
        </Routes>
        {footerPaths.includes(location.pathname) ? <Footer /> : ''}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

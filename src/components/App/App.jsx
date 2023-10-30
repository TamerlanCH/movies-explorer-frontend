import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';

import Main from '../../pages/Main/Main';
import Register from '../../pages/Register/Register';
import Login from '../../pages/Login/Login';
import Profile from '../../pages/Profile/Profile';
import NotFound from '../../pages/NotFound/NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';

const App = () => {
  let location = useLocation();
  const headerPaths = ['/', '/movies', '/saved-movies', '/profile'];
  const footerPaths = ['/', '/movies', '/saved-movies'];

  const isLoggedIn = location.pathname === '/' ? false : true;

  return (
    <div className="page">
      {headerPaths.includes(location.pathname) ? <Header isLoggedIn={isLoggedIn} /> : ''}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {footerPaths.includes(location.pathname) ? <Footer /> : ''}
    </div>
  );
}

export default App;

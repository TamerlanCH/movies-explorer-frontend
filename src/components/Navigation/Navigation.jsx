import React, { useEffect, useState } from 'react';
import './Navigation.css';
import { Link, useLocation } from 'react-router-dom';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
// import ProfileIcon from '../../images/profile.svg';

const Navigation = () => {
    const [isBurger, setIsBurger] = useState(false);
    const location = useLocation();

    const toggleBurger = () => {
        if (window.innerWidth < 780) {
            setIsBurger(true);
        } else {
            setIsBurger(false);
        }
    };

    useEffect(() => {
        window.addEventListener('resize', toggleBurger);

        return () => {
            window.removeEventListener('resize', toggleBurger);
        };
    }, []);

    return (
        <>
            {isBurger ? (
                <BurgerMenu />
            ) : (
                <nav className="nav">
                    <ul className="nav__container">
                        <li className="nav__item">
                            <Link to="/movies" className={`nav__movies-link ${location.pathname === '/movies'
                                ? 'nav__movies-link_active'
                                : null
                                }`}>
                                Фильмы
                            </Link>
                        </li>
                        <li className="nav__item">
                            <Link to="/saved-movies" className={`nav__movies-link ${location.pathname === '/saved-movies'
                                ? 'nav__movies-link_active'
                                : null
                                }`}>
                                Сохранённые фильмы
                            </Link>
                        </li>
                    </ul>
                    <Link
                        className="profile-link profile-link_type_desktop"
                        to="/profile"
                    >
                        Аккаунт
                        {/* <img src={ProfileIcon} alt="Логотип Аккаунт" className="profile-link__image" /> */}
                    </Link>

                </nav>
            )}
        </>
    )
}

export default Navigation;

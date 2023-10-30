import React, { useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BurgerMenu.css';

const BurgerMenu = () => {
    const [isOpenMenu, setIsOpenMenu] = useState();
    const location = useLocation();

    const handleToggleOpenMenu = () => {
        setIsOpenMenu((prev) => !prev);
    };

    const closeBurger = useCallback(() => {
        setIsOpenMenu(false);
    }, []);

    return (
        <>
            <button className="burger-button" onClick={handleToggleOpenMenu} />
            {isOpenMenu && <div className="burger-overlay" onClick={closeBurger}></div>}
            <div
                onClick={(e) => (e.target.href ? closeBurger() : '')}
                className={`burger-container ${isOpenMenu ? 'burger-container_open' : ''}`}
            >
                <button
                    className="burger-container__close-button"
                    onClick={handleToggleOpenMenu}
                />
                <nav className="burger-menu">
                    <ul className="burger-menu__list">
                        <li className="burger-menu__item">
                            <Link
                                to="/"
                                className={`burger-menu__link ${location.pathname === '/'
                                    ? 'burger-menu__link_active'
                                    : null
                                    }`}
                            >
                                Главная
                            </Link>
                        </li>
                        <li className="burger-menu__item">
                            <Link
                                to="/movies"
                                className={`burger-menu__link ${location.pathname === '/movies'
                                    ? 'burger-menu__link_active'
                                    : null
                                    }`}
                            >
                                Фильмы
                            </Link>
                        </li>
                        <li className="burger-menu__item">
                            <Link
                                to="/saved-movies"
                                className={`burger-menu__link ${location.pathname === '/saved-movies'
                                    ? 'burger-menu__link_active'
                                    : null
                                    }`}
                            >
                                Сохраненные фильмы
                            </Link>
                        </li>
                    </ul>
                    <Link
                        className="profile-link profile-link_type_burger"
                        to="/profile"
                    >
                        Аккаунт
                    </Link>
                </nav>
            </div>
        </>
    );
};

export default BurgerMenu;
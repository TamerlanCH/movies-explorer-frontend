import React from 'react';
import './NotFound.css';
import { useNavigate } from 'react-router-dom';

const NotFound = ({ isLoggedIn }) => {
    const navigate = useNavigate();

    const goBack = () => {
        isLoggedIn ? navigate(-2) : navigate(-1);
    };

    return (
        <main className="not-found-page">
            <section className="not-found">
                <div className="not-found__container">
                    <h1 className="not-found__title">404</h1>
                    <p className="not-found__subtitle">Страница не найдена</p>
                </div>
                <button
                    type='button'
                    className='not-found__link'
                    onClick={goBack}>
                    Назад
                </button>
            </section>
        </main>
    );
}

export default NotFound;
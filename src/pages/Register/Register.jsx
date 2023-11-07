/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import './Register.css';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { useEffect } from "react";
import { validateEmail } from '../../utils/validation';

const Register = ({ onRegister, isLoggedIn, apiErrors }) => {
    const { values, handleChange, errors, isValid } = useFormAndValidation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/movies');
        }
    }, [isLoggedIn]);

    const handlerSubmitRegister = (e) => {
        e.preventDefault();
        onRegister(values);
    };

    return (
        <main className="auth-page">
            <section className="auth">
                <Link to="/" className="auth__logo" />
                <h1 className="auth__title">Добро пожаловать!</h1>
                <form onSubmit={handlerSubmitRegister}
                    className="auth-form">
                    <label className="auth-form__label">Имя</label>
                    <input
                        className="auth-form__input"
                        type="text"
                        name="name"
                        placeholder="Введите имя"
                        value={values.name || ''}
                        onChange={handleChange}
                        minLength="2"
                        maxLength="30"
                        required
                    />
                    <span className="auth-form__input-error">{errors.name}</span>
                    <label htmlFor="regEmail" className="auth-form__label">E-mail</label>
                    <input
                        className="auth-form__input"
                        type="email"
                        name="email"
                        placeholder="Введите почту"
                        value={values.email || ''}
                        onChange={handleChange}
                        required
                    />
                    <span className="auth-form__input-error">{validateEmail(values.email).message}</span>
                    <label className="auth-form__label">Пароль</label>
                    <input
                        className="auth-form__input"
                        type="password"
                        name="password"
                        placeholder="Введите пароль"
                        value={values.password || ''}
                        onChange={handleChange}
                        minLength="2"
                        maxLength="30"
                        required
                    />
                    <span className="auth-form__input-error">{errors.password}</span>
                    <span className="auth-form__input-error">{apiErrors.register.errorText}</span>
                    <button
                        type="submit"
                        className="auth-form__submit"
                        disabled={
                            !isValid ||
                            validateEmail(values.email).invalid
                          }
                    >
                        Зарегистрироваться
                    </button>
                </form>
                <p className="auth__subtitle">
                    Уже зарегистрированы?
                    <Link to="/signin" className="auth__link">
                        Войти
                    </Link>
                </p>
            </section>
        </main>
    )
}

export default Register;
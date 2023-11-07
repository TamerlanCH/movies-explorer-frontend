/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { useEffect } from "react";
import { validateEmail } from '../../utils/validation';


const Login = ({ onLogin, isLoggedIn, apiErrors }) => {
    const { values, handleChange, errors, isValid } = useFormAndValidation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/movies');
        }
    }, [isLoggedIn]);

    const handlerSubmitAuthUser = (e) => {
        e.preventDefault();
        onLogin(values);
    };

    return (
        <main className="auth-page">
            <section className="auth">
                <Link to="/" className="auth__logo" />
                <h1 className="auth__title">Рады видеть!</h1>
                <form className="auth-form" onSubmit={handlerSubmitAuthUser}>
                    <label className="auth-form__label">E-mail</label>
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

                    <span className="form__api-error">{apiErrors.login.errorText}</span>
                    <button
                        type="submit"
                        className="auth-form__submit auth-form__submit_type_login"
                        disabled={!isValid}
                    >
                        Войти
                    </button>
                </form>
                <p className="auth__subtitle">
                    Ещё не зарегистрированы?
                    <Link to="/signup" className="auth__link">
                        Регистрация
                    </Link>
                </p>
            </section>
        </main>
    )
}

export default Login;
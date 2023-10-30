import { Link } from "react-router-dom";
import './Login.css';

const Login = () => {
    return (
        <main className="auth-page">
            <section className="auth">
                <Link to="/" className="auth__logo" />
                <h1 className="auth__title">Рады видеть!</h1>
                <form className="auth-form">
                    <label className="auth-form__label">E-mail</label>
                    <input
                        className="auth-form__input"
                        type="email"
                        name="email"
                        placeholder="Введите почту"
                        // value={values.name || ''}
                        minLength="2"
                        maxLength="30"
                        required
                    />
                    <span className="auth-form__input-error"></span>
                    <label className="auth-form__label">Пароль</label>
                    <input
                        className="auth-form__input"
                        type="password"
                        name="password"
                        placeholder="Введите пароль"
                        // value={values.name || ''}
                        minLength="2"
                        maxLength="30"
                        required
                    />
                    <span className="auth-form__input-error" />
                    <button
                        type="submit"
                        className="auth-form__submit auth-form__submit_type_login"
                    // disabled={!isValid}
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
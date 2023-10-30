import { Link } from "react-router-dom";
import './Register.css';

const Register = () => {
    return (
        <main className="auth-page">
            <section className="auth">
                <Link to="/" className="auth__logo" />
                <h1 className="auth__title">Добро пожаловать!</h1>
                <form className="auth-form">
                    <label className="auth-form__label">Имя</label>
                    <input
                        className="auth-form__input"
                        type="text"
                        name="name"
                        placeholder="Введите имя"
                        // value={values.name || ''}
                        minLength="2"
                        maxLength="30"
                        required
                    />
                    <span className="auth-form__input-error"></span>
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
                    <span className="auth-form__input-error">Что-то пошло не так...</span>
                    <button
                        type="submit"
                        className="auth-form__submit"
                    // disabled={!isValid}
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
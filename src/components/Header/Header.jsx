import { Link } from "react-router-dom"
import './Header.css';
import Navigation from "../Navigation/Navigation";

const Header = ({ isLoggedIn }) => {
    return (
        <header className="header">
            <Link className="header__logo" to="/" />
            {isLoggedIn ? (
                <Navigation />
            ) : (
                <nav className="header__auth">
                    <ul className="header__auth-links">
                        <li>
                            <Link className="header__auth-link" to="/signup">Регистрация</Link>
                        </li>
                        <li>
                            <Link className="header__auth-link header__auth-link_btn" to="/signin">Войти</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </header>
    )
}

export default Header;
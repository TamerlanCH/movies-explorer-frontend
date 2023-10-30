import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer__description">Учебный проект Яндекс.Практикум х BeatFilm.</p>
            <div className="footer__container">
                <p className="footer__copyright">&copy; {new Date().getFullYear()}</p>
                <ul className="footer__links">
                    <li>
                        <a className="footer__link"
                            href="https://practicum.yandex.ru/"
                            target="_blank"
                            rel="noreferrer">Яндекс.Практикум</a>
                    </li>
                    <li>
                        <a className="footer__link"
                            href="https://github.com/TamerlanCH"
                            target="_blank"
                            rel="noreferrer">Github</a>
                    </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
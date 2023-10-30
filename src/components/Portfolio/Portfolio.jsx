import './Portfolio.css';
import Arrow from '../../images/arrow.svg';

const Portfolio = () => {
    return (
        <section className="portfolio">
            <h3 className="portfolio__section-title">Портфолио</h3>

            <div className="portfolio__links">
                <a
                    className="portfolio__link"
                    href="https://github.com/TamerlanCH/how-to-learn"
                    target="_blank"
                    rel="noreferrer">
                    <span>Статичный сайт</span>
                    <img
                        className="portfolio__link-img"
                        src={Arrow}
                        alt="Ссылка на внешний сайт" />
                </a>

                <a
                    className="portfolio__link"
                    href="https://github.com/TamerlanCH/russian-travel"
                    target="_blank"
                    rel="noreferrer">
                    <span>Адаптивный сайт</span>
                    <img
                        className="portfolio__link-img"
                        src={Arrow}
                        alt="Ссылка на внешний сайт" />
                </a>

                <a
                    className="portfolio__link"
                    href="https://github.com/TamerlanCH/react-mesto-auth"
                    target="_blank"
                    rel="noreferrer">
                    <span>Одностраничное приложение</span>
                    <img
                        className="portfolio__link-img"
                        src={Arrow}
                        alt="Ссылка на внешний сайт" />
                </a>
            </div>
        </section>
    );
};

export default Portfolio;
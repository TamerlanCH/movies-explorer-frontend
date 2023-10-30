import './AboutProject.css';

const AboutProject = () => {
    return (
        <section className="about-project" id="about-project">
                <h2 className="about-project__title">О проекте</h2>
                <ul className="about-project__container">
                    <li className="about-project__description">
                        <h3 className="about-project__description-title">Дипломный проект включал 5 этапов</h3>
                        <p className="about-project__description-text">Составление плана, работу над бэкендом, вёрстку,
                            добавление функциональности и финальные доработки.</p>
                    </li>
                    <li className="about-project__description">
                        <h3 className="about-project__description-title">На выполнение диплома ушло 5 недель</h3>
                        <p className="about-project__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые
                            нужно было соблюдать, чтобы успешно защититься.</p>
                    </li>
                </ul>
                <div className="about-project__daration">
                    <div className="about-project__daration-backend">
                        <h4 className="about-project__daration-title">1 неделя</h4>
                        <p className="about-project__daration-description">Back-end</p>
                    </div>
                    <div className="about-project__daration-frontend">
                        <h4 className="about-project__daration-title about-project__daration-title_type_gray">4 недели</h4>
                        <p className="about-project__daration-description">Front-end</p>
                    </div>
                </div>
            </section>
    )
}

export default AboutProject;
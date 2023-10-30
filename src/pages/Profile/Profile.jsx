import './Profile.css';

const Profile = () => {
    return (
        <main className="profile-page">
            <section className="auth profile">
                <h1 className="profile__title">Привет, Виталий!</h1>
                <form className="profile-form">
                    <label className="profile-form__label">
                        Имя
                        <input
                            className="profile-form__input profile-form__input_type_email"
                            type="text"
                            value="Виталий"
                            placeholder="Введите имя"
                            minLength="2"
                            maxLength="40"
                            required
                        />
                    </label>
                    <span className="profile-form__input-error"></span>
                    <label className="profile-form__label">
                        Email
                        <input
                            className="profile-form__input profile-form__input_type_email"
                            type="email"
                            value="pochta@yandex.ru"
                            placeholder="Введите почту"
                            minLength="2"
                            maxLength="40"
                            required
                        />
                    </label>
                    <span className="profile-form__input-error"></span>
                    <button
                        type="submit"
                        className="profile-form__button profile-form__button-edit"
                    >
                        Редактировать
                    </button>
                    <button
                        type="submit"
                        className="profile-form__button profile-form__button-signout"
                    >
                        Выйти из аккаунта
                    </button>
                </form>
            </section>
        </main>
    )
}

export default Profile;
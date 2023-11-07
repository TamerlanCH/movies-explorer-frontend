import './Profile.css';
import { useContext, useEffect, useState } from 'react';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { validateEmail } from '../../utils/validation';

const Profile = ({ onSignOut, onUpdateUser, apiErrors }) => {
    const { currentUser } = useContext(CurrentUserContext);
    const { values, handleChange, errors, isValid, setValues } =
        useFormAndValidation();
    const [isProfileSaved, setIsProfileSaved] = useState(false);
    const [isProfileChanged, setIsProfileChanged] = useState(false);

    useEffect(() => {
        if (currentUser) {
            setValues(currentUser);
        }
    }, [currentUser, setValues]);

    useEffect(() => {
        setIsProfileChanged(
          currentUser.name !== values.name || currentUser.email !== values.email
        );
      }, [currentUser, values]);    

    const handleSumbitSetUserInfo = (e) => {
        e.preventDefault();
        onUpdateUser(values);
        setIsProfileSaved(true);
    };

    return (
        <main className="profile-page">
            <section className="auth profile">
                <h1 className="profile__title">Привет, {currentUser.name}!</h1>
                <form className="profile-form" onSubmit={handleSumbitSetUserInfo}>
                    <label className="profile-form__label">
                        Имя
                        <input
                            className="profile-form__input profile-form__input_type_name"
                            type="text"
                            name="name"
                            value={values.name || ''}
                            onChange={handleChange}
                            placeholder="Введите имя"
                            minLength="2"
                            maxLength="40"
                            required
                        />
                    </label>
                    <span className="profile-form__input-error">{errors.name}</span>
                    <label className="profile-form__label">
                        Email
                        <input
                            className="profile-form__input profile-form__input_type_email"
                            type="email"
                            name="email"
                            value={values.email || ''}
                            onChange={handleChange}
                            placeholder="Введите почту"
                            minLength="2"
                            maxLength="40"
                            required
                        />
                    </label>
                    <span className="profile-form__input-error">{validateEmail(values.email).message}</span>
                    <div className="profile-form__submit-container">
                        {apiErrors.profile && !isProfileSaved && (
                            <span className="profile-form__error-message">
                                {apiErrors.profile.errorText === 'Validation failed'
                                    ? apiErrors.profile.joiMessage
                                    : apiErrors.profile.errorText}
                            </span>
                        )}
                        {isProfileSaved && (
                            <span className="profile-form__success-message">
                                Профиль успешно обновлен!
                            </span>
                        )}
                        <button
                            disabled={!isValid || !isProfileChanged || validateEmail(values.email).invalid}
                            className="profile-form__button profile-form__button-edit"
                        >
                            Редактировать
                        </button>
                        <button
                            onClick={onSignOut}
                            className="profile-form__button profile-form__button-signout"
                        >
                            Выйти из аккаунта
                        </button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default Profile;
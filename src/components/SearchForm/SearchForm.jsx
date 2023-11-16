import { useEffect, useState } from 'react';
import './SearchForm.css';
import Search from '../../images/search-btn.svg';

const SearchForm = ({ onFilter, searchQuery, filteredMovies }) => {
    const isChecked = JSON.parse(localStorage.getItem('filterCheckBox'));
    const [isShortFilmChecked, setIsShortFilmChecked] = useState(isChecked);
    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (searchQuery.searchText) {
            setSearchText(searchQuery.searchText);
        }
    }, [searchQuery.searchText]);

    useEffect(() => {
        setIsShortFilmChecked(searchQuery.isShortFilmChecked || false);
    }, [searchQuery.isShortFilmChecked]);

    const checkFilterBox = () => {
        const newIsShortFilmChecked = !isShortFilmChecked;
        setIsShortFilmChecked(newIsShortFilmChecked);
        localStorage.setItem('filterCheckBox', JSON.stringify(newIsShortFilmChecked));

        if (filteredMovies.length > 0) {
            onFilter({ searchText, isShortFilmChecked: newIsShortFilmChecked });
          }
        
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (searchText.trim() === '') {
            setError('Нужно ввести ключевое слово');
        } else {
            setError('');
            onFilter({ searchText, isShortFilmChecked });
        }
    };

    return (
        <section className="search">
            <form className='search-form' onSubmit={onSubmit} noValidate>
                <div className='search-form__inner'>
                    <input
                        type='text'
                        name='film-search'
                        placeholder='Фильм'
                        required
                        minLength='3'
                        maxLength='300'
                        className='search-form__input'
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
                    />
                    <button
                        type='submit'
                        className='search-form__button'
                    >
                        <img
                            className="search-form__button-img"
                            src={Search}
                            alt="Ссылка на внешний сайт" />
                    </button>
                </div>
                {error && <p className="search-form__error">{error}</p>}
                <div className='search-form__toggle'>
                    <input
                        className='search-form__toggle-checkbox-invisible'
                        type='checkbox'
                        name='short-films'
                        id='short-films'
                        onChange={checkFilterBox}
                        checked={isShortFilmChecked}
                    />
                    <label className='search-form__toggle-label' htmlFor='short-films'>
                        <span className={`search-form__toggle-checkbox-visible ${isShortFilmChecked && 'search-form__toggle-checkbox-visible_checked'}`} />
                        Короткометражки
                    </label>
                </div>
            </form>
        </section>
    );
};

export default SearchForm;
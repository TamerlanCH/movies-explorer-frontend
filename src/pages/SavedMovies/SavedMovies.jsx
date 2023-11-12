import { useEffect, useState } from "react";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import SearchForm from "../../components/SearchForm/SearchForm";
import './SavedMovies.css';

const SavedMovies = ({ savedMovies, onDeleteMovie }) => {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const searchedMovies = localStorage.getItem('searchedSavedMovies');
    const [searchQuery, setSearchQuery] = useState({});

    useEffect(() => {
        if (searchedMovies) {
            setFilteredMovies(JSON.parse(searchedMovies));
        } else {
            setFilteredMovies(savedMovies);
        }
    }, [searchedMovies, savedMovies]);

    const filterMovies = (query) => {

        let filtered = [];
        if (query.isShortFilmChecked) {
            filtered = savedMovies.filter((m) => {
                return (
                    m.duration <= 40 &&
                    m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase())
                );
            });
            setFilteredMovies(filtered);
            // localStorage.setItem('searchedSavedMovies', JSON.stringify(filtered));
        } else if (!query.isShortFilmChecked) {
            filtered = savedMovies.filter((m) => {
                return m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase());
            });
            setFilteredMovies(filtered);
            // localStorage.setItem('searchedSavedMovies', JSON.stringify(filtered));
        }
    };

    const handleResetInput = () => {
        setFilteredMovies(savedMovies);
        setSearchQuery({});
        // localStorage.removeItem('searchedSavedMovies');
    };

    return (
        <main className="saved-movies">
            <SearchForm
                onFilter={filterMovies}
                searchQuery={searchQuery}
                onResetInput={handleResetInput}
                filteredMovies={filteredMovies}
            />
            {filteredMovies.length ? (
                <MoviesCardList movies={filteredMovies} onDeleteMovie={onDeleteMovie} isSavedMoviesPage={true}/>
            ) : (
                searchedMovies && (
                    <p className="movies__not-found">
                        По вашему запросу ничего не найдено
                    </p>
                )
            )}
        </main>
    )
}
export default SavedMovies;
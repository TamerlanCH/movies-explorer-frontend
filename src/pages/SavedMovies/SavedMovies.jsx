import { useEffect, useState } from "react";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import SearchForm from "../../components/SearchForm/SearchForm";
import Preloader from "../../components/Preloader/Preloader";
import './SavedMovies.css';

const SavedMovies = ({ savedMovies, onDeleteMovie }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    const [filteredMovies, setFilteredMovies] = useState([]);
    const searchedMovies = localStorage.getItem('searchedSavedMovies');
    const queries = localStorage.getItem('searchQuerySavedMovies');
    const [searchQuery, setSearchQuery] = useState({});

    useEffect(() => {
        if (searchedMovies) {
            setFilteredMovies(JSON.parse(searchedMovies));
        } else {
            setFilteredMovies(savedMovies);
        }
    }, [searchedMovies, savedMovies, searchQuery]);

    useEffect(() => {
        if (queries) {
            setSearchQuery(JSON.parse(queries));
        } else {
            setSearchQuery({ ...queries, searchText: '' });
        }
    }, [queries, savedMovies]);

    const filterMovies = (query) => {
        localStorage.setItem('searchQuerySavedMovies', JSON.stringify(query));

        let filtered = [];
        if (query.isShortFilmChecked) {
            filtered = savedMovies.filter((m) => {
                return (
                    m.duration <= 40 &&
                    m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase())
                );
            });
            setFilteredMovies(filtered);
            localStorage.setItem('searchedSavedMovies', JSON.stringify(filtered));
        } else if (!query.isShortFilmChecked) {
            filtered = savedMovies.filter((m) => {
                return m.nameRU.toLowerCase().trim().includes(query.searchText.toLowerCase());
            });
            setFilteredMovies(filtered);
            localStorage.setItem('searchedSavedMovies', JSON.stringify(filtered));
        }
    };

    const handleResetInput = () => {
        setFilteredMovies(savedMovies);
        setSearchQuery({});
        localStorage.removeItem('searchedSavedMovies');
        localStorage.removeItem('searchQuerySavedMovies');
    };

    return (
        <main className="saved-movies">
            <SearchForm
                onFilter={filterMovies}
                searchQuery={searchQuery}
                onResetInput={handleResetInput}
            />
            {isLoading ? <Preloader /> : (
                <>
                    <MoviesCardList movies={filteredMovies} onDeleteMovie={onDeleteMovie} />
                </>
            )}
        </main>
    )
}

export default SavedMovies;
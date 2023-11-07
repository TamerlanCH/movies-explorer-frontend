import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import Preloader from "../../components/Preloader/Preloader";
import './Movies.css';
import { useEffect, useState } from "react";
import { moviesApi } from '../../utils/MoviesApi';

const Movies = ({ savedMovies, onLikeMovie }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const searchedMovies = localStorage.getItem('searchedMovies');
    const queries = localStorage.getItem('searchQueryMovies');
    const [searchQuery, setSearchQuery] = useState({});

    useEffect(() => {
        if (searchedMovies) {
            setFilteredMovies(JSON.parse(searchedMovies));
        }
    }, [searchedMovies]);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);

        moviesApi.getMovies().then((data) => {
            setMovies(data);
        });
    }, []);

    useEffect(() => {
        if (queries) {
            setSearchQuery(JSON.parse(queries));
        }
    }, [queries]);

    const filterMovies = (query) => {
        localStorage.setItem('searchQueryMovies', JSON.stringify(query));

        let filtered = [];
        if (query.isShortFilmChecked) {
            filtered = movies.filter((m) => {
                return (
                    m.duration <= 40 &&
                    m.nameRU.toLowerCase().trim().includes(query.searchText)
                );
            });
            setFilteredMovies(filtered);
            localStorage.setItem('searchedMovies', JSON.stringify(filtered));
        } else if (!query.isShortFilmChecked) {
            filtered = movies.filter((m) => {
                return m.nameRU.toLowerCase().trim().includes(query.searchText);
            });
            setFilteredMovies(filtered);
            localStorage.setItem('searchedMovies', JSON.stringify(filtered));
        }
    };

    const handleResetInput = () => {
        setFilteredMovies([]);
        setSearchQuery({});
        localStorage.removeItem('searchedMovies');
        localStorage.removeItem('searchQueryMovies');
    };

    return (
        <main className="movies-page">
            <SearchForm
                onFilter={filterMovies}
                searchQuery={searchQuery}
                onResetInput={handleResetInput}
            />
            {isLoading ? <Preloader /> : (
                <>
                    {filteredMovies.length ? (
                        <MoviesCardList
                            movies={filteredMovies}
                            savedMovies={savedMovies}
                            onLikeMovie={onLikeMovie}
                        />
                    ) : (
                        searchedMovies && (
                            <p className="movies__not-found">
                                По вашему запросу ничего не найдено
                            </p>
                        )
                    )}
                </>
            )}
        </main>
    )
}

export default Movies;
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import Preloader from "../../components/Preloader/Preloader";
import './Movies.css';

import { useEffect, useState } from "react";
import { moviesApi } from '../../utils/MoviesApi';

const Movies = ({ savedMovies, onLikeMovie }) => {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const searchedMovies = localStorage.getItem('searchedMovies');
    const queries = localStorage.getItem('searchQueryMovies');
    const [searchQuery, setSearchQuery] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        moviesApi.getMovies().then((movies) => {
            setMovies(movies);
        });
    }, []);

    useEffect(() => {
        if (searchedMovies) {
            setFilteredMovies(JSON.parse(searchedMovies));
        }
    }, [searchedMovies]);

    useEffect(() => {
        if (queries) {
            setSearchQuery(JSON.parse(queries));
        }
    }, [queries]);

    const filterMovies = (query) => {
        if (!filteredMovies.length) {
            setIsLoading(true);
        }

        setTimeout(
            () => {
                let filtered = [];
                localStorage.setItem('searchQueryMovies', JSON.stringify(query));

                if (query.isShortFilmChecked) {
                    filtered = movies.filter((m) => {
                        return (
                            m.duration <= 40 &&
                            m.nameRU
                                .toLowerCase()
                                .trim()
                                .includes(query.searchText.toLowerCase())
                        );
                    });

                    setFilteredMovies(filtered);
                    localStorage.setItem('searchedMovies', JSON.stringify(filtered));
                } else if (!query.isShortFilmChecked) {
                    filtered = movies.filter((m) => {
                        return m.nameRU
                            .toLowerCase()
                            .trim()
                            .includes(query.searchText.toLowerCase());
                    });

                    setFilteredMovies(filtered);
                    localStorage.setItem('searchedMovies', JSON.stringify(filtered));
                }
                setIsLoading(false)
            },
            filteredMovies.length ? 0 : 300
        );
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
                filteredMovies={filteredMovies}
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

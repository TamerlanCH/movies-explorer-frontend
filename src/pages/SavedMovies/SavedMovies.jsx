import { useEffect, useState } from "react";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import SearchForm from "../../components/SearchForm/SearchForm";
import Preloader from "../../components/Preloader/Preloader";
import './SavedMovies.css';

const SavedMovies = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    return (
        <main className="saved-movies">
            <SearchForm />
            {isLoading ? <Preloader /> : (
                <>
                    <MoviesCardList />
                </>
            )}
        </main>
    )
}

export default SavedMovies;
import SearchForm from "../../components/SearchForm/SearchForm";
import MoviesCardList from "../../components/MoviesCardList/MoviesCardList";
import Preloader from "../../components/Preloader/Preloader";
import './Movies.css';
import { useEffect, useState } from "react";

const Movies = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 2000);
    }, []);

    return (
        <main className="movies-page">
            <SearchForm />
            {isLoading ? <Preloader /> : (
                <>
                    <MoviesCardList />
                    <button className="movies__more-btn">Ещё</button>
                </>
            )}
        </main>
    )
}

export default Movies;
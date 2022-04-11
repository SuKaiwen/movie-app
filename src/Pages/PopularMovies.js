import React, {useState, useEffect} from 'react';

// Components
import PopularMoviesGrid from '../Components/PopularMoviesGrid';
import TopMovieCard from '../Components/TopMovieCard';

function PopularMovies(props) {

    const [popularMovies, setPopularMovies] = useState([]);
    const [mostPopular, setMostPopular] = useState([]);
    const [load, setLoad] = useState(true);

    // Get popular movies API
    useEffect(() => {
        try {
            async function fetchPopularMovies(){
                let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
                if(response.status !== 200){
                    console.log(response.status);
                    setLoad(false);
                }else{
                    response = await response.json();
                    let results = response.results;
                    setMostPopular(results.shift());
                    setPopularMovies(results);
                    setLoad(true);
                }   
            }
            fetchPopularMovies();
        }catch(error){
            setLoad(false);
        }

        return () => {
            setLoad(false);
            setMostPopular([]);
            setPopularMovies([]);    
        };
    }, []);

    return (
        <div>
            {load ?
                <div className = "page-container">
                    {/* Card displaying the current most popular movie */}
                    <TopMovieCard
                        mostPopular = {mostPopular}
                    />
                    <div className = "main-title">
                        <h1>Other Popular Movies</h1>
                    </div>

                    {/* Grid displaying other popular movies */}
                    <PopularMoviesGrid 
                        popularMovies = {popularMovies}
                    />
                </div>
            : <div className = "page-container">
                <div className = "main-title">
                    <h1>Woops... Something went wrong!</h1>
                </div>
            </div>
            }
        </div>
    );
}

export default PopularMovies;
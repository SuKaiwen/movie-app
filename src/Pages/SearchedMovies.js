import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function SearchedMovies(props) {

    const [keyword, setKeyword] = useState("");
    
    if(keyword == ""){
        // Get the query string...
        const params = new Proxy(new URLSearchParams(window.location.search), {
            get: (searchParams, prop) => searchParams.get(prop),
        });
        // Get the value of "keyword" in eg "https://example.com/?keyword=some_value"
        setKeyword(params.keyword); // "some_value"
    }

    const [movies, setMovies] = useState([]);
    const [load, setLoad] = useState(false);

    // Search a movie
    useEffect(() => {
        async function searchMovies(){
            let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}&api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1&include_adult=false`);
            response = await response.json();
            let results = response.results;
            for(var x = 0; x < results.length; x++){
                if(results[x].backdrop_path === null){
                    results.splice(x, 1);
                    x--;
                }
            }
            console.log(results);
            setMovies(results);
            setLoad(true);
        }

        searchMovies();

        return () => {
            setLoad(false);
            setMovies([]);    
        };
    }, []);

    return (
        <div>
            {load ? 
                <div className = "page-container">
                    <div className = "main-title">
                        <h1>Results for keyword: {keyword}</h1>
                    </div>
                    <div className = "movie-grid">
                        {movies.map(movie => (
                            <div className = "movie-card">
                                <div className = "card-image">
                                    <img src={`https://image.tmdb.org/t/p/w185/${movie.poster_path}`} alt = ""/>
                                </div>   
                                <div className = "card-info">
                                    <h1>{movie.original_title}</h1>
                                    <div className = "row-box">
                                        <i class="fas fa-star fa-2x"></i>
                                        <h1>{movie.vote_average}/10</h1>
                                        <p>{movie.vote_count} votes</p>
                                    </div>
                                    <div className = "row-box">
                                        <p>{movie.release_date}</p>
                                        <p>{movie.original_language}</p>
                                    </div>
                                    <p>{movie.overview}</p>
                                    <div className = "row-box">
                                        <Link to={`/movie-info/${movie.id}`}><button>More Info</button></Link>
                                    </div>
                                </div>     
                            </div>
                        ))}
                    </div>
                </div>
            : <div className = "page-container">
                    <div className = "main-title">
                        <h1>No search results for {keyword}</h1>
                    </div>
                </div>
            }
        </div>
    );
}

export default SearchedMovies;
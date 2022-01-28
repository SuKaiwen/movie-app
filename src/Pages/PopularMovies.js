import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import '../CSS/global.css'
import '../CSS/popular.css'

function PopularMovies(props) {

    const [popularMovies, setPopularMovies] = useState([]);

    const [mostPopular, setMostPopular] = useState([]);

    // Get popular movies API
    useEffect(() => {
        async function fetchPopularMovies(){
            let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`);
            response = await response.json();
            console.log(response);
            let results = response.results;
            setMostPopular(results.shift());
            setPopularMovies(results);
        }

        fetchPopularMovies();
    }, []);

    return (
        <div>
            {popularMovies.length > 0 &&
                <div className = "page-container">
                    <div className = "main-title">
                        <h1>Popular Now</h1>
                    </div>
                    <div className = "main-card">
                        <div className = "main-image">
                            <img src = {`https://image.tmdb.org/t/p/original/${mostPopular.backdrop_path}`} alt = "" />
                        </div>
                        <div className = "main-info">
                            <h1>#1</h1>
                            <h1>{mostPopular.original_title}</h1>
                            <div className = "row-box">
                                <i class="fas fa-star fa-2x"></i>
                                <h1>{mostPopular.vote_average}/10</h1>
                                <p>{mostPopular.vote_count} votes</p>
                            </div>
                            <div className = "row-box">
                                <p>{mostPopular.release_date}</p>
                                <p>{mostPopular.original_language}</p>
                            </div>
                            <p>{mostPopular.overview}</p>
                            <div className = "row-box">
                                <Link to={`/movie-info/${mostPopular.id}`}><button>More Info</button></Link>
                                <button>Similar Movies</button>
                            </div>
                        </div>
                    </div>
                    <div className = "main-title">
                        <h1>Other Popular Movies</h1>
                    </div>
                    <div className = "movie-grid">
                        {popularMovies.map(movie => (
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
                                        <button>Similar Movies</button>
                                    </div>
                                </div>     
                            </div>
                        ))}
                    </div>
                    
                </div>
            }
        </div>
    );
}

export default PopularMovies;
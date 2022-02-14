import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

function Genre(props) {
    const { slug } = useParams();

    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);
    const [load, setLoad] = useState(false);

    // Get list of Genres to get the genre names
    useEffect(() => {
        async function fetchGenres(){
            try {
                let response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                response = await response.json();
                for(var x in response.genres){
                    if(slug === response.genres[x].id.toString()){
                        
                        setGenre(response.genres[x].name);
                    }
                }
                setLoad(true);
            }catch(error){
                setLoad(false);
            }
        }
        fetchGenres();

        return () => {
            setLoad(false);
            setGenre([]);    
        };
    }, []);

    // Get movie list from genre API
    // Uses the genre ID which is contained in the slug
    useEffect(() => {
        async function fetchGenreMovies(){
            try {
                let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${slug}`);
                response = await response.json();
                console.log(response.results);
                setMovies(response.results);
                setLoad(true);
            }catch(error){
                setLoad(false);
            }   
        }
        fetchGenreMovies();

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
                        <h1>{genre} Movies</h1>
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
                        <h1>Woops! Invalid Genre ID</h1>
                    </div>
                </div>
            }
        </div>
    );
}

export default Genre;
import React from 'react';

import { Link } from 'react-router-dom';

function PopularMoviesGrid(props) {
    return (
        <div className = "movie-grid">
            {props.popularMovies.map(movie => (
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
    );
}

export default PopularMoviesGrid;
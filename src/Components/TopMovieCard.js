import React from 'react';
import { Link } from 'react-router-dom';

function TopMovieCard(props) {
    return (
        <div className = "main-card" style = {{
                                            backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 30%, rgba(18, 18, 18, 1) 100%), url(" + `https://image.tmdb.org/t/p/original/${props.mostPopular.backdrop_path}` + ")",
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: "100% 100%"
                                            }}>
            <div className = "main-image">
                <img src = {`https://image.tmdb.org/t/p/original/${props.mostPopular.backdrop_path}`} alt = "" />
            </div>
            <div className = "main-info">
                <h1>#1</h1>
                <h1>{props.mostPopular.original_title}</h1>
                <div className = "row-box">
                    <i class="fas fa-star fa-2x"></i>
                    <h1>{props.mostPopular.vote_average}/10</h1>
                    <p>{props.mostPopular.vote_count} votes</p>
                </div>
                <div className = "row-box">
                    <p>{props.mostPopular.release_date}</p>
                    <p>{props.mostPopular.original_language}</p>
                </div>
                <p>{props.mostPopular.overview}</p>
                <div className = "row-box">
                    <Link to={`/movie-info/${props.mostPopular.id}`}><button>More Info</button></Link>
                </div>
            </div>
        </div>
    );
}

export default TopMovieCard;
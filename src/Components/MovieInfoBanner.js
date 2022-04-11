import React from 'react';

function MovieInfoBanner(props) {
    return (
        <div className = "banner">
            <img src = {`https://image.tmdb.org/t/p/original/${props.backdrop}`} alt = "" className = "gradient"/>
            <div className = "title">
                <h1>{props.title}</h1>
                <div className = "row-box">
                    <i class="fas fa-star fa-2x"></i>
                    <h1>{props.vote_average}/10</h1>
                    <p>{props.vote_count} votes</p>
                </div>
            </div>
        </div>
    );
}

export default MovieInfoBanner;
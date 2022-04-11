import React from 'react';

function MovieInfoContent(props) {
    return (
        <div className = "movie-info-col">
            <div className = "info">
                <h1 className = "subheading">Details</h1>
                <div className = "grid">
                    {props.subInfo.map(info => {return (
                        <div className = "grid-card">
                            <p className = "bold">{info.name}</p>
                            <p>{info.value}</p>
                        </div>
                    )})
                    }
                </div>
                <h1 className = "subheading">Genres</h1>
                {props.genres?.map((genre) => <button className = "genre">{genre.name}</button>)}
                <h1 className = "subheading">Overview</h1>
                <div className = "text-box">
                    <p>{props.overview}</p>
                </div>
                <a href={props.homepage}><button>Official Site</button></a>
                <h1 className = "subheading">Cast</h1>
                <div className = "row-box">
                    {props.credits?.map((person) => {return(
                        <div className = "company-container">
                            <img className = "actor-image" src = {`https://image.tmdb.org/t/p/original/${person.profile_path}`} alt = "" />
                            <p>{person.name}</p>
                            <p>{person.character}</p>
                        </div>
                    )})}
                </div>
                <h1 className = "subheading">Production Teams</h1>
                <div className = "row-box">
                    {props.production_companies?.map((company) => {return(
                        <div className = "company-container">
                            <img className = "company-logo" src = {`https://image.tmdb.org/t/p/original/${company.logo_path}`} alt = "" />
                            <p>{company.name}</p>
                        </div>
                    )})}
                </div>
                <a href="/"><button><i class="fas fa-arrow-left"></i> Back to Home</button></a>
            </div>
            <div className = "image">
                <img src = {`https://image.tmdb.org/t/p/original/${props.poster_path}`} alt = "" />
            </div>
        </div> 
    );
}

export default MovieInfoContent;
import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

import '../CSS/movieInfo.css';
import '../CSS/global.css';

function MovieInfo(props) {
    const { slug } = useParams();
    console.log(slug);

    const [movieInfo, setMovieInfo] = useState([]);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        async function fetchMovieInfo(){
            let response = await fetch(`https://api.themoviedb.org/3/movie/${slug}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            response = await response.json();
            console.log(response);
            setMovieInfo(response);
        }
        fetchMovieInfo();
        setLoad(true);

        return () => {
            setLoad(false);
            setMovieInfo([]);    
        };
    }, []);

    return (
        <div>
            {load && 
                <div className = "page-container">
                    <div className = "movie-info-container">
                        <div className = "banner">
                            <img src = {`https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path}`} alt = "" />
                        </div>
                        <div className = "movie-info-col">
                            <div className = "info">
                                <h1>{movieInfo.original_title}</h1>
                                <div className = "row-box">
                                    <i class="fas fa-star fa-2x"></i>
                                    <h1>{movieInfo.vote_average}/10</h1>
                                    <p>{movieInfo.vote_count} votes</p>
                                </div>
                                <h1 className = "subheading">Details</h1>
                                <div className = "grid">
                                    <div className = "grid-card">
                                        <p className = "bold">Release Date</p>
                                        <p>{movieInfo.release_date}</p>
                                    </div>
                                    <div className = "grid-card">
                                        <p className = "bold">Language</p>
                                        <p>{movieInfo.original_language}</p>
                                    </div>
                                    <div className = "grid-card">
                                        <p className = "bold">Duration</p>
                                        <p>{movieInfo.runtime} min</p>
                                    </div>
                                    <div className = "grid-card">
                                        <p className = "bold">Tagline</p>
                                        <p>{movieInfo.tagline}</p>
                                    </div>
                                    <div className = "grid-card">
                                        <p className = "bold">Budget</p>
                                        <p>${movieInfo.budget}</p>
                                    </div>
                                    <div className = "grid-card">
                                        <p className = "bold">Revenue</p>
                                        <p>${movieInfo.revenue}</p>
                                    </div>
                                </div>
                                <h1 className = "subheading">Genres</h1>
                                {movieInfo.genres?.map((genre) => {return(<button className = "genre">{genre.name}</button>)})}
                                <h1 className = "subheading">Overview</h1>
                                <div className = "text-box">
                                    <p>{movieInfo.overview}</p>
                                </div>
                                <a href={movieInfo.homepage}><button>Visit Homepage</button></a>
                                <h1 className = "subheading">Production Teams</h1>
                                <div className = "row-box">
                                    {movieInfo.production_companies?.map((company) => {return(
                                        <div>
                                            <img className = "company-logo" src = {`https://image.tmdb.org/t/p/original/${company.logo_path}`} alt = "" />
                                            <p>{company.name}</p>
                                        </div>
                                    )})}
                                </div>
                                <a href="/"><button><i class="fas fa-arrow-left"></i> Back to Home</button></a>
                            </div>
                            <div className = "image">
                                <img src = {`https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`} alt = "" />
                            </div>
                        </div> 
                    </div>
                </div>
            }
        </div>
    );
}

export default MovieInfo;
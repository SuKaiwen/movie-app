import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

function MovieInfo(props) {

    const { slug } = useParams();

    const [movieInfo, setMovieInfo] = useState([]);
    const [subInfo, setSubInfo] = useState([]);
    const [credits, setCredits] = useState([]);
    const [load, setLoad] = useState(false);

    // Get movie info API 
    // Uses the movie ID which is contained in the slug
    useEffect(() => {
        try {
            async function fetchMovieInfo(){
                let response = await fetch(`https://api.themoviedb.org/3/movie/${slug}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                if(response.status != 200){
                    console.log(response.status);
                }else{
                    response = await response.json();
                    setMovieInfo(response);
                    setSubInfo([
                        {
                            name: "Release Date",
                            value: response.release_date
                        }, 
                        {
                            name: "Language",
                            value: response.original_language
                        }, 
                        {
                            name: "Runtime",
                            value: response.runtime + " min", 
                        }, 
                        {
                            name: "Tagline",
                            value: response.tagline 
                        }, 
                        {
                            name: "Budget",
                            value: "$" + response.budget 
                        }, 
                        {
                            name: "Revenue",
                            value: "$" + response.revenue
                        }
                    ]);
                    setLoad(true);
                }
            }
            fetchMovieInfo();
        } catch (error) {
            setLoad(false);
        }
        
        return () => {
            setLoad(false);
            setMovieInfo([]);    
        };
    }, []);

    // Get movie credits API
    useEffect(() => {
        try {
            async function fetchCredits(){
                let response = await fetch(`https://api.themoviedb.org/3/movie/${slug}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                if(response.status != 200){
                    console.log(response.status);
                }else{
                    response = await response.json();
                    setCredits(response.cast.slice(0, 5));
                    setLoad(true);
                }
                
            }
            fetchCredits();
        } catch (error) {
            setLoad(false);
        }
        
        return () => {
            setLoad(false);
            setCredits([]);    
        };
    }, []);

    return (
        <div>
            {load ? 
                <div className = "page-container">
                    <div className = "movie-info-container">
                        <div className = "banner">
                            <img src = {`https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path}`} alt = "" className = "gradient"/>
                            <div className = "title">
                                <h1>{movieInfo.original_title}</h1>
                                <div className = "row-box">
                                    <i class="fas fa-star fa-2x"></i>
                                    <h1>{movieInfo.vote_average}/10</h1>
                                    <p>{movieInfo.vote_count} votes</p>
                                </div>
                            </div>
                        </div>
                        <div className = "movie-info-col">
                            <div className = "info">
                                <h1 className = "subheading">Details</h1>
                                <div className = "grid">
                                    {subInfo.map(info => {return (
                                        <div className = "grid-card">
                                            <p className = "bold">{info.name}</p>
                                            <p>{info.value}</p>
                                        </div>
                                    )})
                                    }
                                </div>
                                <h1 className = "subheading">Genres</h1>
                                {movieInfo.genres?.map((genre) => <button className = "genre">{genre.name}</button>)}
                                <h1 className = "subheading">Overview</h1>
                                <div className = "text-box">
                                    <p>{movieInfo.overview}</p>
                                </div>
                                <a href={movieInfo.homepage}><button>Official Site</button></a>
                                <h1 className = "subheading">Cast</h1>
                                <div className = "row-box">
                                    {credits?.map((person) => {return(
                                        <div className = "company-container">
                                            <img className = "actor-image" src = {`https://image.tmdb.org/t/p/original/${person.profile_path}`} alt = "" />
                                            <p>{person.name}</p>
                                            <p>{person.character}</p>
                                        </div>
                                    )})}
                                </div>
                                <h1 className = "subheading">Production Teams</h1>
                                <div className = "row-box">
                                    {movieInfo.production_companies?.map((company) => {return(
                                        <div className = "company-container">
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
            : <div className = "page-container">
                <div className = "main-title">
                    <h1>Woops... Something went wrong!</h1>
                </div>
            </div>
            }
        </div>
    );
}

export default MovieInfo;
import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

import MovieInfoBanner from '../Components/MovieInfoBanner';
import MovieInfoContent from '../Components/MovieInfoContent';

function MovieInfo(props) {

    const { slug } = useParams();

    const [movieInfo, setMovieInfo] = useState([]);
    const [subInfo, setSubInfo] = useState([]);
    const [credits, setCredits] = useState([]);
    const [load, setLoad] = useState(true);

    // Get movie info API 
    // Uses the movie ID which is contained in the slug
    useEffect(() => {
        try {
            async function fetchMovieInfo(){
                let response = await fetch(`https://api.themoviedb.org/3/movie/${slug}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                if(response.status !== 200){
                    console.log(response.status);
                    setLoad(false);
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
                        <MovieInfoBanner
                            backdrop = {movieInfo.backdrop_path}
                            title = {movieInfo.title}
                            vote_count = {movieInfo.vote_count}
                            vote_average = {movieInfo.vote_average}
                        />
                        <MovieInfoContent
                            subInfo = {subInfo}
                            genres = {movieInfo.genres}
                            overview = {movieInfo.overview}
                            homepage = {movieInfo.homepage}
                            credits = {credits}
                            production_companies = {movieInfo.production_companies}
                            poster_path = {movieInfo.poster_path}
                        />
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
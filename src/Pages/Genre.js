import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

import PopularMoviesGrid from '../Components/PopularMoviesGrid';

function Genre(props) {
    const { slug } = useParams();

    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);
    const [load, setLoad] = useState(true);

    // Get list of Genres by id to get the genre names
    useEffect(() => {
        async function fetchGenres(){
            try {
                let response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                if(response.status !== 200){
                    console.log(response.status);
                    setLoad(false);
                }else{
                    response = await response.json();
                    for(var x in response.genres){
                        if(slug === response.genres[x].id.toString()){
                            
                            setGenre(response.genres[x].name);
                        }
                    }
                    setLoad(true);
                }
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

    // Get movie list for a specific genre
    // Uses the genre ID which is contained in the slug
    useEffect(() => {
        async function fetchGenreMovies(){
            try {
                let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${slug}`);
                if(response.status !== 200){
                    console.log(response.status);
                }else{
                    response = await response.json();
                    setMovies(response.results);
                    setLoad(true);
                }
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
                    <PopularMoviesGrid 
                        popularMovies = {movies}
                    />
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

export default Genre;
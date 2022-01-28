import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";

function MovieInfo(props) {

    const { slug } = useParams();
    console.log(slug);

    const [movieInfo, setMovieInfo] = useState([]);

    useEffect(() => {
        async function fetchMovieInfo(){
            let response = await fetch(`https://api.themoviedb.org/3/movie/${slug}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
            response = await response.json();
            console.log(response);
            let results = response.results;
            setMovieInfo(results);
        }

        fetchMovieInfo()
    }, [])

    return (
        <div>
            <h1>pepe</h1>
        </div>
    );
}

export default MovieInfo;
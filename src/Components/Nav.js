import React, {useState, useEffect} from 'react';

function Nav(props) {

    const [genres, setGenres] = useState([]);
    const [load, setLoad] = useState(false);

    // Get list of Genres
    useEffect(() => {
        async function fetchGenres(){
            try {
                let response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);
                if(response.status != 200){
                    console.log(response.status);
                }else{
                    response = await response.json();
                    setGenres(response.genres);
                    setLoad(true);
                }
            }catch(error){
                setLoad(false);
            }
        }
        fetchGenres();

        return () => {
            setLoad(false);
            setGenres([]);    
        };
    }, []);

    return (
        <div className = "nav">
            <ul>
                <li>
                    <a href = "/"><button><i class="fas fa-database"></i> MovieDB</button></a>
                    <form method="get" action="/search/movies">
                        <input className = "search-bar" type="text" placeholder="Search for a movie..." title="Type in a name" name="keyword"></input>
                    </form>
                </li>
                <li>
                    <a href = "/"><button>Home</button></a>
                    <div>
                        <div class="dropdown">
                            <button class="dropbtn">Genres</button>
                            {load ?
                                <div class="dropdown-content">
                                    {genres.map(genre => {return (
                                        <a href={`/genre/${genre.id}`}>{genre.name}</a>
                                    )})}
                                </div>
                            : <div class="dropdown-content">
                                <p>Failed to load</p>
                            </div>
                            }
                            
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

export default Nav;
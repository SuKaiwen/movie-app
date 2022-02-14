import logo from './logo.svg';

import './CSS/global.css'
import './CSS/popular.css'
import './CSS/movieInfo.css';
import './CSS/nav.css';

import PopularMovies from './Pages/PopularMovies';
import MovieInfo from './Pages/MovieInfo';
import Nav from './Components/Nav';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <PopularMovies />
    </div>
  );
}

export default App;

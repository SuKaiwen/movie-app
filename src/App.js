import logo from './logo.svg';
import './App.css';

import PopularMovies from './Pages/PopularMovies';
import MovieInfo from './Pages/MovieInfo';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <h1>IMovieDB</h1>
      <PopularMovies />
    </div>
  );
}

export default App;

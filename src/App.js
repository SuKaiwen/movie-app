import logo from './logo.svg';
import './App.css';

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

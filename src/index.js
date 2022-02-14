import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Nav from './Components/Nav';
import reportWebVitals from './reportWebVitals';

import { Routes ,Route, BrowserRouter as Router } from 'react-router-dom';
import MovieInfo from './Pages/MovieInfo';
import Genre from './Pages/Genre';
import SearchedMovies from './Pages/SearchedMovies';

ReactDOM.render(
  
  <React.StrictMode>
    <Router>
      <Nav />
      <Routes>
        <Route path='/' element={<App/>} />
        <Route path='/movie-info/:slug' element={<MovieInfo/>} />
        <Route path='/genre/:slug' element={<Genre/>} />
        <Route path='/search/movies' element={<SearchedMovies/>} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

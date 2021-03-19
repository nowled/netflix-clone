import React, { useState, useEffect } from 'react';
import axios from '../axios';
import requests from '../requests';
import './Banner.css';

const Banner = () => {
  //  this state is for whatever random movies gets selected for the header background Image

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchTopRated);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  // A good way to chop off a chunk of text
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(
        "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backdropPosition: 'center center',
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>Great Damn Movies</button>
        </div>

        <h1 className='banner__description'>
          {truncate(movie?.overview, 150)}
        </h1>
        <div className='banner--fadeBottom' />
      </div>
    </header>
  );
};

export default Banner;

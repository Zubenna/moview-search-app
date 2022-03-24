import React, {useEffect, useState} from 'react';
import Style from './Styles/MovieSearchBox.module.css';

const MovieSearchBox = () => {
  
  const [filter, setFilter] = useState('');
  const [movieList, setMovieList] = useState([]);

  const searchItem = (event) => {
    setFilter(event.target.value);
  }

  let searchData = movieList.filter(item => {
    return Object.keys(item).some(key => 
       item[key].toString().toLowerCase().includes(filter.toString().toLowerCase())
      )
  });
  
    const buildList = [];
    const fetchMovies = async () => {
    let page = 1;
    while (page <= 3) {
    const res = await fetch(
      `http://www.omdbapi.com/?s=inception&apikey=38e4604f&page=${page}`
    );
    const movies = await res.json();
    movies.Search.forEach((movie) => buildList.push(movie));
    page++;
    }
    setMovieList(buildList);
  }

    useEffect(() => {
        fetchMovies();
    }, []);

  return (
    <div className={Style.movieContainer}>
      <div className={Style.header}>
       <div className={Style.menuBox} >
           <div className={Style.appTitle}>MyTestApp</div>
       </div>
       <div className={Style.hero}>
         <div className={Style.heroTitle}>Watch something incredible</div>
       </div>
      </div>
      <div className={Style.searchBox}>
        <div className={Style.searchLabel}>
            Search
        </div>
           <input type="text" value={filter} onChange={searchItem.bind(this)}/>
      </div>
      <div className={Style.movieListBox}>
        {searchData.length > 0 && (
        <div className={Style.displayBox}>
          {searchData.map(movie => (
            <div key={movie.imdbID}>
             {movie.Poster !== "N/A" && (
               <div className={Style.PosterBox} style={{ backgroundImage: `url(${movie.Poster})`}}>
                  <div className={Style.movieTitle} >
                     <h4>{movie.Title}</h4>
                  </div>
               </div>
             )}
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  )
}

export default MovieSearchBox;
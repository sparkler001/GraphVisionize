import React, { Component } from 'react';
import Movie from './Movie_helper';
// import './Movie.css';

export class Movie_helper2 extends Component {  
  render() {
    return this.props.movieList.map((eachMovie) => (
      <Movie movie={eachMovie.id} src={eachMovie.src} title={eachMovie.name} director={eachMovie.director} imdb={eachMovie.imdb} enlarge={this.props.enlarge} plot={eachMovie.plot}/>
    ));
  }
}
export default Movie_helper2;

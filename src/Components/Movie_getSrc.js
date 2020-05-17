import React, { Component } from 'react';
const axios = require('axios');

 
export class Movie_helper extends Component {
  constructor(){
    super();
    this.state = {src: '',
                  title: '',
                  imdb: '',
                  director: '',
                  plot: ''
               }
  }

  getMovieInfo(obj, request) {
    axios.get(request)
    .then(function (res) {

      obj.setState({
        src: res.data.Poster,
        title: res.data.Title,
        imdb: res.data.imdbRating,
        director: res.data.Director,
        plot: res.data.Plot
      });
      console.log(res.data);
      console.log("connect correctly");
    })
  }

  render() {
    let request = 'https://www.omdbapi.com/?apikey=2259a45a&i='+this.props.movie;
    
    return(
      <div className='MovieLayout'>
        {this.getMovieInfo(this, request)}
        <img src={this.state.src}  

        onClick={this.props.enlarge.bind(this, this.state.src, this.state.title, this.state.director, this.state.imdb, this.state.plot)} alt={this.state.title}/>
      </div>      
    );
  }
}
export default Movie_helper;
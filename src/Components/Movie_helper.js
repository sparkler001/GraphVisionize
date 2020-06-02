import React, { Component } from 'react';
// import './Movie.css';

const axios = require('axios');

export class Movie_helper extends Component {
  constructor()
  {
    super();
    this.state = { src: '', title: '', imdb: '', plot: '', director: ''}
  }


  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.props.movie !== prevProps.movie) {
      this.render();
    }

    if(this.state.shouldUpdate !== prevState.shouldUpdate){
      this.render();
    }

  }


  render() {
    return(
      <div className='Movie_frame'>
        <img src={this.props.src}
          onClick={this.props.enlarge.bind(this, this.props.src, this.props.title, this.props.director, this.props.imdb, this.props.plot, this.props.movie)} alt={this.state.title}/>
      </div>      
    );
  }
}
export default Movie_helper;

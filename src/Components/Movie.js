import React, { Component } from 'react';
import Movie_getSrc from './Movie_getSrc';
const movies = require('../moviesId.json');


export class Movies extends Component {
  lightBox(image, title, director, rating, plot) {
    document.body.style.overflow = 'hidden';

    var box_pic = document.createElement('img');
    box_pic.id = 'box_pic'; 
    box_pic.src = image;

    var lbox = document.createElement('div');
    lbox.className = 'box_setting';
    lbox.id = 'lbox';

    var box_appearance = document.createElement('div');
    box_appearance.className = 'appearance';
    box_appearance.id = 'box_appearance';

    var box_info = document.createElement('div'); 
    box_info.innerHTML = '<span class=\'title\'>'+ title+
    '</br> <span class=\'rating\'>  IMDB Score: '+ rating +' </span> '+
    '</span><br/><span class=\'director\'> Directed by:  '+ director+
    '</span><br/> <p> Plot: '+plot;
    
    box_info.id = 'box_info';

    document.body.appendChild(lbox);  
    document.getElementById('lbox').appendChild(box_appearance);
    document.getElementById('box_appearance').appendChild(box_pic);
    document.getElementById('box_appearance').appendChild(box_info);

    document.getElementById('lbox').addEventListener('click', function(event) {

      if(event.target.className !== 'box_setting') {
        return;
      }

      document.getElementById('lbox').removeChild(document.getElementById('box_appearance'));
      document.body.removeChild(document.getElementById('lbox'));
      document.body.style.overflow = 'auto';
    });
  }
  
  fetch() {
    let movieList = [];
    for (let movie of movies) {
      movieList.push(movie.id);
    }

    return movieList;
  }
  
  render() {
    let movieList = this.fetch();
    return movieList.map((each) =>(
        <div className='content'>     
            <Movie_getSrc movie={each} enlarge={this.lightBox} />
        </div> 
    ));
  }
}
export default Movies;
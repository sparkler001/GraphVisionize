import React, { Component } from 'react';
import Helper from './Movie_helper2';
import config from '../config.js';
// import './Movie.css';
const firebase = require('firebase');

export class Movie extends Component {
  constructor(props) {
    super();
    this.state = {
      movies: [],
      lists: [],
      currPoint: '',
      lastMov: '',
      movie_choice: '',
      displayButton: 'none',
      shouldUpdate: false,
    }
  }


  componentDidMount(){
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    
    this.ref = firebase.database().ref('movies');
    this.ref.on('value', snapshot => {
      let movies = snapshot.val();
        let newData = [];
        for (let entry in movies) {
          newData.push({
            id:  entry,
            name:  movies[entry].name,
            src:  movies[entry].src,
            director:  movies[entry].director,
            imdb:  movies[entry].imdb,
            plot:  movies[entry].plot,
          })
        }
        
        this.setState({lastMov: newData[newData.length-1]});
        if(newData.length < 9) {
          this.setState({displayButton: 'none'});
        } 
        else {
          this.setState({displayButton: 'block'});
        }
    });

    let first = this.ref.orderByKey().limitToFirst(9);
    first.on('value', snapshot => {
      let movie = snapshot.val();
      let hit_eight = [];
      for (let entry in movie) {
        hit_eight.push({
          id:  entry,
          name:  movie[entry].name,
          src:  movie[entry].src,
          director:  movie[entry].director,
          imdb:  movie[entry].imdb,
          plot:  movie[entry].plot,
        });
      }

      this.setState({currPoint: hit_eight[hit_eight.length-1].id});
      hit_eight.pop();
      this.setState({movies: hit_eight});
    });

    this.listRef = firebase.database().ref('lists');
    this.listRef.on('value', snapshot => {
      let lists = snapshot.val();
        let newData = [];
        for (let entry in lists) {
          newData.push(
            lists[entry].name
          )
        }
        this.setState({lists: newData});
    })
  }


  componentWillUnmount() {
    this.ref.off();
    this.listRef.off();
  }


  searchMovies() {
    let movie_choice = document.getElementById('search').value.toLowerCase();
    let ref = firebase.database().ref('movies');
    ref.once('value').then(snapshot => {
      let movies = snapshot.val();
        let newData = [];
        for (let entry in movies) {
          let title = (movies[entry].name).toLowerCase();
          if (title.includes(movie_choice)) {
            newData.push({
              id:  entry,
              name:  movies[entry].name,
              src:  movies[entry].src,
              director:  movies[entry].director,
              imdb:  movies[entry].imdb,
              plot:  movies[entry].plot,
            })
          }
        }
        if(newData.length < 9) {
          this.setState({displayButton: 'none'});
        } 
        else {
          this.setState({displayButton: 'block'});
        }
        this.setState({movies: newData});
    })
  }


  getMoreMovies() {
    let ref = firebase.database().ref('movies');
    let next = ref.orderByKey().startAt(this.state.currPoint).limitToFirst(9);
    next.on('value', snapshot => {
      let l_movie = snapshot.val();
      let hit_eight = [];
      for (let entry in l_movie) {
        hit_eight.push({
          id:  entry,
          name:  l_movie[entry].name,
          src:  l_movie[entry].src,
          director:  l_movie[entry].director,
          imdb:  l_movie[entry].imdb,
          plot:  l_movie[entry].plot,
        });
      }
      if(hit_eight[hit_eight.length-1].id === this.state.lastMov.id && hit_eight.length <= 8) {
        this.setState({displayButton: 'none'});
      } 
      else {
        this.setState({currPoint: hit_eight[hit_eight.length-1].id});
        hit_eight.pop();
      }
      let m_count = this.state.movies;
      m_count = m_count.concat(hit_eight);
      this.setState({movies: m_count});
    });
  }


  myChangeHandler = (event) => {
    let n = event.target.name;
    let v = event.target.value;
    this.setState({[n]: v});   
    
    let movie_choice = document.getElementById('list').value;
    if(movie_choice === 'all') {
      let ref = firebase.database().ref('movies');
      ref.once('value').then(snapshot => {
        let movies = snapshot.val();
          let newData = [];
          for (let entry in movies) {
            newData.push({
              id:  entry,
              name:  movies[entry].name,
              src:  movies[entry].src,
              director:  movies[entry].director,
              imdb:  movies[entry].imdb,
              plot:  movies[entry].plot,
            })
          }
          this.setState({lastMov: newData[newData.length-1]});
          if(newData.length < 9) {
            this.setState({displayButton: 'none'});
          } 
          else {
            this.setState({displayButton: 'block'});
          }
      });

      
      let first = ref.orderByKey().limitToFirst(9);
      first.once('value').then(snapshot => {
        let l_movie = snapshot.val();
        let hit_eight = [];
        for (let entry in l_movie) {
          hit_eight.push({
            id:  entry,
            name:  l_movie[entry].name,
            src:  l_movie[entry].src,
            director:  l_movie[entry].director,
            imdb:  l_movie[entry].imdb,
            plot:  l_movie[entry].plot,
          });
        }
        this.setState({currPoint: hit_eight[hit_eight.length-1].id});
        hit_eight.pop();
        this.setState({movies: hit_eight});
      });
    } 
    
    
    else {
      let movsInList = [];
      let ref = firebase.database().ref('relations');
      ref.once('value').then(snapshot => {
        let rels = snapshot.val();
        for (let entry in rels) {
          if(rels[entry].list === movie_choice) {
            movsInList.push(rels[entry].mov);
          }
        }
        let movsRef = firebase.database().ref('movies');
        movsRef.once('value').then(snapshot => {
          let movies = snapshot.val();
          let newData = [];
          for (let entry in movies) {
            if (movsInList.includes(entry)) {
              newData.push({
                id:  entry,
                name:  movies[entry].name,
                src:  movies[entry].src,
                director:  movies[entry].director,
                imdb:  movies[entry].imdb,
                plot:  movies[entry].plot,
              })
            }
          }
          if(newData.length < 9) {
            this.setState({displayButton: 'none'});
          } else {
            this.setState({displayButton: 'block'});
          }
          this.setState({movies: newData});
        })
      })
    }
  }


  enlarge(image, title, director, rating, plot, idVal) {
    document.body.style.overflow = 'hidden';
  
    var lightbox = document.createElement('div');
    lightbox.id = 'box';
    lightbox.className = 'box_setting';
    var box_wrap = document.createElement('img');
    box_wrap.src = image;
    box_wrap.id = 'box_wrap';
    var box_appearance = document.createElement('div');
    box_appearance.id = 'box_appearance';
    box_appearance.className = 'appearance'; 
    var box_info = document.createElement('div');
    box_info.id = 'box_info';
    box_info.innerHTML = '<span class=\'title\'>'+title+'</span><br/><span class=\'director\'> Directed by:  '+director+'</span><br/> <p>'+plot+'</p>  <br/><br/>   <span class=\'rating\'>   &nbsp;&nbsp; &nbsp; IMDB Score: '+rating+'  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> <br/><br/>';

    var addtolist = document.createElement('select');
    addtolist.id = 'addtolist';
    addtolist.style.marginTop = '10px';
    let listRef = firebase.database().ref('lists');
    let tempList = [];
    listRef.once('value').then(snapshot => {
    
      let lists = snapshot.val();
        for (let entry in lists) {
          tempList.push(lists[entry].name);
        }
        let relRef = firebase.database().ref('relations');
        relRef.once('value').then(snapshot => {
          let rels = snapshot.val();
            for (let entry in rels) {
              if(rels[entry].mov === idVal) {
                let pos = tempList.indexOf(rels[entry].list);
                tempList.splice(pos, 1);
              }
            }
            var opt = document.createElement('option');
            opt.value = '';
            opt.innerHTML = 'List Options   <br/> <br/>';
            opt.disabled = 'true';
            opt.selected = 'true';
            opt.hidden = 'true';
            addtolist.appendChild(opt);
            for(var i in tempList) {
              opt = document.createElement('option');
              opt.value= tempList[i];
              opt.innerHTML = tempList[i]; 
              addtolist.appendChild(opt);
            }
        });
    });


    var list_helper = document.createElement('div');
    var list_button = document.createElement('button');
    list_button.id = 'listbutton';
    list_button.innerHTML = 'Confirm List';


    list_helper.appendChild(addtolist);
    list_helper.appendChild(list_button);

    list_button.onclick = function () {
      var choice = document.getElementById('addtolist').value;
      if(choice.length === 0) {
        alert('No list has been selected.');
      } 
      
      else {
        let formObj = {
          mov: idVal, 
          list: choice,
        };

      firebase.database().ref('relations').push().set(formObj);
      alert('Confirmed Add!');
      }
    };

    var delete_func = document.createElement('button');
    delete_func.id = 'delete_button';
    delete_func.innerHTML = '<br/> Delete Current Movie <br/><br/>';

    delete_func.onclick = function () {
    if(window.confirm('You Really Want Deletion ?')) {
        let ref = firebase.database().ref('movies');
        ref.on('value', snapshot => {
          let movies = snapshot.val();
            for (let entry in movies) {
              if(entry === idVal) {firebase.database().ref('movies/'+entry).remove();}
            }
        })
        let refList = firebase.database().ref('relations');
        refList.on('value', snapshot => {
          let relations = snapshot.val();
            for (let entry in relations) {
              if(relations[entry].mov === idVal) {firebase.database().ref('relations/'+entry).remove();}
            }
      })
      document.getElementById('box').removeChild(document.getElementById('box_appearance'));
      document.body.removeChild(document.getElementById('box'));
      document.body.style.overflow = 'auto';
      }
      window.confirm('Deletion Complete!');
    };

    document.body.appendChild(lightbox);  
    document.getElementById('box').appendChild(box_appearance);
    document.getElementById('box_appearance').appendChild(box_wrap);
    document.getElementById('box_appearance').appendChild(box_info);
    document.getElementById('box_info').appendChild(list_helper);
    document.getElementById('box_info').appendChild(delete_func);

    document.getElementById('box').addEventListener('click', function(event) {
      if(event.target.className === 'box_setting') {
        document.getElementById('box').removeChild(document.getElementById('box_appearance'));
        document.body.removeChild(document.getElementById('box'));
        document.body.style.overflow = 'auto';
      }
    });
  }


  // output
  render() {
    return (
      <div >
          <div>

          <h6><br/></h6>
          Movie List:
            <div className = 'Movie_bars'>

            <div className='lists_bar'>
              <select name='movie_choice' id='list' onChange={this.myChangeHandler}
                style={{ fontSize: 19, fontFamily: 'Comic Sans MS'}}>
                <option value='all'>All Movie Lists</option>
                <h1><br/></h1>
                
                {
                  this.state.lists.map((list) => (
                    <option value={list}>{list}</option>
                  ))
                }
              </select>
            </div>

            <h5><br/></h5>

            <div className='search_bar'>
              <input type='text' id='bar_search' placeholder='Which movie you want to see?' name='search' id='search' 
                style={{fontSize: 19, fontFamily: 'Comic Sans MS'}}/>

              <button id='search_button' onClick={this.searchMovies.bind(this)} >Search</button>
            </div>

            </div>

          </div>

          <h5><br/></h5>

          <div className='Movies_content'>
            <Helper movieList={this.state.movies} enlarge={this.enlarge} />
          </div>

          <div className='load_button_position' style={{display: this.state.displayButton}}>
            <button id='load_button' onClick={this.getMoreMovies.bind(this)}>Load More</button>
          </div>

      </div>
    );
  }
}
export default Movie;
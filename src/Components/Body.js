import React, { Component } from 'react';
import Home from './Home'
import Images from './Images'
import Videos from './Videos'
import Projects from './Projects'
import Comments from './Comment'
import Movies from './Movie'
import AddMovies from './Add_movie'
import CreateLists from './Create_list'
import Graph from './Graph'

export class Body extends Component{
	displayContent =() => {
		var activeTab = this.props.activeTab

		if(activeTab===1)
			return <Home/>
		else if (activeTab==2)
			return <Images/>

		else if (activeTab==3)
			return <Videos/>
		
		else if (activeTab==4)
			return <Projects/>

		else if (activeTab==5)
			return <Comments/>
		
		else if (activeTab==6)
			return <Movies/>

		else if (activeTab==7)
			return <AddMovies/>

		else if (activeTab==8)
			return <CreateLists/>
		else 
			return <Graph/>
	}
  render(){

    return (this.displayContent());

  }

}


export default Body;

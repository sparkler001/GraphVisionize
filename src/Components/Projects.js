import React, { Component } from 'react';

import game1 from '../image/animal-crossing-new-horizons-switch-hero.jpg'
import game3 from '../image/new-super-mario-bros-u-deluxe-switch-hero.jpg'
import game4 from '../image/the-legend-of-zelda-breath-of-the-wild-switch-hero.jpg'
import game2 from '../image/pokemon-sword-switch-hero.jpg'



export class Projects extends Component{
  render(){

    return (
    	<div className="projectsP">
			<div className="projectsC">
				<a href="https://www.nintendo.com/games/detail/animal-crossing-new-horizons-switch/">
					<img src={game1}/></a>

				<div className="projectName">
					<h1>Animal Crossing: New Horizons</h1>
				</div>
			</div>

			<div className="projectsC">
				<a href="https://www.nintendo.com/games/detail/pokemon-sword-switch/">
					<img src={game2}/>
				</a>
				<div className="projectName">
					<h1>Pokemon Sword</h1>
				</div>

			</div>

			<div className="projectsC">
				<a href="https://www.nintendo.com/games/detail/new-super-mario-bros-u-deluxe-switch/">
					<img src={game3}/>
				</a>
				<div className="projectName">
					<h1>New Super Mario Bros. U Deluxe</h1>
				</div>

			</div>

			<div className="projectsC">
				<a href="https://www.nintendo.com/games/detail/the-legend-of-zelda-breath-of-the-wild-switch/">
					<img src={game4}/>
				</a>
				<div className="projectName">
					<h1>The Legend of Zelda: Breath of the Wild</h1>
				</div>

			</div>

		</div>

    	);


  }

}


export default Projects;

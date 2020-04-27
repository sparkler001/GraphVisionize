import React, { Component } from 'react';

import pict from '../image/mountain.jpg'


export class Home extends Component{
  render(){

    return (

    	<div className="home">
			<div className="mainImg">
				<img src= {pict} alt="185"/>
			</div>

			<div className='description'>
				<h1>Quick Facts about Mountains</h1>


				<p>
					Mountains make up about one-fifth of the world's landscape, and provide homes to at least one-tenth of the world's people.

					<br></br> Heights of mountains are generally given as heights above sea level.

					<br></br> The world's highest peak on land is Mount Everest in the Himalayas. It is 8,850.1728 m (29,036 ft) tall.

					<br></br> Ben Nevis is also the highest mountain in Great Britain.

					<br></br> The tallest known mountain in the solar system is Olympus Mons, located on Mars.

					<br></br> There are mountains under the surface of the sea!

					<br></br> Mountains occur more often in oceans than on land; some islands are the peaks of mountains coming out of the water.

					<br></br> About 80 per cent of our planet's fresh water originates in the mountains.

					<br></br> All mountain ecosystems have one major characteristic in common - rapid changes in altitude, climate, soil, and vegetation over very short distances.

					<br></br> Plants that may be found on mountains include conifers, oak, chestnut, maple, junipers, stonecrops, campions, mosses, ferns and climbers.

					<br></br> The highest 14 mountains in the world are all found in the Himalayas

					<br></br> In some mountainous areas the rivers are permanently frozen.
					These are called glaciers.
				</p>

				<div className="sentence">
					<a href="http://www.primaryhomeworkhelp.co.uk/mountains/facts.htm"
					   style={{color:"black", fontStyle:"italic"}}>sentence cited</a>
				</div>

			</div>

		</div>

    	);


  }

}


export default Home;

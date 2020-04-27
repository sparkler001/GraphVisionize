import React, { Component } from 'react';

export class Videos extends Component{
  render(){

    return (
		<div className="vid">
			<div className="videosP videos">
				<div className="videosC video1">
					<h3>Relaxing Waves</h3>
					<iframe width="360" height="180" src="https://www.youtube.com/embed/vPhg6sc1Mk4" frameBorder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen></iframe>
				</div>

				<div className="videosC video2">
					<h3>Mountain </h3>
					<iframe width="360" height="180" src="https://www.youtube.com/embed/lxtWMOAHoiI" frameBorder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen></iframe>
				</div>

				<div className="videosC video3">
					<h3>MacBook Pro 16-inch </h3>
					<iframe width="360" height="180" src="https://www.youtube.com/embed/ysRigNyavF4" frameBorder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen></iframe>
				</div>

				<div className="videosC video4">
					<h3>Warriors - League of Legends </h3>
					<iframe width="360" height="180" src="https://www.youtube.com/embed/aR-KAldshAE" frameBorder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen></iframe>
				</div>

				<div className="videosC video5">
					<h3>Awaken - League of Legends </h3>
					<iframe width="360" height="180" src="https://www.youtube.com/embed/zF5Ddo9JdpY" frameBorder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen></iframe>
				</div>

				<div className="videosC video6">
					<h3>RISE - League of Legends </h3>
					<iframe width="360" height="180" src="https://www.youtube.com/embed/fB8TyLTD7EE" frameBorder="0"
							allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen></iframe>
				</div>
			</div>
		</div>

    	);


  }

}


export default Videos;

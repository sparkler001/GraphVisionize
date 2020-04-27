 // my component is hover the images when the mouse on it
import React, { Component } from 'react';
import { SRLWrapper } from "simple-react-lightbox"; // Import SRLWrapper

import image1 from '../image/mountain.jpg'
import image2 from '../image/blue_ocean.jpg'
import image3 from '../image/maldives_islands_vacation-wallpaper-2560x1600.jpg'
import image4 from '../image/moraine_lake_sunrise-wallpaper-2560x1600.jpg'
import image5 from '../image/mount_fuji_landscapes-wallpaper-2560x1600.jpg'
import image6 from '../image/virtual_reality_travel-wallpaper-2560x1600.jpg'
import image7 from '../image/spectacular_mountain_river-wallpaper-2560x1600.jpg'


function MyComponent() {
  return (
    <div className="MyComponent">
      <SRLWrapper>

		  <div className="imagesP images">
		  <img src={image1} alt="picture error"/>
		  <img src={image2} alt="picture error"/>
		  <img src={image3} alt="picture error"/>
		  <img src={image4} alt="picture error"/>
		  <img src={image5} alt="picture error"/>
		  <img src={image6} alt="picture error"/>
		  <img src={image7} alt="picture error"/>
		  </div>
      </SRLWrapper>
    </div>
  );
}

export default MyComponent;

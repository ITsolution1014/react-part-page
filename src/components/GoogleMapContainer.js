import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const GoogleMapContainer = (props) => {
  
  const {} = props
  const mapStyles = {        
    height: "100vh",
    width: "100%"
  };
  
  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }
  
  return (
      <div>
          
      </div>
    //  <LoadScript
    //    googleMapsApiKey='AIzaSyD8gyRmxgxeOjRj2JfdYK45WYwzKl04tgU'>
    //     <GoogleMap
    //       mapContainerStyle={mapStyles}
    //       zoom={13}
    //       center={defaultCenter}
    //     />
    //  </LoadScript>
  )
}


export default GoogleMapContainer;
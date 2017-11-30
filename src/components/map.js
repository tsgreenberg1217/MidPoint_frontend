import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
render() {
  const style = {
    width: '100%',
    height: '100%'
  }
    return (
      <Map google={this.props.google} zoom={14}
      style={style}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />


      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCsmeDgEFx6LZXsP0WqJN0B_9bm61_c1ZQ')
})(MapContainer)



//AIzaSyCsmeDgEFx6LZXsP0WqJN0B_9bm61_c1ZQ

//
// <InfoWindow onClose={this.onInfoWindowClose}>
//     <div>
//       <h1>{this.state.selectedPlace.name}</h1>
//     </div>
// </InfoWindow>

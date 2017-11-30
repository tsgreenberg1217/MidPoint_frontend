import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import AddressBar from './addressBar'


export class MapContainer extends Component {

  constructor(){
    super()
    this.state = {
      address: ''
    }
  }

  handleAddressChange = (event) =>{
    this.setState({
      address: event.target.value
    })
  }


  handleAddressSubmit = (event) => {
    event.preventDefault()
    console.log("Haaaaaay!!!!")
  }

render() {
  const style = {
    width: '50%',
    height: '50%'
  }
    return (
      <div>
        <AddressBar
        handleSubmit={this.handleAddressSubmit}
        value = {this.state.address}
        handleChange = {this.handleAddressChange}
        />
        <Map google={this.props.google} zoom={14}
        style={style}
        initialCenter={{
          lat: 40.854885,
          lng: -88.081807
        }}>

        <Marker onClick={this.onMarkerClick}
        name={'Current location'} />


        </Map>
      </div>
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

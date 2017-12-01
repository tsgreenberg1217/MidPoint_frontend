import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AddressBar from './addressBar'
import AddressOptions from './addressOptions'


const apiKey =  ('AIzaSyCsmeDgEFx6LZXsP0WqJN0B_9bm61_c1ZQ')
const seeding = ['home','work','new' ]

export class MapContainer extends Component {

  constructor(){
    super()
    this.state = {
      address: '',
      lng: 40,
      lat: 30,
      addrOptions: seeding,
    }
  }

  handleAddressChange = (event) =>{
    this.setState({
      address: event.target.value
    })
  }

  fetchCoordinates = () => {
    console.log(this.state.address)
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${this.state.address}&key=${apiKey}`)
    .then(res => res.json())
    .then(json => this.setState({
      lat: json.results[0].geometry.location.lat,
      lng: json.results[0].geometry.location.lng},() => console.log(this.state)) )
    // .then( () => window.location.reload(true) )

  }

  updateMapCenter = (event) => {

  }

  handleAddressSubmit = (event) => {
    event.preventDefault()
    this.fetchCoordinates()
    console.log(event)
  }




render() {
  const style = {
    width: '50%',
    height: '50%'
  }



  // debugger
    return (
      <div>
        <AddressBar
        handleSubmit={this.handleAddressSubmit}
        value = {this.state.address}
        handleChange = {this.handleAddressChange}
        />
        <AddressOptions addresses={this.state.addrOptions}/>
        <Map google={this.props.google} zoom={5}
        style={style}
        // onReady={this.fetchCoordinates}
        initialCenter={{
          lat: this.state.lat,
          lng: this.state.lng
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

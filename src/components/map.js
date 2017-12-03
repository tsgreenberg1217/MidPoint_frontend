import React, {Component} from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import AddressBar from './addressBar'

const apiKey =  ('AIzaSyCsmeDgEFx6LZXsP0WqJN0B_9bm61_c1ZQ')

export class MapContainer extends Component {

  constructor(){
    super()
    this.state = {
      address: '',
      lng: 40,
      lat: 30
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
      lng: json.results[0].geometry.location.lng},() => this.fetchToYelp(this.state.lat,this.state.lng) ) )
    // .then( () => window.location.reload(true) )

  }

  fetchToYelp(lat,lng){
    const body = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: 40.7,
        lng: -73.9
      })
    }

    fetch(`http://localhost:3000/adapters`, body)
    .then(res => res.json()).then(json => console.log(json))
  }

  updateMapCenter = (event) => {

  }

  handleAddressSubmit = (event) => {
    event.preventDefault()
    // this.fetchCoordinates()
    this.fetchToYelp(this.state.lat,this.state.lng)
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

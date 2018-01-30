import React, {Component} from 'react'
import Map, { InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import AddressBar from './addressBar'
import RestaurantList from './restaurantList'
import SavedAddresses from './savedAddresses'
import { Form, Grid, Segment } from "semantic-ui-react";
import {getMidArray, getLatLong} from '../services/midpoint'

const url =  "http://localhost:3001/api/v1/"

const apiKey =  ('AIzaSyCsmeDgEFx6LZXsP0WqJN0B_9bm61_c1ZQ')


export class MapContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      lat: 40.748541,
      lng: -73.985763,
      yelpResults: [],
      eventAddresses: [],
      newAddress: '',
      addressType: '',
      user: {},
      term: 'restaurant',
      savedAddressSelection: '',
    }
    this.saveAddressSubmit = this.saveAddressSubmit.bind(this)
  }


  handleTypeChange = e => {
    this.setState({
      term: e.target.value
    })
  }


  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSavedAddressChange = e => {
    this.setState({
      savedAddressSelection: e.target.value
    });
  }



  postCoordinates = () => {
    const body = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        address: this.state.address,
        lat: this.state.lat,
        lng: this.state.lng,
        addressType: this.state.addressType
      })
    }
    fetch(`http://localhost:3001/api/v1/addresses`, body)
    .then(res => res.json())
  }

  fetchToYelp(lat,lng,term){

    const body = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        lat: lat,
        lng: lng,
        term: this.state.term
      })
    }
    fetch(`${url}adapters`, body)
    .then(res => res.json()).then(json => this.setState({
      yelpResults: json.businesses.sort(function(a,b){return b.rating-a.rating}).slice(0,6)
    }, () => this.postCoordinates() ))
  }

  fetchMultipleCoordinates = (address, length) => {

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`)
    .then(res => res.json())
    .then(json =>
      this.setState({
      eventAddresses: [...this.state.eventAddresses, {
        lat: json.results[0].geometry.location.lat,
        lng: json.results[0].geometry.location.lng
      }]
    }, () => this.state.eventAddresses.length === length ? this.calculateMidpoint() : null
  )
  )
  }

  calculateMidpoint = () => {

    const result = getLatLong(this.state.eventAddresses)

    this.setState({
      lat: result.lat,
      lng: result.lng,
      eventAddresses: []
   }, () => this.fetchToYelp(this.state.lat, this.state.lng, this.state.term) )
  }

  handleAddressSubmit = (state) => {
    const addresses = state.addresses
    const length = state.addresses.length
    this.setState({
      lat:null,
      lng: null
      }, ()=> addresses.map(address => { return this.fetchMultipleCoordinates(address.address, length) }))

  }

  saveAddressSubmit(e){
    e.preventDefault()
    const body = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.newAddress,
        addressType: this.state.addressType,
        user: this.props.user.user.username
      })
    }
    fetch(`http://localhost:3001/api/v1/addresses`, body)
    .then(res => {debugger})
  }

render() {
  // debugger
  const mapStyle = {
    height: '100%',
    width: '100%',
    position:'absolute',
    top: '0',
    left: '0',
    zIndex: '0'
  }
  const formStyle = {
    zIndex: '1',
    position: 'relative'
  }

    return (
      <div>

        {(this.state.lat && this.state.lng) ?
          <Map
          google={this.props.google}
          zoom={12}
          style={mapStyle}
          initialCenter={{
            lat: this.state.lat,
            lng: this.state.lng
          }}
          >
          {this.state.yelpResults.map(result => <Marker position=
            {{
              lat: result.coordinates.latitude,
              lng: result.coordinates.longitude
            }}/>)}
          </Map> :
          <p>loading map.....</p>
        }
        {(this.props.user.user.username) ?
        <AddressBar
        style = {{formStyle}}
        handleSubmit={this.handleAddressSubmit}
        handleTypeChange={this.handleTypeChange}
        userAddresses = {this.props.user.user.addresses}
        user = {this.props.user.user.username}
        userStuff = {this.props.user.user}
        />
        : <p></p>}
          {this.state.yelpResults[1] ?
            <RestaurantList
              style = {{formStyle}}
              results = {this.state.yelpResults}/>: <p></p>}


      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCsmeDgEFx6LZXsP0WqJN0B_9bm61_c1ZQ')
})(MapContainer)

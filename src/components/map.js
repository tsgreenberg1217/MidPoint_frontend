import React, {Component} from 'react'
import Map, { Marker, GoogleApiWrapper} from 'google-maps-react';
import AddressBar from './addressBar'
import RestaurantList from './restaurantList'
import { Grid, Segment, Container } from "semantic-ui-react";
import {getMidArray, getLatLong} from '../services/midpoint'

// const url =  "http://localhost:3001/api/v1/"
const url = "https://mymidpointserver.herokuapp.com/api/v1/"

const apiKey =  ('AIzaSyCsmeDgEFx6LZXsP0WqJN0B_9bm61_c1ZQ')


export class MapContainer extends Component {

  constructor(props){
    super(props)
    this.state = {
      error: false,
      loading: false,
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
    .then(res => res.json())
    .then(json => {
      this.setState({
      yelpResults: json.businesses.sort(function(a,b){return b.rating-a.rating}).slice(0,6),
      loading: false,
      error: false
    })})
    .catch(error =>{
      this.handleError()
    })
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
  .catch(error => this.handleError())
  }

  handleError(){
    this.setState({
      lat: 40.748541,
      lng: -73.985763,
      loading: false,
      error: true
    })
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

    let blank = true
    addresses.forEach( a=> {
      if(a.address === ""){
        blank = false
      }
    })

    if(blank){
    const length = state.addresses.length
    this.setState({
      loading: true,
      lat:null,
      lng: null,
      error: false
      }, ()=> addresses.map(address => { return this.fetchMultipleCoordinates(address.address, length) }))}
      else{

        this.handleError()
      }

  }



render() {
  const mapStyle = {
    height: '100%',
    width: '100%',
    position:'absolute',
    top: '0',
    left: '0',
    zIndex: '0',
    overflow: 'hidden'
  }
  const formStyle = {
    zIndex: '1',
    minWidth: '%100'
  }

    return (
      <div>

        {(this.state.lat && this.state.lng) ?
          <Map
          google={this.props.google}
          zoom={11}
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

        <Container>
        <Grid columns = {3}>
        <Grid.Column>
        {(this.props.user.user.username) ?
          <Segment inverted >
          <AddressBar
          error = {this.state.error}
          loading = {this.state.loading}
          style = {{formStyle}}
          handleSubmit={this.handleAddressSubmit}
          handleTypeChange={this.handleTypeChange}
          userAddresses = {this.props.user.user.addresses}
          user = {this.props.user.user.username}
          userStuff = {this.props.user.user}
          />
          </Segment>
          : <p></p>}
        </Grid.Column>

        <Grid.Column/>

        <Grid.Column style = {{width:'%100'}}>
        {this.state.yelpResults[1] ?
          <RestaurantList
          style = {{zIndex: '1'}}
          results = {this.state.yelpResults}/>: <p></p>}
        </Grid.Column>

        </Grid>
        </Container>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyCsmeDgEFx6LZXsP0WqJN0B_9bm61_c1ZQ')
})(MapContainer)

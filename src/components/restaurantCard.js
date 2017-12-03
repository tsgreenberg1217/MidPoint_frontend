import React from 'react'

const RestaurantCard = (props) => {
  console.log(`${props.name}`)
  return(
    <div key = {props.id} >
      <a href={props.url}>{props.name}</a>
      <img src = {props.image} alt='no image found'
      style = {{width: '50px'}}/>
      <p> {props.location} </p>
      <p> {props.phone} </p>
    </div>
  )
}
export default RestaurantCard

// id = {rest.id}
// name = {rest.name}
// url = {rest.url}
// phone = {rest.display_phone}
// image = {rest.image_url}
// location = {rest.location.address1}

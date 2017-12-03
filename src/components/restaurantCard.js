import React from 'react'

const RestaurantCard = (props) => {
  console.log(`${props.name}`)
  return(
    <div key = {props.id} >
      <img src = {props.image_url} alt='no image found'/>
      <h3>{props.name}</h3>
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

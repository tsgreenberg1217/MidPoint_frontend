import React from 'react'
import RestaurantCard from './restaurantCard'
import {Segment } from "semantic-ui-react";

const RestaurantList = (props) => {
  const AllRestaurants = props.results.map(rest =>{
      return (
      <Segment>
      <RestaurantCard
      key = {rest.id}
      name = {rest.name}
      url = {rest.url}
      phone = {rest.display_phone}
      image = {rest.image_url}
      location = {rest.location.address1}
      />
    </Segment>)
  })

  return(
    <div>
      {AllRestaurants}
      </div>
  )
}

export default RestaurantList

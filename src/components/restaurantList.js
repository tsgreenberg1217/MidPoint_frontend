import React from 'react'
import RestaurantCard from './restaurantCard'
import {Segment, Item, Divider } from "semantic-ui-react";

const RestaurantList = (props) => {
  const AllRestaurants = props.results.map(rest =>{
      return (

      <Item.Group divided>
      <RestaurantCard
      key = {rest.id}
      name = {rest.name}
      url = {rest.url}
      phone = {rest.display_phone}
      image = {rest.image_url}
      location = {rest.location.address1}
      />
      <Divider/>
      </Item.Group>)
  })

  return(
    <Segment style = {{height: '800px', overflow: 'scroll'}}>
      {AllRestaurants}
    </Segment>
  )
}

export default RestaurantList

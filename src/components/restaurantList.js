import React from 'react'
import RestaurantCard from './restaurantCard'

const RestaurantList = (props) => {
  console.log('list is mounted')

  const AllRestaurants = props.results.map(rest =>{
      return <RestaurantCard
      key = {rest.id}
      name = {rest.name}
      url = {rest.url}
      phone = {rest.display_phone}
      image = {rest.image_url}
      location = {rest.location.address1}
      />
  })

  return(
    <div style = {{float : 'right'}}>
      {AllRestaurants}
    </div>
  )
}

export default RestaurantList

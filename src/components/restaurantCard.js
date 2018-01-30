import React from 'react'
import { Button, Icon, Image as ImageComponent, Item, Label, Divider } from 'semantic-ui-react'
const paragraph = <ImageComponent src='/assets/images/wireframe/short-paragraph.png' />


const RestaurantCard = (props) => {
  const goToLink = (url) =>{
    window.open().location = url
  }
  return(
      <Item>
        <Item.Image src={props.image} />
        <Item.Content>
          <Item.Header as='a'>{props.name}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{props.phone}</span>
          </Item.Meta>
          <Item.Description>{props.location}</Item.Description>
          <Item.Extra>
            <Button primary floated='left'
            onClick = {() => goToLink(props.url)}>
              Check it out
              <Icon name='right chevron' />
            </Button>
          </Item.Extra>
        </Item.Content>
        <Divider />
      </Item>

  )
}
export default RestaurantCard

// id = {rest.id}
// name = {rest.name}
// url = {rest.url}
// phone = {rest.display_phone}
// image = {rest.image_url}
// location = {rest.location.address1}

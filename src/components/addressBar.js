import React from 'react'
import { Button, Icon,Input } from 'semantic-ui-react'




class AddressBar extends React.Component{
  constructor(){
    super()
    this.state= {
      addresses: [{address: ''},{address: ''}]
    }
    this.handleAddressChange = this.handleAddressChange.bind(this)
    this.addAddress = this.addAddress.bind(this)
  }

  handleAddressChange = (name, index) => {
    this.setState(prevState => {
      return {
        addresses: [
          ...prevState.addresses.slice(0, index),
          { address: name },
          ...prevState.addresses.slice(index + 1)
        ]
      };
    });
  };

  addAddress = (event) => {
    event.preventDefault() //why?
    this.setState({
      addresses: [...this.state.addresses, {address: ''}]
    })
  }

  render(){
    return(

      <form onSubmit= {(e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state)
      }}>

      <div>
        <Input
          list='languages'
          placeholder='Your address...' />
        <datalist id='languages'>
          <option value='Home' />
          <option value='Work' />
        </datalist>
      </div>

      {this.state.addresses.map((address,i) =>
       (<div key = {i+1}>
         <Input
            style = {{width: '22%'}}
            label={{ icon: 'asterisk' }}
            labelPosition='left corner'
            placeholder='enter address...'
            type = "text"
            onChange = {e => this.handleAddressChange(e.target.value, i)}
          />
        </div>
        //dropdown menu that has my save "types"
        //dropdown has an onChange that says does a fetch to the backend of the actual addresses
        //event.target.value where input name =1,
      )
      )
    }
      <br/>
      <Button animated
      onClick = {this.addAddress}>
        <Button.Content visible>Add Address</Button.Content>
        <Button.Content hidden>
          <Icon name='add' />
        </Button.Content>
      </Button>
      <Button primary>Submit</Button>
      <br/>
      </form>



    )

  }
}

export default AddressBar

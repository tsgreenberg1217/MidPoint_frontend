import React from 'react'
import { Button, Icon,Input, Form, Select } from 'semantic-ui-react'

class AddressBar extends React.Component{
  constructor(props){
    super(props)
    this.state= {
      addresses: [{address: ''},{address: ''}],
      userAddresses: this.props.userAddresses,
      user: this.props.user,
      newAddress: '',
      addressType: ''
    }
    this.handleAuxAddressChange = this.handleAuxAddressChange.bind(this)
    this.addAddress = this.addAddress.bind(this)
    this.saveAddressSubmit = this.saveAddressSubmit.bind(this)

  }


  handleMainChange = (name) => {
    this.setState({
      addresses: [{address: name}, ...this.state.addresses.slice(1)]
    })
  }

  handleMainChangeSelect = (value) => {
    this.setState({
      addresses: [{address: value}, ...this.state.addresses.slice(1)]
    }, () => console.log(this.state))
  }

  handleAuxAddressChange = (name, index) => {
    index = index+1
    // console.log(this.state.addresses, index)
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
        user: this.state.user
      })
    }
    fetch(`http://localhost:3001/api/v1/addresses`, body)
    .then(res => res.json()).then( () => window.location.reload(true))
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


  render(){


    return(

    <div>
      <Form onSubmit={this.saveAddressSubmit}>
        <Form.Group>
          <Form.Input
            style = {{width: '200px'}}
            name="newAddress"
            onChange={this.handleChange}
            label="New Address"
            placeholder="new address"
          />
          <br/>

          <Form.Input
          style = {{width: '200px'}}
            name="addressType"
            onChange={this.handleChange}
            label="Address Type"
            type="text"
            placeholder="type"
          />
            </Form.Group>
          <Form.Button>Save Address</Form.Button>
      </Form>


      <form onSubmit= {(e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state)
      }}>
      <br/>
      <div>
        <select
        onChange={this.props.handleTypeChange}
        value = {this.state.value}
        >
          <option value="restaurant">Restaurant</option>
          <option value="bar">Bar</option>
          <option value="museum">Museum</option>
          </select>

      </div>
      <div>
        <Input
        style = {{width: '22%'}}
          list='languages'
          placeholder='Your address...'
          value = {this.state.addresses[0].address}
          onChange = {e => this.handleMainChange(e.target.value)}/>
        <select id='addresses'
        onChange = {e => this.handleMainChangeSelect(e.target.value)}>
        {(this.state.userAddresses) ? this.state.userAddresses.map(address =>  <option
                                                                                value = {address.directions}
                                                                                >{address.name}</option>)
                                    : null}
        </select>
      </div>

      {this.state.addresses.slice(1).map((address,i) =>
       (<div key = {i+1}>
         <Input
            style = {{width: '22%'}}
            label={{ icon: 'asterisk' }}
            labelPosition='left corner'
            placeholder='enter address...'
            type = "text"
            onChange = {e => this.handleAuxAddressChange(e.target.value, i)}
          />
        </div>
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
    </div>



    )

  }
}

export default AddressBar

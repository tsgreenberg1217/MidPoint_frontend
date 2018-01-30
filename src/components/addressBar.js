import React from 'react'
import {Dropdown, Button, Icon,Input, Form, Segment } from 'semantic-ui-react'

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
    },)
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
    .then(res => res.json()).then(json => this.setState({
      userAddresses: json.addresses
    }, () => console.log('sup')))
  }

  handleTypeChange = e => {
    this.setState({
      term: e.value
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
      <Form onSubmit= {(e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state)
      }}>


      <br/><br/><br/>

        <Dropdown placeholder = 'choose a venue'
        onChange={(e,v) => this.handleTypeChange(v)}
        value = {this.state.value}
        search selection
        options = {[{key: 'restaurant', value: 'restaurant', text: 'Restaurant'},{key: 'bar', value: 'bar', text:"Bar"},{key: 'museum', value: 'museum', text:"Museum"}]}>
        </Dropdown>

      <br/>
        <Form.Input
        style = {{width: '22%'}}
        label={{ icon: 'asterisk' }}
        labelPosition='left corner'
        placeholder='enter address...'
        type = "text"
          value = {this.state.addresses[0].address}
          onChange = {e => this.handleMainChange(e.target.value)}/>


      {this.state.addresses.slice(1).map((address,i) =>
       (
         <Form.Input key = {i+1}
            style = {{width: '22%'}}
            label={{ icon: 'asterisk' }}
            labelPosition='left corner'
            placeholder='enter address...'
            type = "text"
            onChange = {e => this.handleAuxAddressChange(e.target.value, i)}
          />

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
      <br/>
      <br/>
      <Button primary>Submit</Button>
      <br/>
      </Form>
    </div>



    )

  }
}

export default AddressBar

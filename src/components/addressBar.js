import React from 'react'



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



  addAddress(){
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
      {this.state.addresses.map((address,i) =>
       (<div>
         <input
        type = "text"
        onChange = {e => this.handleAddressChange(e.target.value, i)}
        />
        </div>
      )
      )
    }
      <br/>
      <button onClick = {this.addAddress}>add address</button>
      <button type = 'submit'> Submit</button>
      <br/>
      </form>
    )

  }
}

export default AddressBar

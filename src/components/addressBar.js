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


      {this.state.addresses.map((address,i) =>
       (<div key = {i+1}>
         <input
        //  name = input_+1
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

      <button onClick = {this.addAddress}>add address</button>
      <button type = 'submit'> Submit</button>
      <br/>
      </form>



    )

  }
}

export default AddressBar

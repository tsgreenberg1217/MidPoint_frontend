import React from 'react'


const AddressBar = (props) =>{
  return(
  <form onSubmit= {props.handleSubmit}>
    <input
    type = "text"
    value = {props.value}
    onChange = {props.handleChange}
    />
    <br/>
    <button type = 'submit'> Submit</button>
    <br/>
  </form>
)
}

export default AddressBar

import React from 'react'


const AddressBar = (props) =>{
  return(
  <form onSubmit= {props.handleSubmit}>
    <input
    type = "text"
    value = {props.value}
    onChange = {props.handleChange}
    />
    <button
    type = 'submit'/>
  </form>
)
}

export default AddressBar

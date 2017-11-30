import React from 'react'


const AddressBar = (props) =>{
  return(
    <div>
  <form onSubmit= {props.handleSubmit}>
    <input
    type = "text"
    value = {props.value}
    onChange = {props.handleChange}
    />
    <br/>
    <button
    type = 'submit'>
    Submit
    </button>
  </form>
  <br/>
  </div>


)
}

export default AddressBar

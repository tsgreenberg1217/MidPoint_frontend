import React from 'react'
import { Input } from 'semantic-ui-react'

class SavedAddresses extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return(

      <div>
        <Input
          list='languages'
          name='SavedAddresses'
          placeholder='Your address...'
          onChange = {e => this.handleMainChange(e.target.value)}/>
        <datalist id='languages'>
          <option value='Home' />
          <option value='Work' />
        </datalist>
      </div>




    )

  }
}


export default SavedAddresses

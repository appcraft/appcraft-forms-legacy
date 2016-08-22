import React from 'react'
import {render} from 'react-dom'

import { fieldTypes, Form } from '../../src'

import { H1 } from 'react-blazecss'
import 'blaze/dist/blaze.min.css'

const fields = [
  {name: "string", label: "String"},
  {name: "string2", label: "String"},
  {name: "string3", label: "String"},
  {name: "string4", label: "String"}
]

class Demo extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      data: {}
    }

    this.onChange = (data, name, value) => {
      console.log("onChange", data, name, value)
      this.setState({
        data: {
          ...data,
          [name]: value
        }
      })
    }
  }
  
  render(){
    console.log("data", this.state.data)
    return (
      <div style={{padding: 24}} className="c-text">
        <H1 size="xlarge">appcraft-forms Demo</H1>
        <Form fieldTypes={fieldTypes} 
              fields={fields}
              data={this.state.data} 
              onChange={this.onChange}/>
      </div>
    )
  } 
}
render(<Demo/>, document.querySelector('#demo'))

import React from 'react'
import {render} from 'react-dom'

import { fieldTypes, Form } from '../../src'

import { H1 } from 'react-blazecss'
import 'blaze/dist/blaze.min.css'
import 'blaze/dist/blaze.animations.min.css'
import 'font-awesome/css/font-awesome.min.css'

const fields = [
  {label: "Classic field types", type: "header"},
  {name: "string", label: "String", type: "text"},
  {name: "string_hint", label: "String with hint", type: "text", hint: "String hint is displayed when focused"},
  {name: "number", label: "Number", type: "number"},
  {name: "date", label: "Date", type: "date"},
  {name: "richtext", label: "Rich Text", type: "richtext"},
  {name: "choice", label: "Choice", type: "choice", options: [
    {label: "Option 1", value: "1"},
    {label: "Option 2", value: "2"},
    {label: "Option 3", value: "3"},
  ]},
  {label: "Other field types", type: "header"},
  {name: "icon", label: "Icon", type: "icon"},
  {name: "computed", label: "Computed", type: "computed", template: "String: {{string}}, Choice: {{choice}}"},

  {label: "Tabs", type: "header"},
  {type: "tabs", tabs: [
    {title: "Tab 1", fields: [
      {name: "other_string1", label: "Other string 1", type: "text"},
      {name: "other_string2", label: "Other string 2", type: "text"},
    ]},
    {title: "Tab 2", fields: [
      {name: "other_string3", label: "Other string 3", type: "text"},

      {type: "tabs", tabs: [
        {title: "Tab 1", fields: [
          {name: "other_string5", label: "Tab in tab 1", type: "text"},
          {name: "other_string6", label: "Tab in tab 2", type: "text"},
        ]},
        {title: "Tab 2", fields: [
          {name: "other_string7", label: "Tab in tab 3", type: "text"},
          {name: "other_string8", label: "Tab in tab 4", type: "text"},
        ]},
      ]},
    ]},
  ]},
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

import React from 'react'
import {render} from 'react-dom'

import { fieldTypes, Form } from '../../src'

import { H1 } from 'react-blazecss'
import 'blaze/dist/blaze.min.css'
import 'blaze/dist/blaze.animations.min.css'
import 'font-awesome/css/font-awesome.min.css'

const fields = [
  {label: "Classic field types", type: "header"},
  {name: "string", label: "String", type: "string"},
  {name: "string_hint", label: "String with hint", type: "string", hint: "String hint is displayed when focused"},
  {name: "number", label: "Number", type: "number"},
  {name: "date", label: "Date", type: "date"},
  {name: "richtext", label: "Rich Text", type: "richtext"},
  {name: "choice", label: "Choice", type: "choice", options: [
    {label: "Option 1", value: "1"},
    {label: "Option 2", value: "2"},
    {label: "Option 3", value: "3"},
  ]},

  {label: "Complex field types", type: "header"},
  {name: "list", label: "List", type: "list", fields: [
    {name: "name", label: "Name", type: "string", width: '60%'},
    {name: "age", label: "Age", type: "number", width: '40%'},
    {name: "description", label: "Description", type: "richtext"},
  ]},
  {name: "table", label: "Table", type: "table", fields: [
    {name: "name", label: "Name", type: "string"},
    {name: "age", label: "Age", type: "number"},
  ]},

  {name: "address", label: "Full Address", type: "address"},
  {name: "street number", type: "string", width: "30%"},
  {name: "street", type: "string", width: "70%"},
  {name: "zip code", type: "string", width: "30%"},
  {name: "city", type: "string", width: "70%"},
  {name: "departement", type: "string", width: "30%"},
  {name: "region", type: "string", width: "35%"},
  {name: "country", type: "string", width: "35%"},

  {label: "Other field types", type: "header"},
  {name: "icon", label: "Icon", type: "icon"},
  {name: "computed", label: "Computed", type: "computed", template: "String: {{string}}, Choice: {{choice}}"},

  {label: "Tabs", type: "header"},
  {type: "tabs", tabs: [
    {title: "Tab 1", fields: [
      {name: "other_string1", label: "Other string 1", type: "string"},
      {name: "other_string2", label: "Other string 2", type: "string"},
    ]},
    {title: "Tab 2", fields: [
      {name: "other_string3", label: "Other string 3", type: "string"},

      {type: "tabs", tabs: [
        {title: "Other Tab 1", fields: [
          {name: "other_string5", label: "Tab in tab 1", type: "string"},
          {name: "other_string6", label: "Tab in tab 2", type: "string"},
        ]},
        {title: "Other Tab 2", fields: [
          {name: "other_string7", label: "Tab in tab 3", type: "string"},
          {name: "other_string8", label: "Tab in tab 4", type: "string"},
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

    this.onChange = (formName, fieldName, value) => {
      console.log("onChange", formName, fieldName, value)
      this.setState({
        data: {
          ...this.state.data,
          [fieldName]: value
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

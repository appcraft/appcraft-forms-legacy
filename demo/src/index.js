import React from 'react'
import {render} from 'react-dom'

import { fieldTypes, Form } from '../../src'

import { H1, Container, Nav, NavContent, NavItem } from 'react-blazecss'
import 'blaze/dist/blaze.min.css'
import 'blaze/dist/blaze.animations.min.css'
import 'font-awesome/css/font-awesome.min.css'

const fields2 = [
  {label: "Classic field types", type: "header"},
  {name: "string", label: "String", type: "string"},
  {name: "string_hint", label: "String with hint", type: "string", hint: "String hint is displayed when focused"},
  {name: "number", label: "Number", type: "number"},
  {name: "boolean", label: "Boolean (with hint)", type: "boolean", bStyle: "primary", hint: "Tap to toggle"},
  {name: "checkbox", label: "Boolean (subtype:'checkbox')", type: "boolean", subtype: "checkbox"},
  {name: "date", label: "Date", type: "date"},
  {name: "richtext", label: "Rich Text", type: "richtext"},
  {name: "choice", label: "Choice", type: "choice", options: [
    {label: "Option 1", value: "1"},
    {label: "Option 2", value: "2"},
    {label: "Option 3", value: "3"},
  ]},
  {name: "file", label: "File", type: "file"},

  {label: "Complex field types", type: "header"},
  {name: "list", label: "List", type: "list", fields: [
    {name: "name", label: "Name", type: "string", width: '60%'},
    {name: "age", label: "Age", type: "number", width: '40%'},
    {name: "description", label: "Description", type: "richtext"},
  ]},
  {name: "table", label: "Table", type: "table", fields: [
    {name: "name", label: "Name", type: "string"},
    {name: "age", label: "Age", type: "number"},
    {name: "sex", label: "Sex", type: "choice", options: [
      {label: "Male", value: "male"},
      {label: "Female", value: "female"},
    ]},
  ]},
  {name: "small_table", label: "Localisations", type: "table", fields: [
    {name: "name", label: "Name", type: "string"},
    {name: "comment", label: "Comment", type: "string"},
  ]},

  {name: "address", label: "Full Address", type: "address"},
  {name: "street number", type: "string", width: "30%"},
  {name: "street", type: "string", width: "70%"},
  {name: "zip code", type: "string", width: "30%"},
  {name: "city", type: "string", width: "70%"},
  {name: "departement", type: "string", width: "30%"},
  {name: "region", type: "string", width: "35%"},
  {name: "country", type: "string", width: "35%"},

  {label: "Table field with hidden columns", type: "header"},
  {name: "table-hidden", label: "Table with edit", type: "table", visibleFields: ["name", "age", "childCount"], fields: [
    {name: "name", label: "Name", type: "string"},
    {name: "age", label: "Age", type: "number"},
    {name: "sex", label: "Sex", type: "choice", options: [
      {label: "Male", value: "male"},
      {label: "Female", value: "female"},
    ]}, 
    {name: "childCount", label: "Child Count", type: "computed", template: "{{children.length}}"},
    {name: "children", label: "Children", type: "table", fields: [
      {name: "name", label: "Name", type: "string"},
      {name: "age", label: "Age", type: "number"},
    ]},
  ]},

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


const fields = [
  {label: "Edition", type: "header"},
  {name: "name", label: "Nom", type: "string", required: true},
  {type: "grid", columns: [
    { fixedWidth: 200, fields: [
      {name: "avatar", label: "Photo principale", type: "file", width: 190, height: 180, showInfo: false},
    ]},
    { fields: [
      {name: "competences", label: "Compétences", type: "string"},
      {name: "languages", label: "Langues", type: "table", showLabel: false, fields: [
        {name: "lang", label: "Langue", type: "string"},
      ]},
    ]}
  ]},

  { type: "section", title: "Portfolio", fields: [
    {name: "portfolio", label: "Portfolio", showLabel: "false", type: "file", multiple: true},
  ]},

  { type: "section", title: "Vidéos", fields: [
    {name: "youtube", label: "Youtube", type: "string", width: "50%"},
    {name: "viemo", label: "Vimeo", type: "string", width: "50%"},
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
      <div className="c-text">
        <Nav inline shadow="higher" animate position="top" fixed style={{zIndex: 11}}>
          <Container size="large">
          {/*<Nav inline shadow="higher" animate position="top" fixed>*/}
            <NavContent>AppCraft Forms</NavContent>
            <NavItem right bStyle="primary">github</NavItem>
          </Container>
        </Nav>
        <Container size="medium" style={{paddingTop: 60, paddingLeft: 8, paddingRight: 8}}>
          <Form fieldTypes={fieldTypes} 
                fields={fields}
                className="xacf-material"
                style={{fontSize: '0.95em'}}
                horizontal={false}
                data={this.state.data} 
                onChange={this.onChange}/>
        </Container>
      </div>
    )
  } 
}
render(<Demo/>, document.querySelector('#demo'))


document.getElementsByTagName("body")[0].className = "c-text"
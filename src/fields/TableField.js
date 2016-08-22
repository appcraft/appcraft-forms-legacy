import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import { FieldContainer } from '../components/FieldContainer'

import { StringField } from './StringField'

function getFieldComponent(fieldTypes, type){
  if (type in fieldTypes) return fieldTypes[type]
  return StringField
}

export class RowFields extends React.Component {

  constructor(props){
    super(props)
    
    this.updateField = (fieldName, value) => {
      const { name, onChange } = this.props
      console.log("updateField", name, fieldName, value)
      onChange(name, fieldName, value)
    }
  }

  static contextTypes = {
    acForms: React.PropTypes.object
  }
  
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }
  
  render(){

    const { index, isExtra } = this.props
    return (
      <tr style={{opacity: (isExtra ? 0.5 : undefined)}} >
        <td>{isExtra ? '' : (index+1)}</td>
        {this.renderFields()}
      </tr>
    )
  }
  
  renderFields(){
    const { data={}, fields=[], onChange, prefix="", horizontal } = this.props
    console.log("fields", fields)
    return fields.map((field, idx) => {
      const { name, label, type } = field
      
      // if (type == "componentList") return undefined // TODO: remove
      
      const key = name || label || (type + "-" + (idx+1))
      const Component = getFieldComponent(this.context.acForms.fieldTypes, type)      
      if (type === "computed" || type === "length" || type === "tabs"){
        return (
          <td key={"field-" + key}>
            <Component  horizontal={horizontal}
                        {...field}
                        id={prefix + name}
                        noContainer={true}
                        data={data} />
          </td>
        )
      }
      return (
        <td key={"field-" + key} >
          <Component horizontal={horizontal}
                      {...field}
                      id={prefix + key}
                      noContainer={true}
                      onChange={this.updateField} 
                      value={data[name]} />
        </td>
      )
    })
  }
}


export class TableField extends React.Component {
  constructor(props){
    super(props)
    
    this.updateEntry = (idx, fieldName, fieldValue) => {
      const { value=[], data, name, onChange } = this.props
    
      if (idx >= value.length){
        onChange(name, [...value, {[fieldName]: fieldValue}])
        return
      }

      const newArray = value.map((data, i) => (i == idx) ? {
        ...data, 
       [fieldName]: fieldValue
      } : data)
      console.log("newArray", newArray)
      onChange(name, newArray)
    }
  }
  
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }
  
  entryLabelFor(data){
    const label = data.label || data.title || data.name
    if (label) return " - " + label
    return ""
  }
  
  render(){
    const { id, fields, value=[], entryLabel="Entry" } = this.props
    
    let rows = value.map((data, idx) => (
      <RowFields key={idx} 
                  index={idx} 
                  name={idx} 
                  prefix={`${id}[${idx}].`}
                  fields={fields} 
                  data={data} 
                  onChange={this.updateEntry} />
    ))
    
    // Extra greyed out one to add rows
    rows.push(
      <RowFields key={value.length} 
                  index={value.length}
                  name={value.length}
                  prefix={`${id}[${value.length}].`}
                  isExtra 
                  fields={fields}
                  onChange={this.updateEntry} />
    )
    
    return (
      <FieldContainer {...this.props}>
        <table style={{width: '100%'}}>
          <thead>
            <tr>
              <th style={{width: 60}}></th>
              {fields.map((field, idx) => (
                <th key={idx+1} style={{width: field.width}}>{field.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
      </FieldContainer>
    )
  }
}
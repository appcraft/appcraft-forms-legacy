import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import { FieldContainer } from '../components/FieldContainer'
import { Fields } from './Fields'

import { Button, H3 } from 'react-blazecss'
import { Icon } from '../components/Icon'

export class ListField extends React.Component {
  constructor(props){
    super(props)
    
    this.updateEntry = (idx, fieldName, fieldValue) => {
      const { value=[], data, name, onChange } = this.props
      const newArray = value.map((data, i) => (i == idx) ? {
        ...data, 
       [fieldName]: fieldValue
      } : data)
      console.log("newArray", newArray)
      onChange(name, newArray)
    }
    
    this.onAdd = (e) => {
      e.preventDefault()
      const { value=[], data, name, onChange } = this.props
      onChange(name, [...value, {}])
    }
  }
  
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }
  
  entryLabelFor(data){
    const { entryLabelField } = this.props
    if (entryLabelField){
      if (data && data[entryLabelField] != undefined){
        const value = data[entryLabelField]
        if (value && value.label){
          return " - " + value.label
        } else if (Array.isArray(value)){
          if (value.length === 0) return ""
          else return " - " + value[0].label
        } else {
          return " - " + value
        }
      }
      return ""
    }
    const label = data.label || data.title || data.name
    if (label) return " - " + label
    return ""
  }
  
  render(){
    const { id, fields, value=[], entryLabel="Entry" } = this.props
    
    return (
      <FieldContainer {...this.props}>
        {value.map((data, idx) => (
          <div key={idx} className="pb-list-item">
            <H3 size="small" style={{padding: '0.25em 0'}}>{entryLabel} {idx+1} {this.entryLabelFor(data)}</H3>
            <Fields name={idx} 
                    prefix={`${id}[${idx}].`}
                    fields={fields} 
                    data={data} 
                    onChange={this.updateEntry} />
          </div>
        ))}
        {this.renderAddButton()}
      </FieldContainer>
    )
  }
  
  renderAddButton(){
    return (
      <Button bStyle="success" onClick={this.onAdd}>
        <Icon name="plus" /> Add
      </Button>
    )
  }
}

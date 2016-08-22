import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import { StringField } from './fields/StringField'
import './styles.scss'

function getFieldComponent(fieldTypes, type){
  if (type in fieldTypes) return fieldTypes[type]
  return StringField
}

export class Fields extends React.Component {

  constructor(props){
    super(props)
    
    this.updateField = (name, value) => {
      const { data, onChange } = this.props
      onChange(data, name, value)
    }
  }
  
  showComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }
  
  render(){
    const { aligned } = this.props
    
    var className = ""

    return (
      <fieldset className="c-fieldset">
        {this.renderFields()}
      </fieldset>
    )
  }
  
  renderFields(){
    const { data, fields, onChange, fieldTypes, prefix="", horizontal } = this.props
    return fields.map(field => {
      const { name, type } = field
      
      // if (type == "componentList") return undefined // TODO: remove
      
      const Component = getFieldComponent(fieldTypes, type)      
      if (type === "computed" || type === "length"){
        return <Component key={"field-" + name} 
                          {...field}
                          id={prefix + name}
                          data={data} />
      }
      return <Component key={"field-" + name} 
                        {...field}
                        horizontal={horizontal}
                        id={prefix + name}
                        onChange={this.updateField} 
                        value={data[name]} />
    })
  }
}

export class Form extends React.Component {

  render(){
    var className = "c-form"

    return (
      <form className={className} style={{color: "#333"}}>
        <Fields {...this.props} horizontal/>
      </form>
    )
  }
}

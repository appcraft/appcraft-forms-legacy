import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import { StringField } from './StringField'

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

  static contextTypes = {
    acForms: React.PropTypes.object
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
    const { data, fields=[], onChange, prefix="", horizontal } = this.props
    return fields.map((field, idx) => {
      const { name, label, type } = field
      
      // if (type == "componentList") return undefined // TODO: remove
      
      const Component = getFieldComponent(this.context.acForms.fieldTypes, type)      
      if (type === "computed" || type === "length" || type === "tabs"){
        return <Component key={"field-" + name} 
                          {...field}
                          horizontal={horizontal}
                          id={prefix + name}
                          data={data} />
      }
      const key = name || field.label || (type + "-" + (idx+1))
      return <Component key={"field-" + key} 
                        {...field}
                        horizontal={horizontal}
                        id={prefix + key}
                        onChange={this.updateField} 
                        value={data[name]} />
    })
  }
}
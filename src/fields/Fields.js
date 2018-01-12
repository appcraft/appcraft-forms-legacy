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
    
    this.updateField = (fieldName, value) => {
      const { name, onChange } = this.props
      console.log("fields update", name, fieldName, value)
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
    const { aligned } = this.props
    
    var className = ""

    return (
      <fieldset className="c-fieldset">
        {this.renderFields()}
      </fieldset>
    )
  }
  
  renderFields(){
    const { data, errors, fields=[], onChange, prefix="", horizontal } = this.props


    return fields.map((field, idx) => {
      const { name, label, type, component } = field

      // if (name) console.log("render field", name, "with value", data[name])
      
      // if (type == "componentList") return undefined // TODO: remove
      
      const Component = component || getFieldComponent(this.context.acForms.fieldTypes, type)      
      const key = name || label || (type + "-" + (idx+1))
      if (type === "computed" || type === "length" || type === "tabs" || type === "grid" || type === "section"){
        return <Component key={"field-" + key} 
                          horizontal={horizontal}
                          {...field}
                          id={prefix + name}
                          onChange={onChange} 
                          data={data}
                          errors={errors} />
      }
      return <Component key={"field-" + key} 
                        horizontal={horizontal}
                        {...field}
                        id={prefix + key}
                        onChange={this.updateField} 
                        error={errors && errors[field.name]}
                        value={data[name]} />
    })
  }
}
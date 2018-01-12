import React from 'react'
import { Card, CardContent, H2, Toggle } from 'react-blazecss'
import { Fields } from '../fields/Fields'

export class FormSectionToggle extends React.Component {
  
  constructor(props){
    super(props)
    
    this.updateField = (name, fieldName, fieldValue) => {
      const { onChange, value } = this.props
      // console.log("updateField", name, fieldName, fieldValue)
      onChange(name, {
        ...value,
        [fieldName]: fieldValue
      })
    }

    this.toggle = () => {
      const { value, name, onChange } = this.props
      // console.log("toggle time")
      // console.log("updateField", name, fieldName, value)
      onChange(name, value == null ? {} : null)
    }
  }
  

  render(){
    const {title, name, value, errors, fields, onChange, horizontal=false} = this.props

    const hasSection = value != null
    // console.log("render FormSectionToggle", name, "with", value, hasSection)

    return (
      <Card shadow="high" style={{overflowY: 'visible', background: 'white', padding: '1em'}}>
        <CardContent>
          <H2 size="medium" style={{paddingTop: 0, paddingBottom: 0}}>
            <Toggle id="on"  
                  animate="fast"
                  bStyle="success"
                  style={{paddingTop: 8, float: 'right'}}
                  onChange={this.toggle}
                  checked={hasSection} />
            {title}
          </H2>
          {hasSection && <Fields fields={fields} 
                  name={name}
                  errors={errors}
                  data={value} 
                  horizontal={horizontal} onChange={this.updateField} />}
        </CardContent>
      </Card>
    )
  }
}
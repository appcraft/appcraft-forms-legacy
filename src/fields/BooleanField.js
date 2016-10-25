import React from 'react'
import { Field } from './Field'
import { FieldContainer } from '../components/FieldContainer'

import { Toggle } from 'react-blazecss'

export class BooleanField extends React.Component {

  constructor(props){
    super(props)

    this.onChange = (e) => {
      const { name, onChange } = this.props
      if (onChange){
        onChange(name, e.target.checked)
      }
    }
  }

  render(){
    const { subtype, id, hint, bStyle, value="" } = this.props

    return (
      <FieldContainer {...this.props}>
      {subtype === "checkbox" ? (
        <label className="c-choice">
          <input id={id}  
                type="checkbox"
                style={{paddingTop: 8}}
                onChange={this.onChange}
                checked={value}/>&nbsp;{hint}
        </label>
      ) : (
        <Toggle id={id}  
              animate="fast"
              bStyle={bStyle}
              style={{paddingTop: 8}}
              onChange={this.onChange}
              checked={value}>&nbsp;{hint}</Toggle>
      )}
      </FieldContainer>
    )
  }
}
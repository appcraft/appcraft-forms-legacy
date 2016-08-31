import React from 'react'
import { Field } from './Field'
import { FieldContainer } from '../components/FieldContainer'

export class StringField extends Field {

  render(){
    const { id, name, label, hint, placeholder, onPaste, value="" } = this.props

    return (
      <FieldContainer {...this.props}>
        <input id={id} 
              className="c-field" 
              type="text"
              placeholder={placeholder} 
              onChange={this.onChange}
              onPaste={onPaste}
              value={value} />
        {hint && <div className="c-hint a-hint">{hint}</div>}
      </FieldContainer>
    )
  }
}
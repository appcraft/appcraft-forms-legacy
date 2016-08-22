import React from 'react'
import { Field } from './Field'
import { FieldContainer } from '../components/FieldContainer'

export class NumberField extends Field {

  render(){
    const { id, name, label, hint, placeholder, value="" } = this.props

    return (
      <FieldContainer {...this.props}>
        <input id={id} 
              className="c-field" 
              type="number"
              placeholder={placeholder} 
              onChange={this.onChange}
              value={value} />
        {hint && <div class="c-hint a-hint">{hint}</div>}
      </FieldContainer>
    )
  }
}
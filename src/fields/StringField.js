import React from 'react'
import { Field } from './Field'
import { FieldContainer } from '../components/FieldContainer'

export class StringField extends Field {

  render(){
    const { id, name, label, hint, error, placeholder, onPaste, value="" } = this.props
    const msg = error || hint
    // if (name == "firstname") console.log("msg", msg)
    return (
      <FieldContainer {...this.props}>
        <input id={id} 
              className={"c-field" + (error ? " c-field--error" : "")} 
              type="text"
              placeholder={placeholder} 
              onChange={this.onChange}
              onPaste={onPaste}
              value={value} />
        {msg && <div className={"c-hint a-hint" + (error ? " c-hint--error c-hint--static" : "")}>{msg}</div>}
      </FieldContainer>
    )
  }
}
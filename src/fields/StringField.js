import React from 'react'
import { Field } from './Field'

export class StringField extends Field {

  render(){
    const { id, name, label, hint, placeholder, value="", horizontal } = this.props

    let classNames = "c-form-element"
    if (horizontal) classNames += " c-form-element--horizontal"

    return (
      <div className={classNames}>
        <label className="c-label" htmlFor={id}>{label || name || id}</label>
        <div className="c-label-field-group">
          <input id={id} 
                className="c-field" 
                type="text"
                placeholder={placeholder} 
                onChange={this.onChange}
                value={value} />
          {hint && <div className="c-hint a-hint">{hint}</div>}
        </div>
      </div>
    )
  }
}
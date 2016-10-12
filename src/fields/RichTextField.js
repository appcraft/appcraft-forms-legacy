import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import { Field } from './Field'
import RichTextEditor from 'react-rte';

export class RichTextField extends Field {
  
  constructor(props){
    super(props)

    this.state = {
      value: RichTextEditor.createValueFromString(props.value || "", "html")
    }
  }
  
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }

  onChange = (value) => {
    const { name, onChange } = this.props
    this.setState({value});
    if (onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      onChange(name, value.toString('html'))
    }
  };

  render(){
    const { id, name, label, hint, placeholder, value="", horizontal } = this.props

    let classNames = "c-form-element"
    if (horizontal) classNames += " c-form-element--horizontal"

    return (
      <div className={classNames}>
        <label className="c-label" htmlFor={id}>{label || name || id}</label>
        <div className="c-label-field-group">
          <RichTextEditor
            className="c-field"
            editorClassName="c-text"
            customStyleMap={{
              color: 'red'
            }}
            value={this.state.value}
            onChange={this.onChange}
          />
{/*
          <input id={id} 
                className="c-field" 
                type="text"
                placeholder={placeholder} 
                onChange={this.onChange}
                value={value} />*/}
          {hint && <div className="c-hint a-hint">{hint}</div>}
        </div>
      </div>
    )
  }
}

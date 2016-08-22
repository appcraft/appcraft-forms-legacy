import React from 'react'

export class FieldContainer extends React.Component {
  render(){
    const { id, name, label, hint, horizontal, children, className, style } = this.props

    let classNames = "c-form-element"
    if (horizontal) classNames += " c-form-element--horizontal"
    if (className)  classNames += " " + className

    return (
      <div className={classNames} style={style}>
        <label className="c-label" htmlFor={id}>{label || name || id}</label>
        <div className="c-label-field-group">
          {children}
        </div>
      </div>
    )
  }
}
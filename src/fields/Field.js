import React from 'react'

export class Field extends React.Component {
  constructor(props){
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange(e){
    const { name, onChange } = this.props
    if (onChange){
      onChange(name, e.target.value)
    }
  }
}
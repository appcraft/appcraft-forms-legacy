import React from 'react'

class SelectField extends React.Component {
  
  showComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }
  
  render(){
    const {name, value, options, onChange, type, autoFocus} = this.props
    
    return (
      <FieldContainer {...this.props}>
        <select value={value} onChange={(e) => onChange(name, e.target.value)}>
          {options.map(o => <option key={o.value} value={o.value}>{o.label || o.value}</option>)}
        </select>
      </FieldContainer>
    )
  }
}
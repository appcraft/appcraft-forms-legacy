import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import { Field } from './Field'
import { FieldContainer } from '../components/FieldContainer'

export class SelectField extends Field {
  
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }
  
  render(){
    const {id, value="", options} = this.props
    
    return (
      <FieldContainer {...this.props}>
        <select className="c-choice c-choice--small" id={id} value={value} onChange={this.onChange}>
          <option disabled value="">-- Select Value --</option>
          {options.map(o => <option key={o.value} value={o.value}>{o.label || o.value}</option>)}
        </select>
      </FieldContainer>
    )
  }
}
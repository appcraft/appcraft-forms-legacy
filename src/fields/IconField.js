import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import { FieldContainer } from '../components/FieldContainer'
import { Icon } from '../components/Icon'
import Select from 'react-select'
import { faNames } from '../utils/fa'
import 'react-select/dist/react-select.min.css'

import './icon-field.scss'

const selectNames = faNames.map(name => ({value: name, label: name}))

export class IconField extends React.Component {
  
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }
  
  render(){
    const {name, value, onChange, required} = this.props
    return (
      <FieldContainer {...this.props}>
        <Select
          className="ac-select-icon"
          name={name}
          value={value}
          options={selectNames}
          clearable={false}
          multi={false}
          onChange={v => onChange(name, v.value)} 
          valueRenderer={v => <span><Icon name={v.value} /> {v.value}</span>}
          optionRenderer={v => (
            <div>
              <div><Icon name={v.value} /></div>
              <div>{v.value}</div>
            </div>
          )}
          />
      </FieldContainer>
    )
  }
}


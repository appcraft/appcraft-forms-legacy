import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import { FieldContainer } from '../components/FieldContainer'
import Select from 'react-select'

import 'react-select/dist/react-select.min.css'

const defaultRenderer = ({label, value}) => <div>{label || value}</div>

export class MultiSelectField extends React.Component {
  
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }
  
  render(){
    const {name, value, onChange, options, multiple, optionRenderer=defaultRenderer} = this.props
          // valueRenderer={v => <div>{v.label}</div>}
          // optionRenderer={v => (
          //   <div>{v.label}</div>
          // )}
    return (
      <FieldContainer {...this.props}>
        <Select
          className=""
          name={name}
          value={value || (multiple ? [] : undefined)}
          options={options}
          clearable={false}
          multi={multiple}
          onChange={v => {
            onChange(name, v)}
          } 
          valueRenderer={defaultRenderer}
          optionRenderer={optionRenderer}
          />
      </FieldContainer>
    )
  }
}


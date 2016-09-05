import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import { FieldContainer } from '../components/FieldContainer'
import Select from 'react-select'

import 'react-select/dist/react-select.min.css'

export class RefField extends React.Component {
  
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }
  
  render(){
    const {name, value=[], onChange, table, multiple, optionRenderer} = this.props
          // valueRenderer={v => <div>{v.label}</div>}
          // optionRenderer={v => (
          //   <div>{v.label}</div>
          // )}
    return (
      <FieldContainer {...this.props}>
        <Select.Async
          className=""
          name={name}
          value={value}
          valueKey="id" 
          labelKey="label"
          loadOptions={(input) => {
            console.log("loadOptions", input)
            return fetch(`http://localhost:8080/api/documents/${table}/_autocomplete?q=${input}`)
              .then(res => res.json())
              .then(options => ({ options }))
          }}
          clearable={false}
          multi={multiple}
          onChange={v => {
            onChange(name, v.map(v => ({id: v.id, label: v.label})))}
          } 
          optionRenderer={optionRenderer}
          />
      </FieldContainer>
    )
  }
}


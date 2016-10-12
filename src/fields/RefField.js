import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import { FieldContainer } from '../components/FieldContainer'
import Select from 'react-select'
import { AsyncCreatable } from 'react-select';

import 'react-select/dist/react-select.min.css'

export class RefField extends React.Component {
  
  constructor(props){
    super(props)

    this.mapValue = this.mapValue.bind(this) 
  }

  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }

  createIfNeeded(v){
    console.log("createIfNeeded", v)
    const { host=REST_API, table } = this.props
    if (v.id === v.label){
      fetch(`${host}/api/documents`, {
        method: 'POST', 
        mode: 'cors', 
        redirect: 'follow',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          ...v,
          id: null, // flush id
          table
        })
      })
      .then(res => res.json())
      .then(res => {
        // Update with correct value
        console.log("update with new value", res)
        const newV = {
          ...v,
          id: res.id
        }
        const { multiple, name, onChange, value } = this.props
        if (multiple){
          onChange(name, value.map(oldV => oldV.id == v.id ? newV : oldV))
        } else if (value && value.id == v.id){
          return onChange(name, newV)
        }
      })
    }
    return v
  }

  mapValue(v){  
    if (this.props.multiple){
      return v.map(v => this.createIfNeeded({id: v.id, label: v.label}))
    } else if (v){
      return this.createIfNeeded({id: v.id, label: v.label})
    } else {
      return v
    }
  }
  
  render(){
    const {host=REST_API, name, value=[], onChange, table, multiple, optionRenderer, creatable=false} = this.props
          // valueRenderer={v => <div>{v.label}</div>}
          // optionRenderer={v => (
          //   <div>{v.label}</div>
          // )}
    const Component = creatable ? AsyncCreatable : Select.Async
    return (
      <FieldContainer {...this.props}>
        <Component
          className=""
          name={name}
          value={value}
          valueKey="id" 
          labelKey="label"
          loadOptions={(input) => {
            console.log("loadOptions", input)
            return fetch(`${host}/api/documents/${table}/_autocomplete?q=${input}`)
              .then(res => res.json())
              .then(options => ({ options }))
          }}
          clearable={true}
          cache={false}
          multi={multiple}
          onChange={v => {
            onChange(name, this.mapValue(v))}
          } 
          optionRenderer={optionRenderer}
          />
      </FieldContainer>
    )
  }
}


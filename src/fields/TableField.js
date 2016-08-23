import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

import { IconButton } from '../components/IconButton'
import { Icon } from '../components/Icon'
import { FieldContainer } from '../components/FieldContainer'
import { ButtonGroup, Button } from 'react-blazecss'

import { StringField } from './StringField'
import './table-field.scss'

function getFieldComponent(fieldTypes, type){
  if (type in fieldTypes) return fieldTypes[type]
  return StringField
}

const DragHandle = SortableHandle(() => (
  <Icon name="bars" style={{color: '#BBB', float: 'left', padding: 4, cursor: 'move'}} />
));

export class RowFields extends React.Component {

  constructor(props){
    super(props)
    
    this.updateField = (fieldName, value) => {
      const { name, onChange } = this.props
      console.log("updateField", name, fieldName, value)
      onChange(name, fieldName, value)
    }
    this.handleDelete = (e) => {
      e.preventDefault()
      const { index, onDelete } = this.props
      onDelete(index)
    }
    this.handleEdit = (e) => {
      e.preventDefault()
      const { index, onEdit } = this.props
      onEdit(index)
    }
  }

  static contextTypes = {
    acForms: React.PropTypes.object
  }
  
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }
  
  render(){

    const { index, isExtra, fields, hasEdit } = this.props
    // const hasEdit = visibleFields && (visibleFields.length != fields.length)
    return (
      <tr className="ac-fields-table__row" style={{opacity: (isExtra ? 0.5 : undefined)}} >
        <td style={{textAlign: 'right', paddingLeft: 4}}>{isExtra ? '' : <span><DragHandle /> {index+1}</span>}</td>
        {this.renderFields()}
        <td style={{textAlign: 'right'}}>
          {this.renderButtons()}
        </td>
      </tr>
    )
  }

  renderButtons(){
    const { isExtra, hasEdit } = this.props
    if (isExtra) return null
    
    if (hasEdit) {
      return (
        <ButtonGroup ghost size="small">
          <IconButton icon="pencil" bStyle="secondary" onClick={this.handleEdit} />
          <IconButton icon="trash" bStyle="error" onClick={this.handleDelete} />
        </ButtonGroup>
      )
    } else {
      return (
        <ButtonGroup ghost size="small">
          <IconButton icon="trash" bStyle="error" onClick={this.handleDelete} />
        </ButtonGroup>
      )
    }
  }
  
  renderFields(){
    const { data={}, fields=[], onChange, prefix="", horizontal } = this.props
    console.log("fields", fields)
    return fields.map((field, idx) => {
      const { name, label, type } = field
      
      // if (type == "componentList") return undefined // TODO: remove
      
      const key = name || label || (type + "-" + (idx+1))
      const Component = getFieldComponent(this.context.acForms.fieldTypes, type)      
      if (type === "computed" || type === "length" || type === "tabs"){
        return (
          <td key={"field-" + key}>
            <Component  horizontal={horizontal}
                        {...field}
                        id={prefix + name}
                        noContainer={true}
                        data={data} />
          </td>
        )
      }
      return (
        <td key={"field-" + key} >
          <Component horizontal={horizontal}
                      {...field}
                      id={prefix + key}
                      noContainer={true}
                      onChange={this.updateField} 
                      value={data[name]} />
        </td>
      )
    })
  }
}

const SortableRowField = SortableElement(props => <RowFields {...props} />);

const SortableTableBody = SortableContainer(class TableFieldBody extends React.Component {
  render(){
    const { id, fields, value, onChange, onDelete, onEdit, hasEdit } = this.props
    const rows = value.map((data, idx) => (
      <SortableRowField key={idx} 
                  index={idx} 
                  name={idx} 
                  prefix={`${id}[${idx}].`}
                  fields={fields} 
                  hasEdit={hasEdit}
                  data={data}
                  onChange={onChange}
                  onDelete={onDelete}
                  onEdit={onEdit}  />
    ))
    
    // Extra greyed out one to add rows
    rows.push(
      <RowFields key={value.length} 
                  index={value.length}
                  name={value.length}
                  prefix={`${id}[${value.length}].`}
                  isExtra 
                  fields={fields}
                  onChange={onChange} />
    )

    return (
      <tbody>
        {rows}
      </tbody>
    )
  }
})

export class TableField extends React.Component {
  constructor(props){
    super(props)

    this.updateEntry = this.updateEntry.bind(this)
    this.deleteEntry = this.deleteEntry.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
  }
  
  updateEntry(idx, fieldName, fieldValue) {
    const { value=[], data, name, onChange } = this.props
  
    if (idx >= value.length){
      onChange(name, [...value, {[fieldName]: fieldValue}])
      return
    }

    const newArray = value.map((data, i) => (i == idx) ? {
      ...data, 
      [fieldName]: fieldValue
    } : data)
    console.log("newArray", newArray)
    onChange(name, newArray)
  }

  deleteEntry(idx) {
    console.log("deleteEntry", idx)
    const { name, value=[], onChange } = this.props
    const array = [...value]
    array.splice(idx, 1)
    onChange(name, array)
  }  

  onSortEnd({oldIndex, newIndex}) {
      const {value, name, onChange} = this.props;
      onChange(name, arrayMove(value, oldIndex, newIndex))
  }

  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }

  fieldsToRender(){
    const { fields, visibleFields } = this.props
    if (!visibleFields) return fields

    return visibleFields.map((name) => fields.find(f => f.name === name))
  }  
  
  render(){
    const { id, fields, visibleFields, value=[], entryLabel="Entry" } = this.props

    const hasEdit = visibleFields && visibleFields.length != fields.length
    const actionWidth = hasEdit ? 100 : 68
    const rowFields = this.fieldsToRender()
    
    return (
      <FieldContainer {...this.props}>
        <table className="ac-fields-table" style={{width: '100%'}}>
          <thead>
            <tr className="ac-fields-table__row" >
              <th style={{width: 90, textAlign: 'right'}}>#</th>
              {rowFields.map((field, idx) => (
                <th key={idx+1} style={{width: field.width}}>{field.label}</th>
              ))}
              <th style={{width: actionWidth}} />
            </tr>
          </thead>
          <SortableTableBody id={id}  
                             fields={rowFields} 
                             onSortEnd={this.onSortEnd}
                             hasEdit={hasEdit} 
                             value={value}
                             onChange={this.updateEntry}
                             onDelete={this.deleteEntry}
                             onEdit={this.editEntry}
                             useDragHandle={true}
                             lockToContainerEdges={true}
                              />
        </table>
      </FieldContainer>
    )
  }
}

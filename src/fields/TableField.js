import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';

import { IconButton } from '../components/IconButton'
import { Icon } from '../components/Icon'
import { FieldContainer } from '../components/FieldContainer'
import { ButtonGroup, Button } from 'react-blazecss'
import { Table, TBody, THead, TR, TH, TD } from 'react-blazecss'

import { StringField } from './StringField'
import { ModalForm } from './ModalForm'
import { Modal } from '../components/Modal'
import Portal from 'react-portal'
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
    const width = hasEdit ? 90 : 60
    // const hasEdit = visibleFields && (visibleFields.length != fields.length)
    return (
      <TR style={{opacity: (isExtra ? 0.5 : undefined)}} >
        <TD style={{textAlign: 'right', paddingLeft: 4, width: 90, maxWidth: 90, paddingTop: '0.75em'}}>
          {isExtra ? '' : <span style={{width: '100%'}}><DragHandle /> {index+1}</span>}
        </TD>
        {this.renderFields()}
        <TD style={{textAlign: 'right', width, maxWidth: width}}>
          {this.renderButtons()}
        </TD>
      </TR>
    )
  }

  renderButtons(){
    const { isExtra, hasEdit } = this.props
    if (isExtra) return null
    
    return (
      <ButtonGroup ghost size="small">
        {hasEdit && <IconButton span icon="pencil" bStyle="secondary" onClick={this.handleEdit} />}
        <IconButton span icon="trash" bStyle="error" onClick={this.handleDelete} />
      </ButtonGroup>
    )
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
          <TD key={"field-" + key}>
            <Component  horizontal={horizontal}
                        {...field}
                        id={prefix + name}
                        noContainer={true}
                        data={data} />
          </TD>
        )
      }
      return (
        <TD key={"field-" + key} >
          <Component horizontal={horizontal}
                      {...field}
                      id={prefix + key}
                      noContainer={true}
                      onChange={this.updateField} 
                      value={data[name]} />
        </TD>
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
      <SortableRowField key={value.length} 
                  disabled={true}
                  index={value.length}
                  name={value.length}
                  prefix={`${id}[${value.length}].`}
                  isExtra 
                  hasEdit={hasEdit}
                  fields={fields}
                  onChange={onChange} />
    )

    return (
      <TBody>
        {rows}
      </TBody>
    )
  }
})

export class TableField extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      showEditPopup: false,
      currentIndex: false
    }

    this.updateEntry = this.updateEntry.bind(this)
    this.deleteEntry = this.deleteEntry.bind(this)
    this.editEntry = this.editEntry.bind(this)
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

  editEntry(idx) {
    console.log("edit", idx)
    this.setState({
      showEditPopup: true,
      currentIndex: idx
    })
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
    const actionWidth = hasEdit ? 90 : 60
    const rowFields = this.fieldsToRender()
    
    console.log("this.state.showEditPopup", this.state.showEditPopup)

    return (
      <FieldContainer {...this.props}>
        <Table striped style={{width: '100%', border: '1px solid #CCC'}}>
          <THead>
            <TR heading>
              <TH style={{width: 90, maxWidth: 90, textAlign: 'right'}}>#</TH>
              {rowFields.map((field, idx) => (
                <TH key={idx+1} style={{width: field.width}}>{field.label}</TH>
              ))}
              <TH style={{width: actionWidth, maxWidth: actionWidth}} />
            </TR>
          </THead>
          <SortableTableBody id={id}  
                             fields={rowFields} 
                             onSortEnd={this.onSortEnd}
                             hasEdit={hasEdit} 
                             value={value}
                             onChange={this.updateEntry}
                             onDelete={this.deleteEntry}
                             onEdit={this.editEntry}
                             useDragHandle
                             lockAxis="y"
                             lockToContainerEdges
                              />
        </Table>
        {hasEdit && <Portal isOpened={this.state.showEditPopup}>
            <ModalForm onClose={() => this.setState({showEditPopup: false})}/>
          </Portal>
        }
      </FieldContainer>
    )
  }
}

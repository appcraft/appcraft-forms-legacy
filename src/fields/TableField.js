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
  <Icon name="bars" style={{color: '#BBB', float: 'left', padding: 4, cursor: 'move', userSelect: 'none'}} />
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
      const { rowIndex, onDelete } = this.props
      onDelete(rowIndex)
    }
    this.handleEdit = (e) => {
      e.preventDefault()
      const { rowIndex, onEdit } = this.props
      onEdit(rowIndex)
    }

    this.handlePaste = (e, fieldName) => {
        const { name, onInsertValues } = this.props
        if (!onInsertValues) return

        window.clipboardData = e.clipboardData; 
        console.log(clipboardData)
        const html = e.clipboardData.getData("text/html")
        if (html){
          var el = document.createElement( 'html' );
          el.innerHTML = html;

          const tables = el.getElementsByTagName( 'table' );
          console.log(tables)
          window.tables = tables
          if (tables.length == 1){
            const table = tables[0]
            console.log("table", table)
            const rows = table.getElementsByTagName("tr")
            const values = []
            for(let i=0; i<rows.length; i++){
              const tr = rows.item(i)
              const tds = tr.getElementsByTagName("td")
              if (tds.length > 0) values.push(tds[0].textContent)
            }
            if (values.length > 0) {
              onInsertValues(name, fieldName, values)
              e.preventDefault() // Do custom logic here :) 
              return
            }
          }
        }
        // console.log("HTML", e.clipboardData.getData('text/html'))
        // console.log("TEXT", e.clipboardData.getData('text/plain').split("\t"))
        // console.log("RTF", e.clipboardData.getData('text/rtf'))
    }
  }

  static contextTypes = {
    acForms: React.PropTypes.object
  }
  
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }
  
  render(){

    const { rowIndex, isExtra, fields, hasEdit } = this.props
    // console.log("index", index)
    const width = hasEdit ? 90 : 60
    // const hasEdit = visibleFields && (visibleFields.length != fields.length)
    // style={{opacity: (isExtra ? 0.7 : undefined)}}
    return (
      <TR  >
        <TD style={{textAlign: 'right', paddingLeft: 4, width: '7em', maxWidth: '7em', paddingTop: '0.75em'}}>
          {isExtra ? '' : <span style={{width: '100%'}}><DragHandle /> {rowIndex+1}</span>}
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
      <ButtonGroup ghost size="small" style={{height: '2em'}}>
        {hasEdit && <IconButton span icon="pencil" bStyle="secondary" onClick={this.handleEdit} />}
        <IconButton span icon="trash" bStyle="error" onClick={this.handleDelete} />
      </ButtonGroup>
    )
  }
  
  renderFields(){
    const { data={}, fields=[], onChange, prefix="", horizontal } = this.props
    return fields.map((field, idx) => {
      const { name, label, type, component } = field
      
      // if (type == "componentList") return undefined // TODO: remove
      
      const key = name || label || (type + "-" + (idx+1))
      const Component = component || getFieldComponent(this.context.acForms.fieldTypes, type)      
      if (type === "computed" || type === "length" || type === "tabs"){
        return (
          <TD key={"field-" + key} style={{width: field.width, maxWidth: field.width}}>
            <Component  horizontal={horizontal}
                        {...field}
                        id={prefix + name}
                        noContainer={true}
                        data={data} />
          </TD>
        )
      }
      return (
        <TD key={"field-" + key} style={{width: field.width, maxWidth: field.width}}>
          <Component horizontal={horizontal}
                      {...field}
                      id={prefix + key}
                      noContainer={true}
                      onChange={this.updateField}
                      onPaste={(e) => this.handlePaste(e, name)}
                      value={data[name]} />
        </TD>
      )
    })
  }
}

const SortableRowField = SortableElement(RowFields);

const SortableTableBody = SortableContainer(class TableFieldBody extends React.Component {
  render(){
    const { id, fields, value, onChange, onDelete, onEdit, hasEdit, onInsertValues, addToTop=false } = this.props




    const rows = value.map((data, idx) => (
      <SortableRowField key={idx} 
                  index={idx} 
                  rowIndex={idx} 
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
    /*if (addToTop){
      rows.unshift(
        <SortableRowField key={-1} 
                    disabled={true}
                    index={-1}
                    name={-1}
                    prefix={`${id}[${value.length}].`}
                    isExtra 
                    hasEdit={hasEdit}
                    fields={fields}
                    onChange={onChange}
                    onInsertValues={onInsertValues} />
      )
    }*/

    // Extra greyed out one to add rows
    rows.push(
      <SortableRowField key={value.length} 
                  disabled={true}
                  index={value.length}
                  rowIndex={value.length}
                  name={value.length}
                  prefix={`${id}[${value.length}].`}
                  isExtra 
                  hasEdit={hasEdit}
                  fields={fields}
                  onChange={onChange}
                  onInsertValues={onInsertValues} />
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
    this.handleInsertValues = this.handleInsertValues.bind(this)
    this.deleteEntry = this.deleteEntry.bind(this)
    this.editEntry = this.editEntry.bind(this)
    this.onSortEnd = this.onSortEnd.bind(this)
    this.handlePopupEditSave = this.handlePopupEditSave.bind(this)

    this.editPrev = (e) => {
      this.setState({
        currentIndex: this.state.currentIndex-1
      })
    }
    this.editNext = (e) => {
      this.setState({
        currentIndex: this.state.currentIndex+1
      })
    }
  }

  static contextTypes = {
    acForms: React.PropTypes.object
  }

  handlePopupEditSave(newValue){
    const { value=[], name, onChange } = this.props

    const newArray = [...value]
    newArray[this.state.currentIndex] = newValue
    onChange(name, newArray)
    this.setState({showEditPopup: false})
  }
  
  updateEntry(idx, fieldName, fieldValue) {
    const { value=[], name, onChange } = this.props
  
    if (idx >= value.length){
      onChange(name, [...value, {[fieldName]: fieldValue}])
      return
    }

    const newArray = [...value]
    newArray[idx] = {
      ...newArray[idx],
      [fieldName]: fieldValue
    }
    onChange(name, newArray)
  }

  handleInsertValues(baseIndex, fieldName, fieldValues){
    const { value=[], name, onChange } = this.props

    console.log("baseIndex", baseIndex)
  
    let newArray = [...value]

    fieldValues.forEach((fieldValue, extraIndex) => {
      const idx = baseIndex + extraIndex
      // this.updateEntry(idx+extraIndex, fieldName, value)

      if (idx >= newArray.length){
        newArray.push({[fieldName]: fieldValue})
      } else {
        newArray[idx] = {
          ...newArray[idx],
          [fieldName]: fieldValue
        }
      }
    })

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
      console.log("move", oldIndex, newIndex)
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
    const { name, id, fields, visibleFields, value=[], entryLabel="Entry", addToTop } = this.props
    const { showEditPopup, currentIndex } = this.state

    const hasEdit = visibleFields && visibleFields.length != fields.length
    const actionWidth = hasEdit ? 90 : 60
    const rowFields = this.fieldsToRender()

    return (
      <FieldContainer {...this.props}>
        <Table striped style={{width: '100%', border: '1px solid #CCC', fontSize: '0.9em'}}>
          <THead>
            <TR heading>
              <TH style={{width: '7em', maxWidth: '7em', textAlign: 'right'}}>#</TH>
              {rowFields.map((field, idx) => (
                <TH key={idx+1} style={{width: field.width, maxWidth: field.width}}>{field.label}</TH>
              ))}
              <TH style={{width: actionWidth, maxWidth: actionWidth}} />
            </TR>
          </THead>
          <SortableTableBody id={id}  
                             fields={rowFields} 
                             onSortEnd={this.onSortEnd}
                             hasEdit={hasEdit} 
                             value={value}
                             addToTop={addToTop}
                             onChange={this.updateEntry}
                             onDelete={this.deleteEntry}
                             onEdit={this.editEntry}
                             onInsertValues={this.handleInsertValues}
                             useDragHandle
                             lockAxis="y"
                             lockToContainerEdges
                              />
        </Table>
        {hasEdit && <Portal isOpened={showEditPopup}>
            <ModalForm title={"Entry #" + (currentIndex + 1)}
                       onPrev={true}
                       onNext={true}
                       data={value[currentIndex]}
                       fields={fields}
                       fieldTypes={this.context.acForms.fieldTypes}
                       onPrev={currentIndex > 0 && this.editPrev}
                       onNext={currentIndex < value.length-1 && this.editNext}
                       onApply={this.handlePopupEditSave}
                       onClose={() => this.setState({showEditPopup: false})}/>
          </Portal>
        }
      </FieldContainer>
    )
  }
}

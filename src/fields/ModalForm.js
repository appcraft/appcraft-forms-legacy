import React from 'react'

import { ButtonGroup, Button, H3, Overlay, Container } from 'react-blazecss'
import { Icon } from '../components/Icon'
import { ScrollLock } from '../components/ScrollLock'
import { Form } from '../Form'

export class ModalForm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      data: props.data
    }

    this.onChange = (formName, fieldName, value) => {
      console.log("onChange", formName, fieldName, value)
      this.setState({
        data: {
          ...this.state.data,
          [fieldName]: value
        }
      })
    }

    this.handleSave = (e) => {
      e.preventDefault()
      e.stopPropagation()

      const { onApply } = this.props
      if (onApply){
        onApply(this.state.data)
      }
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      data: nextProps.data
    })
  }

  render(){
    const { title = "Title", onPrev, onNext, onClose, fields, fieldTypes, data } = this.props
    return (
      <div style={{position: 'fixed', overflow: 'hidden', left: 0, right: 0, top: 0, bottom: 0, zIndex: 900}}>
        <ScrollLock />
        <Overlay />
        <Container size="medium">
          <div className="c-modal c-modal--highest">
            <header className="c-modal__header" style={{paddingLeft: '1em', paddingRight: '1em'}}>
              <H3 size="small" style={{position: 'relative'}}>
                {onPrev && <Button style={{border: 0, background: 'transparent', position: 'absolute', left: 0, color: '#333'}} size="xsmall" onClick={onPrev}><Icon name="chevron-left" /></Button>}
                {onNext && <Button style={{border: 0, background: 'transparent', position: 'absolute', right: 0, color: '#333'}} size="xsmall" onClick={onNext}><Icon name="chevron-right" /></Button>}
                {title}
              </H3>
            </header>

            <div className="c-modal__body">        
              <Form fieldTypes={fieldTypes} 
                    fields={fields}
                    data={this.state.data} 
                    onChange={this.onChange}/>
            </div>

            <footer className="c-modal__footer" style={{textAlign: 'right'}}>
              <ButtonGroup>
                <Button bStyle="error" onClick={onClose}><Icon name="times" /> Cancel</Button>
                <Button bStyle="success" onClick={this.handleSave} disabled={this.state.data == data}><Icon name="save" /> Apply</Button>
              </ButtonGroup>
            </footer>
          </div>
        </Container>
      </div>
    )
  }
}
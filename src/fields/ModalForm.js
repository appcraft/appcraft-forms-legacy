import React from 'react'

import { ButtonGroup, Button, H3, Overlay } from 'react-blazecss'
import { Icon } from '../components/Icon'
import { ScrollLock } from '../components/ScrollLock'

export class ModalForm extends React.Component {
  render(){
    const { title = "Title", onPrev, onNext, onClose, onApply } = this.props
    return (
      <div style={{position: 'fixed', overflow: 'hidden', left: 0, right: 0, top: 0, bottom: 0}}>
        <ScrollLock />
        <Overlay />
        <div className="c-modal c-modal--highest">
          <header className="c-modal__header">
            <H3 size="small">{title}</H3>
          </header>

          <div className="c-modal__body">
            This is the modal body
          </div>

          <footer className="c-modal__footer">
            <ButtonGroup>
              <Button bStyle="error" onClick={onClose}><Icon name="times" /> Cancel</Button>
              <Button bStyle="success" onClick={onApply}><Icon name="save" /> Apply</Button>
            </ButtonGroup>
          </footer>
        </div>
      </div>
    )
  }
}
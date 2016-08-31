import React from 'react'

import { ButtonGroup, Button, H3 } from 'react-blazecss'
import { Icon } from './Icon'

export const ModalHeader = ({childre, ...props}) => (
  <header className="c-modal__header">
    {children}
  </header>
)

export class Modal extends React.Component {
  render(){
    return (
      <div className="c-modal c-modal--highest">
        {children}

        <div className="c-modal__body">
          This is the modal body
        </div>

        <footer className="c-modal__footer">
          <ButtonGroup>
            <Button bStyle="error"><Icon name="times" /> Cancel</Button>
            <Button bStyle="success"><Icon name="save" /> Apply</Button>
          </ButtonGroup>
        </footer>
      </div>
    )
  }
}
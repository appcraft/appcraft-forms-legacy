import React from 'react'
import { Button } from 'react-blazecss'
import { Icon } from './Icon'

export const IconButton = ({icon, ...props}) => (
  <Button {...props}>
    <Icon name={icon} />
  </Button>
) 
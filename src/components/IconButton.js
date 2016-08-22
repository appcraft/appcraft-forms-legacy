import React from 'react'
import { Button } from 'react-blazecss'

export const IconButton = ({icon, ...props}) => (
  <Button {...props}>
    <span className={"fa fa-fw fa-" + icon} />
  </Button>
) 
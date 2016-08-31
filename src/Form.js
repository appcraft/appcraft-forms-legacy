import React from 'react'
import './styles.scss'

import { Fields } from './fields/Fields'

export class Form extends React.Component {

  getChildContext() {
    return {
      acForms: {
        fieldTypes: this.props.fieldTypes
      }
    }
  }

  static childContextTypes = {
    acForms: React.PropTypes.object
  }

  render(){
    const { horizontal=true, className="", style={} } = this.props
    var classNames = "c-form " + className

    return (
      <form className={classNames} style={{color: "#333", ...style}}>
        <Fields {...this.props} horizontal={horizontal}/>
      </form>
    )
  }
}

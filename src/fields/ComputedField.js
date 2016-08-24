import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import { Field } from './Field'
import { FieldContainer } from '../components/FieldContainer'

import hogan from 'hogan.js'

export class ComputedField extends React.Component {
  
  shouldComponentUpdate(nextProps, nextState){
    // TODO : filter on data fields that matter...
    return shallowCompare(this, nextProps, nextState)
  }

  compileTemplate(template){
    // lazy template compiling
    if (this.compiledTemplate == template){
      return this.compilationResult
    }
    this.compilationResult = hogan.compile(template)
    this.compiledTemplate = template
    return this.compilationResult
  }
  
  render(){
    const { data, template } = this.props
        
    const compiledTemplate = this.compileTemplate(template)
    const __text = compiledTemplate.render(data)
    
    return (
      <FieldContainer {...this.props}>
        <div className="c-field" style={{borderColor: '#CCC', lineHeight: 'normal'}}>
          {__text ? __text : <span>&nbsp;</span>}
        </div>
      </FieldContainer>
    )
  }
}
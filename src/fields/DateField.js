import React from 'react'
import { Field } from './Field'
import MaskedInput from 'react-text-mask'
import { IconButton } from '../components/IconButton'
import { FieldContainer } from '../components/FieldContainer'
import moment from 'moment'
import shallowCompare from 'react-addons-shallow-compare'

import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css'; // only needs to be imported once

export class DateField extends Field {

  constructor(props){
    super(props)

    this.state = {
      showCalendar: false
    }

    this.toggleCalendar = (e) => {
      e.preventDefault()
      this.setState({ showCalendar: !this.state.showCalendar})
    }
  }
  
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }

  handleCalendarSelect = (e) => {
    this.setState({
      showCalendar: false
    }, () => {
      const { onChange, name } = this.props
      if (onChange){
        onChange(name, e.format("DD/MM/YYYY"))
      }
    })
  }

  parseDate(){
    const { value="" } = this.props
    try {
      const date = moment(value, "DD/MM/YYYY").toDate();
      if ( isNaN( date.getTime() ) ) {
        return new Date();
      }
      return date
    } catch(e){
      return new Date();
    }
  }

  render(){
    const { id, name, label, hint, placeholder, value="", horizontal } = this.props

    let classNames = "c-form-element"
    if (horizontal) classNames += " c-form-element--horizontal"

    console.log("parseDate", this.parseDate())

    return (
      <FieldContainer {...this.props}>
        <div className="c-input-group">
          <MaskedInput id={id} 
                className="c-field" 
                guide={true}
                mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                onChange={this.onChange}
                type="text"
                placeholder={"01/01/1970"} 
                value={value} />
          {hint && <div class="c-hint a-hint">{hint}</div>}
          <IconButton icon="calendar" onClick={this.toggleCalendar} bStyle="primary"/>
        </div>
        {this.state.showCalendar && (
          <div className="c-card--highest"
                style={{position: 'absolute', top: 0, right: 0, width: '100%', maxWidth: 400, marginTop: 38, zIndex: 12}}>
            <InfiniteCalendar
                width="100%"
                height={360}
                selectedDate={this.parseDate()}
                keyboardSupport={true}
                afterSelect={this.handleCalendarSelect}
              />
          </div>
        )}
      </FieldContainer>
    )
  }
}
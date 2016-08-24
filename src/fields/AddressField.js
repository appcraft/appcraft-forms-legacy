import React from 'react'
import shallowCompare from 'react-addons-shallow-compare'

import { FieldContainer } from '../components/FieldContainer'

export class AddressField extends React.Component {
  
  shouldComponentUpdate(nextProps, nextState){
    return shallowCompare(this, nextProps, nextState)
  }

  handleValidate = () => {
    var place = this.autocomplete.getPlace();
    console.log("place.address_components", place.address_components)

    const keyMapping = {
      "street_number": "street number",
      "route": "street",
      "locality": "city",
      "administrative_area_level_2": "departement",
      "administrative_area_level_1": "region",
      "country": "country",
      "postal_code": "zip code",
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    const processed = {}
    const { data, name, onChange } = this.props
    for (var i = 0; i < place.address_components.length; i++) {
      const component = place.address_components[i]
      var addressType = component.types[0];
      if (keyMapping[addressType]) {
        onChange(keyMapping[addressType], component.long_name)
        processed[keyMapping[addressType]] = true
      }
    }
    
    // Flush unprocessed values
    Object.keys(keyMapping).forEach(k => {
      const name = keyMapping[k]
      if (!processed[name]) onChange(name, "")
    })
  }

  initGoogleMaps(){
    console.log("initGoogleMaps")
    this.autocomplete = new window.google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(this.refs.autocomplete),
      {types: ['geocode']});

    this.listener = this.autocomplete.addListener('place_changed', this.handleValidate)
  }
  
  componentDidMount(){
    this._isMounted = true
    if (window.google){
      this.initGoogleMaps()
    } else {
      console.log("Load script")
      const script = document.createElement('script') 
      script.type = "text/javascript"
      script.async = true
      // script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDoiPcdpyW_0MtTEJF7O-T4m9ksQrYLRt0&signed_in=true&libraries=places"
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBH1h0_cKZialjE-ttuH8ZfgTwm106JM3Q&signed_in=true&libraries=places"
      script.onload = () => {
        if (this._isMounted) this.initGoogleMaps()
      }
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }
  
  componentWillUnmount(){
    this._isMounted = false
    if (this.listener) {
      this.listener.remove()
      this.listener = null
    }
  }
  
  render(){
    console.log("render address")
    return (
      <FieldContainer {...this.props}>
          <input className="c-field" ref="autocomplete" type="search" />
      </FieldContainer>
    )
  }
}

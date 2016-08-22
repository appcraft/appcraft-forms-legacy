import React from 'react'

import { FieldContainer } from '../components/FieldContainer'

class AddressField extends React.Component {
  
  handleValidate = () {
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
    this.autocomplete = new window.google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(this.refs.autocomplete),
      {types: ['geocode']});

    this.listener = this.autocomplete.addListener('place_changed', this.handleValidate)
  }
  
  componentDidMount(){
    if (window.google){
      this.initGoogleMaps()
    } else {
      const script = document.createElement('script') 
      script.type = "text/javascript"
      script.async = true
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDoiPcdpyW_0MtTEJF7O-T4m9ksQrYLRt0&signed_in=true&libraries=places"
      script.onload = function(){
        if (this._isMounted) this.initGoogleMaps()
      }
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }
  
  componentWillUnmount(){
    if (this.listener) {
      this.listener.remove()
      this.listener = null
    }
  }
  
  render(){
    return (
      <FieldContainer {...this.props}>
        <div className="c-field">
          <input ref="autocomplete" type="search" style={{width: '100%'}} />
        </div>
      </FieldContainer>
    )
  }
}

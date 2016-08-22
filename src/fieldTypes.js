import {
  FormHeader,
  FormTabs,
} from './components'

import { 
  ComputedField,
  DateField,
  IconField,
  NumberField,
  RichTextField,
  SelectField,
  StringField,
 } from './fields'

export const fieldTypes = {
  "header": FormHeader,
  "tabs": FormTabs,

  "string": StringField,
  "richtext": RichTextField,
  "number": NumberField,
  "date": DateField,
  "choice": SelectField,
  "computed": ComputedField,
  "icon": IconField,
  
  // "bool": BoolField,
  // "integer": NumberInputField,
  // "color": ColorField,
  // "multiselect": MultiSelectField,
  // "toggle": ToggleField,
  // "icon": IconField,
  // "image": ImageField,
  // "address": AddressField,
  // "list": ListField,
  // "table": TableField,
  // "computed": ComputedField,
  // "length": LengthField,
}
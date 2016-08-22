import { 
  DateField,
  NumberField,
  RichTextField,
  StringField,
 } from './fields'

export const fieldTypes = {
  "string": StringField,
  "richtext": RichTextField,
  "number": NumberField,
  "date": DateField,
  // "bool": BoolField,
  // "number": SliderField,
  // "integer": NumberInputField,
  // "color": ColorField,
  // "select": SelectField,
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
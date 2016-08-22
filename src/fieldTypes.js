import { 
  DateField,
  NumberField,
  StringField,
 } from './fields'

export const fieldTypes = {
  "string": StringField,
  "number": NumberField,
  "date": DateField,
  // "richtext": RichTextField,
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
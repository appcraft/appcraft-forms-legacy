import {
  FormHeader,
  FormTabs,
  FormGrid,
  FormSection,
  FormSectionToggle
} from './components'

import { 
  AddressField,
  BooleanField,
  ComputedField,
  DateField,
  FileField,
  IconField,
  ListField,
  MultiSelectField,
  NumberField,
  RefField,
  RichTextField,
  SelectField,
  StringField,
  TableField,
 } from './fields'

export const fieldTypes = {
  "header": FormHeader,
  "tabs": FormTabs,
  "grid": FormGrid,
  "section": FormSection,
  "section_toggle": FormSectionToggle,

  "string": StringField,
  "file": FileField,
  "boolean": BooleanField,
  "richtext": RichTextField,
  "number": NumberField,
  "date": DateField,
  "choice": SelectField,
  "computed": ComputedField,
  "icon": IconField,
  "address": AddressField,
  "multiselect": MultiSelectField,

  "list": ListField,
  "table": TableField,
  "ref": RefField,
  
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
import { Field } from 'payload/types'
import { CustomCountryComponent } from './component'
export const CustomCountryField: Field = {
  name: 'customCountrySelectField',
  type: 'text',
  label: 'Custom Country Selector',
  admin: {
    components: {
      Field: CustomCountryComponent,
    },
  },
}

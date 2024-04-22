import { Field } from 'payload/types'
import { CustomRootCategoryComponent } from './component'
export const CustomCountryField: Field = {
  name: 'customRootCategorySelectField',
  type: 'text',
  label: 'Custom Root Category Selector',
  admin: {
    components: {
      Field: CustomRootCategoryComponent,
    },
  },
}

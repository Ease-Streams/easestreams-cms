import type { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    useAPIKey: true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'text', // Field type (text for name)
      name: 'name', // Field name
      label: 'User Name', // Label displayed in the admin UI
      required: true, // Make the field mandatory
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
    },
  ],
}

export default Users

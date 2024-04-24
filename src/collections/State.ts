import type { CollectionConfig } from 'payload/types'

export const State: CollectionConfig = {
  slug: 'state', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'text', // Field type (text for username)
      name: 'name', // Field name
      label: 'Name', // Label displayed in the admin UI
      required: true, // Make the field mandatory
      maxLength: 150
     },
    {
      type: 'relationship', // Field type for relationships
      name: 'countryId',
      label: 'Country', // Label displayed in the admin UI
      relationTo: 'country',
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'createdBy',
      label: 'Created By', // Label displayed in the admin UI
      relationTo: 'users',
      defaultValue: ({ user }) => user.id,
      admin: {
        allowCreate: false,
      },
      access: {
        update: () => false,
      },
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'modifiedBy',
      label: 'Modified By', // Label displayed in the admin UI
      relationTo: 'users',
      defaultValue: ({ user }) => user.id,
      admin: {
        allowCreate: false,
      },
      access: {
        update: () => false,
      },
      hooks: {
        afterChange: [
          async ({ operation, req, data }) => {
            if (operation === 'update') {
              // Your custom logic here
              data.modifiedBy = req.user.id
              return data
            }
          },
        ],
      },
    },
    {
      name: 'isActive',
      label: 'Active',
      type: 'checkbox', // Field type for email
      defaultValue: true,
    },
  ],
}

export default State

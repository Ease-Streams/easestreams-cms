import type { CollectionConfig } from 'payload'

export const Plans: CollectionConfig = {
  slug: 'plans', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Name',
      required: true,
      maxLength: 150,
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Description',
      required: true,
      maxLength: 300,
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'createdBy',
      label: 'Created By',
      relationTo: 'users',
      defaultValue: ({ user }) => user?.id,
      admin: {
        allowCreate: false,
      },
      access: {
        update: () => false,
        read: () => false,
      },
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'modifiedBy',
      label: 'Modified By',
      relationTo: 'users',
      // defaultValue: ({ user }) => user?.id,
      admin: {
        allowCreate: false,
      },
      access: {
        update: () => false,
        read: () => false,
      },
      hooks: {
        afterChange: [
          async ({ operation, req, data }) => {
            if (operation === 'update') {
              // Your custom logic here
              // @ts-ignore
              data.modifiedBy = req.user?.id
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

export default Plans

import type { CollectionConfig } from 'payload/types'

export const Brands: CollectionConfig = {
  slug: 'brands', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },

  fields: [
    {
      type: 'text', // Field type (text for username)
      name: 'title', // Field name
      label: 'Name', // Label displayed in the admin UI
      required: true, // Make the field mandatory
      index: true,
    },
    {
      type: 'relationship',
      name: 'image',
      label: 'Image',
      relationTo: 'media',
      required: true, // Ensure each item has a valid media relation
    },
    {
      type: 'textarea', // Field type (text for name)
      name: 'description', // Field name,
      label: 'Description', // Label displayed in the admin UI
      required: false, // Make the field mandatory
      index: true,
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'createdBy',
      label: 'Created By', // Label displayed in the admin UI
      relationTo: 'users',
      defaultValue: ({ user }) => user.id,
      access: {
        update: () => false,
        read: () => false,
      },
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'modifiedBy',
      label: 'Modified By', // Label displayed in the admin UI
      relationTo: 'users',
      defaultValue: ({ user }) => user.id,
      access: {
        update: () => false,
        read: () => false,
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

export default Brands

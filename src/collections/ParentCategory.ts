import type { CollectionConfig } from 'payload/types'

export const ParentCategory: CollectionConfig = {
  slug: 'parentcategory', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'text', // Field type (text for name)
      name: 'name', // Field name
      label: 'Category Name', // Label displayed in the admin UI
      required: true, // Make the field mandatory
    },
    {
      type: 'textarea', // Field type (text for name)
      name: 'description', // Field name
      label: 'Description', // Label displayed in the admin UI
      maxLength:200,
      required: true, // Make the field mandatory
    },
    {
        type: 'relationship', // Field type for relationships
        name: 'rootCategoryRef',
        label: 'Root Category', // Label displayed in the admin UI
        relationTo: 'rootcategory',
        admin: {
          allowCreate: false,
        },
        access: {
          update: () => false,
        },
      },
    {
      type: 'relationship', // Field type for relationships
      name: 'createdBy',
      label: 'Created By', // Label displayed in the admin UI
      relationTo: 'users',
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
      // defaultValue: ({ user }) => user.id,
      admin: {
        allowCreate: false,
      },
      access: {
        update: () => false,
        create: () => false,
      },
      hooks: {
        afterChange: [
          async ({ operation, req, data }) => {
            if (operation === 'update') {
              data.modifiedBy = req.user.id
              return data
            }
          },
        ],
      },
    },
    {
      name: 'isDeleted',
      label: 'Deleted?',
      type: 'checkbox', 
      defaultValue: false,
    },
  ],
}

export default ParentCategory

import type { CollectionConfig } from 'payload/types'

export const ParentCategory: CollectionConfig = {
  slug: 'parentcategory', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'text', 
      name: 'name', 
      label: 'Category Name', 
      required: true, 
      maxLength: 200
    },
    {
      type: 'textarea', 
      name: 'description', 
      label: 'Description', 
      maxLength: 300,
      required: true, 
    },
    {
      type: 'relationship', 
      name: 'rootCategoryRef',
      label: 'Root Category', 
      relationTo: 'rootcategory',
      admin: {
        allowCreate: false,
      },
      access: {
        update: () => false,
      },
    },
    {
      type: 'relationship', 
      name: 'createdBy',
      label: 'Created By', 
      relationTo: 'users',
      admin: {
        allowCreate: false,
      },
      defaultValue: ({ user }) => user.id,
      access: {
        update: () => false,
      },
    },
    {
      type: 'relationship', 
      name: 'modifiedBy',
      label: 'Modified By', 
      relationTo: 'users',
      defaultValue: ({ user }) => user.id,
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

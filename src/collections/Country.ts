import type { CollectionConfig, CollectionBeforeChangeHook } from 'payload/types'
const beforeChangeHook: CollectionBeforeChangeHook = async ({
  data, // incoming data to update or create with
  req, // full express request
  operation, // name of the operation ie. 'create', 'update'
  originalDoc, // original document
}) => {
  data.modifiedBy = 5
  return data // Return data to either create or update a document with
}
export const Country: CollectionConfig = {
  slug: 'country', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'text', 
      name: 'name', 
      label: 'Name', 
      required: true, 
      maxLength: 100
    },

    {
      type: 'relationship', 
      name: 'createdBy',
      label: 'Created By', 
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
      name: 'isActive',
      label: 'Active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default Country

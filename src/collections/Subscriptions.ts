import type { CollectionConfig } from 'payload'

export const Subscriptions: CollectionConfig = {
  slug: 'subscriptions', // Collection slug (used for API endpoints)
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Name',
      required: true,
    },
    {
      type: 'textarea',
      name: 'description',
      label: 'Description',
      required: true,
    },
    {
      type: 'number',
      name: 'amount',
      label: 'Amount',
      required: false,
    },
    {
      type: 'number',
      name: 'freeEntries',
      label: 'Free Entries',
      required: false,
      defaultValue: 5,
      admin: {
        step: 1,
      },
    },
    {
      type: 'relationship',
      name: 'plansref',
      label: 'Plan',
      relationTo: 'plans',
    },
    {
      type: 'relationship',
      name: 'createdBy',
      label: 'Created By',
      relationTo: 'users',
      defaultValue: ({ user }) => user?.id,
      admin: {
        allowCreate: false,
      },
      access: {
        update: () => false,
        create: () => false,
      },
    },
    {
      type: 'relationship',
      name: 'modifiedBy',
      label: 'Modified By',
      relationTo: 'users',
      defaultValue: ({ user }) => user?.id,
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
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
export default Subscriptions

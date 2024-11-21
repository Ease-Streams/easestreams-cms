import type { CollectionConfig } from 'payload'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      type: 'relationship',
      name: 'customerRef',
      label: 'Customer',
      relationTo: 'customers',
    },
    {
      type: 'textarea',
      name: 'enquiryMessgae',
      label: 'Message',
      required: true,
    },
    {
      name: 'enquiryType',
      type: 'select',
      options: [
        { label: 'Job', value: 'job' },
        { label: 'Promotion', value: 'promotion' },
        { label: 'Relevant', value: 'relevant' },
      ],
      required: true,
      defaultValue: 'job',
    },
    {
      type: 'relationship',
      name: 'productRef',
      label: 'Product',
      relationTo: 'products',
      admin: {
        allowCreate: false,
      },
      access: {
        update: () => false,
      },
    },
    {
      type: 'relationship',
      name: 'companyRef',
      label: 'Company',
      relationTo: 'companies',
    },
    {
      type: 'text',
      name: 'enquiryStatus',
      label: 'Status',
      required: true,
      defaultValue: 'Pending',
      maxLength: 50,
    },
    {
      type: 'text',
      name: 'searchTerm',
      label: 'Search Term',
      required: true,
    },
    {
      type: 'upload',
      relationTo: 'media',
      name: 'enquiryAttachments',
      label: 'Attachments',
      required: true,
    },
    {
      type: 'relationship',
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
      name: 'isDeleted',
      label: 'Delete?',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default Enquiries

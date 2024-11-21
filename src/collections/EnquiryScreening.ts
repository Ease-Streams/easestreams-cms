import type { CollectionConfig } from 'payload'

export const EnquiryScreening: CollectionConfig = {
  slug: 'enquiryScreening', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'enquiry',
  },
  fields: [
    {
      type: 'relationship', // Field type for relationships
      name: 'enquiry',
      label: 'Enquiry Id', // Label displayed in the admin UI
      relationTo: 'enquiries',
    },
    {
      type: 'date', // Field type (text for username)
      name: 'sreened_on', // Field name
      label: 'Screened On', // Label displayed in the admin UI
      required: true, // Make the field mandatory
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'screeningAgent',
      label: 'Screening Agent', // Label displayed in the admin UI
      relationTo: 'users',
    },
    {
      name: 'sreeningTags',
      label: 'Screening Tags',
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
      name: 'remarks',
      label: 'Screening Remarks',
      type: 'text',
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
      // defaultValue: ({ user }) => user?.id,
      admin: {
        allowCreate: false,
      },
      access: {
        update: () => false,
        create: () => false,
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

export default EnquiryScreening

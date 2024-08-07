import type { CollectionConfig } from 'payload/types'

export const ForwardedEnquiries: CollectionConfig = {
  slug: 'forwardedEnquiries', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'relationship', // Field type for relationships
      name: 'enquiryRef',
      label: 'Enquiry', // Label displayed in the admin UI
      relationTo: 'enquiries',
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'companyRef',
      label: 'Forwarded To', // Label displayed in the admin UI
      relationTo: 'companies',
      hasMany: true,
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'forwaredBy',
      label: 'Forwarded By',
      relationTo: 'users',
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'screeningRef',
      label: 'Screeing',
      relationTo: 'enquiryScreening',
    },
  ],
}

export default ForwardedEnquiries

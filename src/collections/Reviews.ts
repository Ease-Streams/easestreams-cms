import type { CollectionConfig } from 'payload'

export const Reviews: CollectionConfig = {
  slug: 'reviews', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'companyRef',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'relationship', // Field type for relationships
      name: 'customerRef',
      label: 'Customer', // Label displayed in the admin UI
      relationTo: 'customers',
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'productRef',
      label: 'Product', // Label displayed in the admin UI
      relationTo: 'products',
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'companyRef',
      label: 'Company', // Label displayed in the admin UI
      relationTo: 'companies',
    },
    {
      name: 'ratings',
      label: 'Ratings',
      type: 'number', // Field type for email
      defaultValue: 0,
    },
    {
      name: 'review',
      label: 'Review',
      type: 'text', // Field type for email
    },
    {
      name: 'reviewType',
      label: 'Review Type',
      type: 'select', // Field type for email
      options: ['Positive', 'Negative'],
    },
    {
      name: 'IsActive',
      label: 'Active',
      type: 'checkbox', // Field type for email
    },
  ],
}

export default Reviews

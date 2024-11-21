import type { CollectionConfig } from 'payload'
import seoFields from './fields/seoFields'
import { normalizeSearchTerm } from '../utilities/helper'
import { setCreatedBy, setModifiedBy } from '../utilities/hooks'

export const Companies: CollectionConfig = {
  slug: 'companies', // Collection slug (used for API endpoints)
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      type: 'text',
      name: 'mobile',
      label: 'Mobile',
      required: true,
      maxLength: 16,
    },
    {
      type: 'text',
      name: 'whatsappno',
      label: 'Whatsapp No',
      required: false,
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email Id',
      required: true,
      maxLength: 150,
    },
    {
      name: 'isEmailVerified',
      type: 'checkbox',
      label: 'Email Verified?',
      defaultValue: false,
    },
    {
      name: 'isVerified',
      type: 'checkbox',
      label: 'Is Verified?',
      defaultValue: false,
    },
    {
      type: 'textarea',
      name: 'address',
      label: 'Address',
      required: true,
      maxLength: 300,
    },
    {
      type: 'text',
      name: 'po_box',
      label: 'Po Box',
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'brandsRef',
      label: 'Brands', // Label displayed in the admin UI
      relationTo: 'brands',
      required: true,
      index: true,
      hasMany: true,
    },
    {
      type: 'array',
      name: 'additionalinfo',
      label: 'Additional Info',
      required: false,
      fields: [
        { type: 'text', name: 'key', label: 'Key' },
        { type: 'text', name: 'value', label: 'Value' },
      ],
    },
    {
      type: 'array',
      name: 'branches',
      label: 'Branches',
      required: false,
      fields: [
        {
          type: 'text',
          name: 'branchName',
          label: 'Branch Name',
          required: true,
        },
        { type: 'text', name: 'contactNo', label: 'Contact No' },
        {
          type: 'text',
          name: 'contactPersonName',
          label: 'Contact Person Name',
        },
        { type: 'text', name: 'contactEmail', label: 'Contact Email' },
        { type: 'text', name: 'location', label: 'Location' },
      ],
    },
    {
      type: 'relationship',
      name: 'stateRef',
      label: 'State',
      relationTo: 'state',
      required: true,
    },
    {
      name: 'countryRef',
      type: 'relationship',
      label: 'Country',
      relationTo: 'country',
    },
    {
      type: 'text',
      name: 'mapUrl',
      label: 'Map URL',
      required: false,
      maxLength: 16,
    },
    {
      type: 'relationship',
      name: 'subscriptionRef',
      label: 'Subscription',
      relationTo: 'subscriptions',
      required: false,
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
      type: 'textarea', // Field type (text for name)
      name: 'description', // Field name
      label: 'Description', // Label displayed in the admin UI
      required: false, // Make the field mandatory
      index: true,
      admin: {
        components: {
          Field: 'src/components/fields/CustomRichText',
        },
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Created By',
      hooks: {
        beforeChange: [setCreatedBy],
      },
      access: {
        read: ({ req: { user } }) => (user ? true : false),
      },
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      index: true, // Index createdBy for fast retrieval of user who created the category
    },
    {
      name: 'modifiedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Modified By',
      hooks: {
        beforeChange: [setModifiedBy],
      },
      access: {
        read: ({ req: { user } }) => (user ? true : false),
      },
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      index: true, // Index modifiedBy for fast retrieval of user who modified the category
    },
    {
      name: 'slug',
      index: true, // Index URL for faster searches and ensure it's unique
      label: 'Slug',
      type: 'text',
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            // @ts-ignore
            if (!data.slug) {
              if (data?.title) {
                data.slug = normalizeSearchTerm(data.title)
              }
            } else {
              // @ts-ignore
              data.slug = normalizeSearchTerm(data.slug)
            }
            return data?.slug
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
    ...seoFields,
  ],
}

export default Companies

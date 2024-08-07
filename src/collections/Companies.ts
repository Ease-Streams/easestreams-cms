import type { CollectionConfig } from 'payload/types'
import { CustomCountryComponent } from '../components/fields/customerCountrySelect/component'
import { HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

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
        { type: 'text', name: 'branchName', label: 'Branch Name', required: true },
        { type: 'text', name: 'contactNo', label: 'Contact No' },
        { type: 'text', name: 'contactPersonName', label: 'Contact Person Name' },
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
      admin: {
        components: {
          Field: CustomCountryComponent,
        },
      },
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
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
    },
    {
      name: 'metaKeyword',
      type: 'text',
      label: 'Meta Keywords',
    },
    {
      name: 'canonical',
      type: 'text',
      label: 'Canonical',
    },
    {
      name: 'metaDescription',
      type: 'text',
      label: 'Meta Description',
    },
    {
      name: 'pageContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
      }),
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
        read: () => false,
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
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default Companies
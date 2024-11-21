import type { CollectionConfig } from 'payload'
import { normalizeSearchTerm } from '../utilities/helper'
import { setCreatedBy, setModifiedBy } from '../utilities/hooks'

export const Country: CollectionConfig = {
  slug: 'country', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'text', // Field type (text for username)
      name: 'title', // Field name
      label: 'Name', // Label displayed in the admin UI
      required: true, // Make the field mandatory
      index: true,
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
  ],
}

export default Country

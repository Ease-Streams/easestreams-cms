import type { CollectionConfig } from 'payload'
import { normalizeSearchTerm } from '../utilities/helper'
import { setCreatedBy, setModifiedBy } from '../utilities/hooks'
import payload from 'payload'

export const City: CollectionConfig = {
  slug: 'city',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'text',
      name: 'title',
      label: 'Name',
      required: true,
      index: true,
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
      index: true,
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
      index: true,
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
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

export default City

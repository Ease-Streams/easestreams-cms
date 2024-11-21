import type { CollectionConfig } from 'payload'
import { checkCreateAccess, checkDeleteAccess, normalizeSearchTerm } from '../utilities/helper'
import { setCreatedBy, setModifiedBy } from '../utilities/hooks'
import seoFields from './fields/seoFields'
import { HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import CustomRichText from '../components/fields/CustomRichText'

export const Brands: CollectionConfig = {
  slug: 'brands', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => checkCreateAccess(user?.role),
    create: ({ req: { user } }) => checkCreateAccess(user?.role),
    delete: ({ req: { user } }) => checkDeleteAccess(user?.role),
  },
  defaultPopulate: {
    title: true,
    image: true,
    slug: true,
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
      type: 'upload',
      name: 'image',
      label: 'Image',
      relationTo: 'media',
      required: true, // Ensure each item has a valid media relation
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
            if (!data?.url) {
              if (data?.title) {
                data.url = normalizeSearchTerm(data.title)
              }
            } else {
              data.url = normalizeSearchTerm(data.url)
            }
            return data?.url
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

export default Brands

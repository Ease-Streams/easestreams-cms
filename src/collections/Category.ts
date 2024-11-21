import { HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import seoFields from './fields/seoFields'
import { normalizeSearchTerm } from '../utilities/helper'
import { setCreatedBy, setModifiedBy } from '../utilities/hooks'
import CustomRichText from '../components/fields/CustomRichText'

export const Category: CollectionConfig = {
  slug: 'category', // Collection slug (used for API endpoints)
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      type: 'text', // Field type (text for name)
      name: 'title', // Field name
      label: 'Category Name', // Label displayed in the admin UI
      required: true, // Make the field mandatory
      index: true,
    },
    {
      type: 'upload',
      name: 'categoryImage',
      label: 'Image',
      relationTo: 'media',
      required: false, // Ensure each item has a valid media relation
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

export default Category

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
  defaultPopulate: {
    title: true,
    slug: true,
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
      type: 'collapsible', // Collapsible field
      label: 'Heading Content', // Label for the collapsible section
      fields: [
        {
          type: 'textarea', // Textarea field
          name: 'headingContent', // Field name
          label: 'Content', // Label for the textarea
          admin: {
            components: {
              Field: 'src/components/fields/CustomRichText', // Custom rich text editor if needed
            },
          },
        },
        {
          type: 'upload', // Image upload field
          name: 'headingImage',
          label: 'Image',
          relationTo: 'media', // Relates to media collection for storing images
        },
      ],
    },
    {
      type: 'array',
      name: 'subCategoryList',
      label: 'Sub Category List',
      fields: [
        {
          type: 'text',
          name: 'title',
          label: 'Title',
        },
        {
          type: 'textarea',
          name: 'content',
          label: 'Content',
        },
        {
          name: 'subCategories',
          label: 'Sub Category',
          type: 'relationship',
          relationTo: 'subcategory',
          hasMany: true,
        },
      ],
    },
    {
      type: 'group',
      name: 'brandGroup',
      label: 'Brands',
      fields: [
        {
          type: 'text',
          name: 'title',
          label: 'Title',
        },
        {
          type: 'array',
          name: 'brandList',
          label: 'Brands',
          fields: [
            {
              type: 'text',
              name: 'title',
              label: 'Title',
            },
            {
              name: 'brands',
              label: 'Brands',
              type: 'relationship',
              relationTo: 'brands',
              hasMany: true,
            },
          ],
        },
      ],
    },
    {
      type: 'array',
      name: 'categoryImage',
      label: 'Category Image',
      required: false, // Ensure each item has a valid media relation
      fields: [
        {
          type: 'upload',
          name: 'image',
          label: 'Image',
          relationTo: 'media',
        },
      ],
    },
    {
      name: 'pageContent',
      label: 'Page Content',
      type: 'array',
      fields: [
        {
          name: 'pageContent',
          type: 'blocks',
          label: 'Page Content',
          blocks: [
            {
              slug: 'contentBlock', // Slug for the content block
              fields: [
                {
                  name: 'content',
                  label: 'Content',
                  type: 'textarea',
                  admin: {
                    components: {
                      Field: 'src/components/fields/CustomRichText',
                    },
                  },
                },
              ],
            },
            {
              slug: 'imageBlock', // Slug for the image block
              fields: [
                {
                  type: 'upload',
                  name: 'image',
                  label: 'Image',
                  relationTo: 'media', // Relates to media collection for storing images
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'tableContent',
      label: 'Table Content',
      type: 'textarea',
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
            data.slug = normalizeSearchTerm(data.title)
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

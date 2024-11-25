import type { CollectionConfig } from 'payload'
import seoFields from './fields/seoFields'
import { normalizeSearchTerm } from '../utilities/helper'
import { setCreatedBy, setModifiedBy } from '../utilities/hooks'

export const subCategory: CollectionConfig = {
  slug: 'subcategory', // Collection slug (used for API endpoints)
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  defaultPopulate: {
    title: true,
    categoryImage: true,
    slug: true,
  },
  fields: [
    {
      name: 'banners',
      type: 'array',
      label: 'Banner Images',
      fields: [
        {
          type: 'upload',
          name: 'image',
          label: 'Image',
          relationTo: 'media',
          required: false, // Ensure each item has a valid media relation
        },
        {
          name: 'urlLink',
          type: 'text',
          label: 'Banner URL Link',
        },
      ],
    },
    {
      type: 'text', // Field type (text for name)
      name: 'title', // Field name
      label: 'Category Name', // Label displayed in the admin UI
      required: true, // Make the field mandatory
      index: true,
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
      type: 'relationship', // Field type for relationships
      name: 'categoryRef',
      label: 'Category', // Label displayed in the admin UI
      relationTo: 'category',
      required: true, // Make the field mandatory
      index: true,
    },
    {
      type: 'array',
      name: 'productList',
      label: 'Product List',
      fields: [
        {
          type: 'text',
          name: 'title',
          label: 'Title',
        },
        {
          type: 'text',
          name: 'subTitle',
          label: 'Sub Title',
        },
        {
          type: 'textarea',
          name: 'content',
          label: 'Content',
        },
        {
          name: 'products',
          label: 'products',
          type: 'relationship',
          relationTo: 'products',
          hasMany: true,
        },
      ],
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
          async ({ data, req, operation }) => {
            if (operation === 'create' || operation === 'update') {
              // @ts-ignore
              if (data.categoryRef) {
                // Fetch the related category
                const category = await req.payload.findByID({
                  // @ts-ignore
                  collection: 'category',
                  // @ts-ignore
                  id: data.categoryRef,
                })

                // Normalize the slug
                // @ts-ignore
                const categorySlug = category?.slug
                  ? // @ts-ignore
                    normalizeSearchTerm(category.slug)
                  : ''
                const subCategorySlug = data?.title ? normalizeSearchTerm(data.title) : ''

                // Combine category and subcategory slugs
                // @ts-ignore
                data.slug = `${categorySlug}/${subCategorySlug}`
              } else {
                // @ts-ignore
                data.slug = normalizeSearchTerm(data.title || '')
              }
            }
            // @ts-ignore
            return data.slug
          },
        ],
      },
    },
    {
      name: 'itemSlug',
      index: true, // Index URL for faster searches and ensure it's unique
      label: 'Item Slug',
      type: 'text',
      hooks: {
        beforeChange: [
          async ({ data, req, operation }) => {
            // @ts-ignore
            data.itemSlug = normalizeSearchTerm(data.title || '')
            // @ts-ignore
            return data.itemSlug
          },
        ],
      },
    },
    ...seoFields,
    {
      name: 'isActive',
      label: 'Active',
      type: 'checkbox', // Field type for email
      defaultValue: true,
    },
  ],
}

export default subCategory

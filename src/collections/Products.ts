import type { CollectionConfig } from 'payload'
import { generateUniqueCode } from '../utilities/GenerateSKU'
import { normalizeSearchTerm } from '../utilities/helper'
import { setCreatedBy, setModifiedBy } from '../utilities/hooks'
import seoFields from './fields/seoFields'

export const Products: CollectionConfig = {
  slug: 'products', // Collection slug (used for API endpoints)
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
  },
  // access: {
  //   read: ({}) => {
  //     return {
  //       title: {
  //         like: "Com",
  //       },
  //     }
  //   },
  // },
  defaultPopulate: {
    title: true,
    itemCode: true,
    slug: true,
    brandsRef: true,
    productImages: true,
    specification: true,
  },
  fields: [
    {
      type: 'text', // Field type (text for name)
      name: 'title', // Field name
      label: 'Name', // Label displayed in the admin UI
      required: false, // Make the field mandatory
      index: true,
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'searchtagsRef',
      label: 'Search tag', // Label displayed in the admin UI
      relationTo: 'searchtags',
      required: true,
      index: true,
      hasMany: true,
    },
    {
      type: 'text', // Field type (text for name)
      name: 'itemCode', // Field name
      label: 'Item Code', // Label displayed in the admin UI
      required: false,
      index: true,
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeChange: [
          async ({ data, req, operation }) => {
            if (operation === 'create') {
              // @ts-ignore
              return (data.itemCode = await generateUniqueCode(6, req.headers.cookie))
            }
          },
        ],
      },
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
      name: 'productImages',
      label: 'Product Image',
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
      type: 'array', // Field type (text for name)
      name: 'videourls', // Field name
      label: 'Video URLs', // Label displayed in the admin UI
      fields: [
        {
          type: 'relationship',
          name: 'video',
          label: 'Video',
          relationTo: 'media',
          required: false, // Ensure each item has a valid media relation
        },
      ],
    },
    {
      type: 'array', // Field type (text for name)
      name: 'specification', // Field name
      label: 'Specification', // Label displayed in the admin UI
      required: false, // Make the field mandatory
      fields: [
        {
          type: 'text', // Field type (text for name)
          name: 'key',
          label: 'Key',
        },
        {
          type: 'text', // Field type (text for name)
          name: 'value',
          label: 'Value',
        },
      ],
    },
    {
      type: 'textarea', // Field type (text for name)
      name: 'topDescription', // Field name
      label: 'Top Description', // Label displayed in the admin UI
      required: false, // Make the field mandatory
      index: true,
      admin: {
        components: {
          Field: 'src/components/fields/CustomRichText',
        },
      },
    },
    {
      type: 'textarea', // Field type (text for name)
      name: 'bottomDescription', // Field name
      label: 'Bottom Description', // Label displayed in the admin UI
      required: false, // Make the field mandatory
      index: true,
      admin: {
        components: {
          Field: 'src/components/fields/CustomRichText',
        },
      },
    },
    {
      type: 'relationship', // Field type for relationships
      name: 'subcategoryRef',
      label: 'Sub Category', // Label displayed in the admin UI
      relationTo: 'subcategory',
      index: true,
    },
    {
      type: 'relationship', // Field type for relationships
      hasMany: true,
      index: true,
      name: 'supplierRef',
      label: 'Suppliers', // Label displayed in the admin UI
      relationTo: 'companies',
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
              if (data.subcategoryRef) {
                // Fetch the related subcategory
                // @ts-ignore
                let subcategory
                try {
                  subcategory = await req.payload.findByID({
                    collection: 'subcategory',
                    // @ts-ignore
                    id: data.subcategoryRef,
                  })
                } catch (error) {
                  console.error('Error fetching subcategory:', error)
                }

                if (subcategory) {
                  // Normalize the slugs
                  const subCategorySlug = subcategory.slug
                  const productSlug = data?.title ? normalizeSearchTerm(data.title) : ''

                  // Combine category, subcategory, and product slugs
                  // @ts-ignore
                  data.slug = `${subCategorySlug}/${productSlug}`
                  // @ts-ignore
                } else {
                  // @ts-ignore
                  data.slug = normalizeSearchTerm(data.title || '')
                }
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

export default Products

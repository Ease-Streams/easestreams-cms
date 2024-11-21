import type { CollectionConfig } from 'payload'

export const HomePage: CollectionConfig = {
  slug: 'home', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'categories',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'categories',
      type: 'array', // Use an array field for nested data
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Category Title',
        },
        {
          name: 'data',
          type: 'array',
          fields: [
            {
              type: 'relationship', // Field type for relationships
              name: 'subcategoryref',
              label: 'Parent Category', // Label displayed in the admin UI
              relationTo: 'subcategory',
            },
          ],
        },
      ],
    },
    {
      name: 'banners',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Banner Title',
        },
        {
          name: 'data', // required
          type: 'array', // required
          label: 'Banner Images',
          required: false,
          fields: [
            {
              type: 'relationship',
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
      ],
    },
    {
      name: 'products',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Product Title',
        },
        {
          name: 'data',
          type: 'array',
          fields: [
            {
              type: 'relationship', // Field type for relationships
              name: 'productRef',
              label: 'Product', // Label displayed in the admin UI
              relationTo: 'products',
              hasMany: true,
            },
          ],
        },
      ],
    },
  ],
}

export default HomePage

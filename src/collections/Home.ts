import type { CollectionConfig } from 'payload'

export const HomePage: CollectionConfig = {
  slug: 'home',
  admin: {
    useAsTitle: 'title', // Use a simpler field if available
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Page Title',
      defaultValue: 'Home Page',
    },
    {
      name: 'sections',
      type: 'blocks',
      label: 'Homepage Sections',
      blocks: [
        {
          slug: 'products',
          labels: {
            singular: 'Products Section',
            plural: 'Products Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
              required: true,
            },
            {
              type: 'relationship',
              name: 'productRefs',
              label: 'Products',
              relationTo: 'products',
              hasMany: true,
            },
          ],
        },
        {
          slug: 'categories',
          labels: {
            singular: 'Category Section',
            plural: 'Category Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
              required: true,
            },
            {
              type: 'relationship',
              name: 'categoryRefs',
              label: 'Categories',
              relationTo: 'category',
              hasMany: true,
            },
          ],
        },
        {
          slug: 'subcategories',
          labels: {
            singular: 'Subcategory Section',
            plural: 'Subcategory Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
              required: true,
            },
            {
              type: 'relationship',
              name: 'subcategoryRefs',
              label: 'Subcategories',
              relationTo: 'subcategory',
              hasMany: true,
            },
          ],
        },
        {
          slug: 'brands',
          labels: {
            singular: 'Brand Section',
            plural: 'Brand Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Section Title',
              required: true,
            },
            {
              type: 'relationship',
              name: 'brandRefs',
              label: 'Brands',
              relationTo: 'brands',
              hasMany: true,
            },
          ],
        },
        {
          slug: 'banners',
          labels: {
            singular: 'Banner Section',
            plural: 'Banner Sections',
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              label: 'Banner Title',
              required: true,
            },
            {
              name: 'banners',
              type: 'array',
              label: 'Banners',
              fields: [
                {
                  type: 'relationship',
                  name: 'bannerImage',
                  label: 'Image',
                  relationTo: 'media',
                },
                {
                  name: 'urlLink',
                  type: 'text',
                  label: 'Banner URL',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default HomePage

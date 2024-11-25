import type { GlobalConfig } from 'payload'

export const HomeBanners: GlobalConfig = {
  slug: 'home_banner', // Collection slug (used for API endpoints)
  label: 'Home Banners',
  access: {
    read: () => true,
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
  ],
}

export default HomeBanners

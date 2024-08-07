import type { GlobalConfig } from 'payload/types'

export const HomeBanners: GlobalConfig = {
  slug: 'home_banner', // Collection slug (used for API endpoints)
  label: 'Home Banners',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'homeBanner',
      type: 'array',
      fields: [
        {
          name: 'banners', // required
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
  ],
}

export default HomeBanners

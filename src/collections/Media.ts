import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    mimeTypes: ['image/*'],
  },
  defaultPopulate: {
    id: true,
    alt: true,
    url: true,
    filename: true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}

export default Media

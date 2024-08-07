import type { CollectionConfig } from 'payload/types'

export const SearchTags: CollectionConfig = {
  slug: 'searchtags', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Search Tag',
      type: 'text', // Field type for email
      index: true,
      required: true,
    },
  ],
}

export default SearchTags

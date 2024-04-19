import type { CollectionConfig } from 'payload/types'

import formatSlug from '../utilities/formatSlug'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
    },
    {
      name: 'lexicalText',
      type: 'richText',
      label: 'Content',
      editor:lexicalEditor({
        features:({defaultFeatures })=>[
          ...defaultFeatures,
          HTMLConverterFeature({})
        ]
      })
    },
    {
      name: 'slug',
      label: 'Slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
    },
    lexicalHTML('lexicalText', { name: 'lexicalText_html' }),
  ],
}

export default Pages

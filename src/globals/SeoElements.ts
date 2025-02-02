import { HTMLConverterFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { GlobalConfig } from 'payload'

export const SeoElements: GlobalConfig = {
  slug: 'seo_elements', // Collection slug (used for API endpoints)
  label: 'Seo Elements',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'metaTitle',
      type: 'text',
      label: 'Meta Title',
    },
    {
      name: 'metaKeyword',
      type: 'text',
      label: 'Meta Keywords',
    },
    {
      name: 'canonical',
      type: 'text',
      label: 'Canonical',
    },
    {
      name: 'metaDescription',
      type: 'text',
      label: 'Meta Description',
    },
    {
      name: 'pageContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [...defaultFeatures, HTMLConverterFeature({})],
      }),
    },
  ],
}

export default SeoElements

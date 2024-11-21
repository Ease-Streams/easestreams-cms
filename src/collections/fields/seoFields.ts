import { Field } from 'payload'

// src/fields/seoFields.js
const seoFields: Field[] = [
  {
    name: 'metaTitle',
    type: 'text',
    label: 'Meta Title',
    maxLength: 120, // Optional: limit length for best SEO practices
  },
  {
    name: 'metaDescription',
    type: 'textarea',
    label: 'Meta Description',
    maxLength: 300, // Optional: limit length for best SEO practices
  },
  {
    name: 'metaKeywords',
    type: 'text',
    label: 'Meta Keywords',
  },
  {
    name: 'metaImage',
    type: 'upload',
    label: 'Meta Image',
    relationTo: 'media', // Assuming you have a 'media' collection for image uploads
  },
]

export default seoFields

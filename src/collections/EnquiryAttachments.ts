import { CollectionConfig } from 'payload'

export const EnquiryAttachments: CollectionConfig = {
  slug: 'enquiryAttachments',
  upload: {
    staticDir: 'enquiryAttachments',
    adminThumbnail: ({ doc }) =>
      process.env.NEXT_PUBLIC_PAYLOAD_URL + `/enquiryAttachments/${doc.filename}`,
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
    },
  ],
}
export default EnquiryAttachments

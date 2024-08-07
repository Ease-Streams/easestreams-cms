import { CollectionConfig } from 'payload/types'

export const EnquiryAttachments: CollectionConfig = {
  slug: 'enquiryAttachments',
  upload: {
    staticURL: '/enquiryAttachments',
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

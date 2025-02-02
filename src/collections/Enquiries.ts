import { setModifiedBy } from '@/utilities/hooks'
import type { CollectionConfig } from 'payload'

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  admin: {
    useAsTitle: 'id',
  },
  fields: [
    {
      type: 'relationship',
      name: 'companyRef',
      label: 'Company',
      relationTo: 'companies',
    },
    {
      type: 'relationship',
      name: 'productRef',
      label: 'Product',
      relationTo: 'products',
      admin: {
        allowCreate: false,
      },
      access: {
        update: () => false,
      },
    },
    {
      type: 'textarea',
      name: 'enquiryMessage',
      label: 'Message',
      required: true,
    },
    {
      name: 'enquiryType',
      type: 'select',
      options: [
        { label: 'Job', value: 'job' },
        { label: 'Promotion', value: 'promotion' },
        { label: 'Relevant', value: 'relevant' },
      ],
      required: true,
      defaultValue: 'relevant',
    },
    {
      type: 'text',
      name: 'enquiryStatus',
      label: 'Status',
      required: true,
      defaultValue: 'Pending',
      maxLength: 50,
    },
    {
      type: 'text',
      name: 'searchTerm',
      label: 'Search Term',
      required: true,
    },
    {
      type: 'text',
      name: 'enquiryAttachments',
      label: 'Attachments',
    },
    {
      name: 'modifiedBy',
      type: 'relationship',
      relationTo: 'users',
      label: 'Modified By',
      hooks: {
        beforeChange: [setModifiedBy],
      },
      access: {
        read: ({ req: { user } }) => (user ? true : false),
      },
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
      index: true, // Index modifiedBy for fast retrieval of user who modified the category
    },
    {
      name: 'isDeleted',
      label: 'Delete?',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      type: 'text',
      name: 'forwardEmail',
      label: 'Forward Email',
    },
    {
      type: 'ui',
      name: 'forwardEmailButton',
      label: 'Forward Email',
      admin: {
        // components: {
        //   Field: () => (
        //     <button
        //       type="button"
        //       onClick={() => {
        //         // Add your email forwarding logic here
        //         alert('Email forwarded successfully!');
        //       }}
        //     >
        //       Forward Email
        //     </button>
        //   ),
        // },
      },
    },
  ],
}

export default Enquiries

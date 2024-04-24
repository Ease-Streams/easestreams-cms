import type { CollectionConfig } from 'payload/types'

export const Enquiries: CollectionConfig = {
    slug: 'enquiries', 
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            type: 'relationship', 
            name: 'userRef',
            label: 'User',
            relationTo: 'users',
            defaultValue: ({ user }) => user.id,
            admin: {
                allowCreate: false,
            },
            access: {
                update: () => false,
            },
        },
        {
            type: 'textarea',
            name: 'enquiryMessgae',
            label: 'Message',
            required: true,
            maxLength: 300
        },
        {
            name: 'enquiryType',
            type: 'select',
            options: [
              { label: 'Job', value: 'job' },
              { label: 'Test1', value: 'test1' },
            ],
            required: true,
            defaultValue: 'job',
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
            type: 'relationship', 
            name: 'companyRef',
            label: 'Company',
            relationTo: 'companies',
            admin: {
                allowCreate: false,
            },
            access: {
                update: () => false,
            },
        },
        {
            type: 'text',
            name: 'enquiryStatus',
            label: 'Status',
            required: true,
            defaultValue:"Pending",
            maxLength: 50
        },
        {
            type: 'relationship', 
            name: 'modifiedBy',
            label: 'Modified By',
            relationTo: 'users',
            defaultValue: ({ user }) => user.id,
            admin: {
                allowCreate: false,
            },
            access: {
                update: () => false,
                create: () => false,
            },
            hooks: {
                afterChange: [
                    async ({ operation, req, data }) => {
                        if (operation === 'update') {
                            // Your custom logic here
                            data.modifiedBy = req.user.id
                            return data
                        }
                    },
                ],
            },
        },
        {
            name: 'isDeleted',
            label: 'Delete?',
            type: 'checkbox', 
            defaultValue: true,
        },
    ],
}

export default Enquiries

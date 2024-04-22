import type { CollectionConfig } from 'payload/types'
import { CustomCountryComponent } from '../components/fields/customerCountrySelect/component'

const fetchStateData = async (value: number, cookie: any) => {
    const response = await fetch(`http://localhost:3000/api/state/${value}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Cookie: cookie,
        },
    })
    if (response.ok) {
        return response.json()
    } else {
        return false
    }
}


export const Subscriptions: CollectionConfig = {
    slug: 'subscriptions', // Collection slug (used for API endpoints)
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            type: 'text',
            name: 'name',
            label: 'Name',
            required: true,
        },
        {
            type: 'textarea',
            name: 'description',
            label: 'Description',
            required: true,
        },
        {
            type: 'number',
            name: 'amount',
            label: 'Amount',
            required: false,
        },
        {
            type: 'number',
            name: 'freeEntries',
            label: 'Free Entries',
            required: false,
            defaultValue: 5,
            admin: {
                step: 1,
            },
        },
        {
            type: 'relationship',
            name: 'plansref',
            label: 'Plan',
            relationTo: 'plans',
        },
        {
            type: 'relationship',
            name: 'createdBy',
            label: 'Created By',
            relationTo: 'users',
            defaultValue: ({ user }) => user.id,
            admin: {
                allowCreate: false,
            },
            access: {
                update: () => false,
                create: () => false,
            },
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
            name: 'isActive',
            label: 'Active',
            type: 'checkbox',
            defaultValue: true,
        },
    ]
}
export default Subscriptions
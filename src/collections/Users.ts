import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: ({ req }) => req?.user?.role == 'admin',
    update: ({ req, id }) => id == req.user?.id || req?.user?.role == 'admin',
  },

  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      required: true,
      defaultValue: 'user',
      access: {
        update: ({ req }) => req?.user?.role === 'admin',
      },
    },
  ],
}

export default Users

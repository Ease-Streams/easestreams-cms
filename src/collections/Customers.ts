import type { CollectionConfig } from 'payload/types'

export const Customers: CollectionConfig = {
  slug: 'customers', // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: 'username',
  },
  auth: {
    tokenExpiration: 7200, // How many seconds to keep the user logged in
    verify: true, // Require email verification before being allowed to authenticate
    maxLoginAttempts: 5, // Automatically lock a user out after X amount of failed logins
    lockTime: 600 * 1000, // Time period to allow the max login attempts
  },
  fields: [
    {
      type: 'text', 
      name: 'fullName', 
      label: 'Full Name',
      required: true, 
      maxLength: 150
    },

    {
      name: 'location',
      type: 'textarea',
      label: 'Location',
      maxLength: 300,
    },
    {
      name: 'contact',
      type: 'text',
      label: 'Contact',
      maxLength: 20,
    },
    {
      name: 'role', // required
      type: 'select', // required
      hasMany: false,
      defaultValue: 'user',
      label: 'User Role',
      admin: {
        isClearable: true,
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Service Provider',
          value: 'service_provider',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
    {
      name: 'isEmailVerified',
      type: 'checkbox',
      label: 'Is Supplier Verified',
      defaultValue: false,
      admin: {
        condition: (data, siblingData, { user }) => {
          if (data.role == 'service_provider' || data.role == 'Service Provider') {
            return true
          } else {
            return false
          }
        },
      },
    },
    {
      name: 'isActive',
      type: 'checkbox', 
      label: 'Is Active',
      defaultValue: true,
    },
  ],
}

export default Customers

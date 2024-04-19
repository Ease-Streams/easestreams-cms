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
    // More options are available
  },
  fields: [
    {
      type: 'text', // Field type (text for username)
      name: 'username', // Field name
      label: 'Name', // Label displayed in the admin UI
      required: true, // Make the field mandatory
    },
    {
      type: 'email', // Field type for email
      name: 'email',
      label: 'Email',
      required: true,
      unique: true, // Ensure email is unique for each user
    },
    {
      type: 'text', // Field type for password
      hidden: true, //
      name: 'password',
      label: 'Password',
      required: true,
    },
    {
      name: 'isVerifiedSupplier',
      type: 'checkbox', // Field type for password
      label: 'Is Verified',
      defaultValue: false,
    },
    {
      name: 'isEmailVerified',
      type: 'checkbox', // Field type for password
      label: 'Is Email Verified',
      defaultValue: false,
    },
    {
      name: 'isActive',
      type: 'checkbox', // Field type for password
      label: 'Is Active',
      defaultValue: false,
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
  ],
}

export default Customers

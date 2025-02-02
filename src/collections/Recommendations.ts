import type { CollectionConfig } from 'payload'

export const Recommendations: CollectionConfig = {
  slug: 'recommendations',
  fields: [
    {
      name: 'user', // Track the user (if authenticated)
      type: 'relationship',
      relationTo: 'users', // Assuming you have a 'users' collection
      required: false, // Optional for anonymous users
    },
    {
      name: 'sessionId', // Track anonymous users via session ID
      type: 'text',
      required: true,
    },
    {
      name: 'pageType', // Type of page the user is on
      type: 'select',
      options: [
        'category',
        'sub-category',
        'product-details',
        'brand',
        'supplier',
        'search-results',
      ],
      required: true,
    },
    {
      name: 'category', // Category page (if applicable)
      type: 'relationship',
      relationTo: 'category', // Assuming you have a 'categories' collection
      required: false,
    },
    {
      name: 'subCategory', // Sub-category page (if applicable)
      type: 'relationship',
      relationTo: 'subcategory', // Assuming you have a 'sub-categories' collection
      required: false,
    },
    {
      name: 'product', // Product being viewed or recommended
      type: 'relationship',
      relationTo: 'products', // Assuming you have a 'products' collection
      required: false,
    },
    {
      name: 'brand', // Brand page (if applicable)
      type: 'relationship',
      relationTo: 'brands', // Assuming you have a 'brands' collection
      required: false,
    },
    {
      name: 'supplier', // Supplier page (if applicable)
      type: 'relationship',
      relationTo: 'companies', // Assuming you have a 'companies' collection
      required: false,
    },
    {
      name: 'searchQuery', // Search query entered by the user
      type: 'text',
      required: false,
    },
    {
      name: 'interactionType', // Type of interaction (e.g., view, click, add-to-cart)
      type: 'select',
      options: ['click', 'send-enquiry', 'purchase'],
      required: true,
    },
    {
      name: 'timestamp', // Timestamp of the interaction
      type: 'date',
      required: true,
      defaultValue: () => new Date(), // Automatically set to current time
    },
    {
      name: 'deviceType', // Device used (e.g., mobile, desktop)
      type: 'select',
      options: ['mobile', 'desktop', 'tablet'],
      required: false,
    },
    {
      name: 'location', // User's location (if available)
      type: 'text',
      required: false,
    },
    {
      name: 'referrer', // Where the user came from (e.g., search, social media)
      type: 'text',
      required: false,
    },
    {
      name: 'isRecommendationClicked', // Whether the recommendation was clicked
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

export default Recommendations

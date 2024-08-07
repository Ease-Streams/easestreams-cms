import { webpackBundler } from '@payloadcms/bundler-webpack'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'
import search from '@payloadcms/plugin-search'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import { buildConfig } from 'payload/config'
import {
  Country,
  Customers,
  State,
  City,
  Users,
  RootCategory,
  ParentCategory,
  Products,
  Media,
  Companies,
  Subscriptions,
  Plans,
  Enquiries,
  HomePage,
  Brands,
  SearchTags,
} from './collections/Index'
import BeforeLogin from './components/BeforeLogin'
import SeoElements from './globals/SeoElements'
import HomeBanners from './globals/HomeBanners'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || '',
  collections: [
    Country,
    State,
    City,
    Users,
    Customers,
    Media,
    RootCategory,
    ParentCategory,
    Products,
    Plans,
    Subscriptions,
    Companies,
    Enquiries,
    HomePage,
    Brands,
    SearchTags,
  ],
  globals: [SeoElements, HomeBanners],
  plugins: [
    search({
      collections: ['products', 'parentcategory', 'rootcategory'],
      defaultPriorities: {},
    }),
  ],
  rateLimit: {
    max: 100000,
  },
  admin: {
    bundler: webpackBundler(),
    components: {
      beforeLogin: [BeforeLogin],
    },
  },
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})

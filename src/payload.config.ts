// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import Users from './collections/Users'
import Media from './collections/Media'
import Brands from './collections/Brands'
import Country from './collections/Country'
import State from './collections/State'
import City from './collections/City'
import Customers from './collections/Customers'
import Category from './collections/Category'
import subCategory from './collections/SubCategory'
import Products from './collections/Products'
import Plans from './collections/Plans'
import Subscriptions from './collections/Subscriptions'
import Companies from './collections/Companies'
import Enquiries from './collections/Enquiries'
import HomePage from './collections/Home'
import SearchTags from './collections/SearchTags'
import SeoElements from './globals/SeoElements'
import HomeBanners from './globals/HomeBanners'
import EnquiryScreening from './collections/EnquiryScreening'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Country,
    State,
    City,
    Users,
    Customers,
    Category,
    subCategory,
    Products,
    Plans,
    Subscriptions,
    EnquiryScreening,
    Companies,
    Enquiries,
    HomePage,
    Brands,
    SearchTags,
    Media,
  ],
  globals: [SeoElements, HomeBanners],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})

import type { CollectionConfig } from "payload/types";
import { generateUniqueCode } from "../utilities/GenerateSKU";
import {
  HTMLConverterFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { getCategoryData, normalizeSearchTerm } from "../utilities/helper";

export const Products: CollectionConfig = {
  slug: "products", // Collection slug (used for API endpoints)
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },

  // access: {
  //   read: ({}) => {
  //     return {
  //       title: {
  //         like: "Com",
  //       },
  //     }
  //   },
  // },
  fields: [
    {
      type: "text", // Field type (text for name)
      name: "title", // Field name
      label: "Name", // Label displayed in the admin UI
      required: false, // Make the field mandatory
      index: true,
    },
    {
      type: "relationship", // Field type for relationships
      name: "searchtagsRef",
      label: "Search tag", // Label displayed in the admin UI
      relationTo: "searchtags",
      required: true,
      index: true,
      hasMany: true,
    },
    {
      type: "text", // Field type (text for name)
      name: "itemCode", // Field name
      label: "Item Code", // Label displayed in the admin UI
      required: false,
      index: true,
      admin: {
        readOnly: true,
      },
    },
    {
      type: "relationship", // Field type for relationships
      name: "brandsRef",
      label: "Brands", // Label displayed in the admin UI
      relationTo: "brands",
      required: true,
      index: true,
      hasMany: true,
    },

    {
      name: "productimages", // required
      type: "array", // required
      label: "Product Images",
      required: false,
      fields: [
        {
          type: "relationship",
          name: "image",
          label: "Image",
          relationTo: "media",
          required: false, // Ensure each item has a valid media relation
        },
      ],
    },
    {
      type: "array", // Field type (text for name)
      name: "videourls", // Field name
      label: "Video URLs", // Label displayed in the admin UI
      fields: [
        {
          type: "relationship",
          name: "video",
          label: "Video",
          relationTo: "media",
          required: false, // Ensure each item has a valid media relation
        },
      ],
    },
    {
      type: "array", // Field type (text for name)
      name: "specification", // Field name
      label: "Specification", // Label displayed in the admin UI
      required: false, // Make the field mandatory
      fields: [
        {
          type: "text", // Field type (text for name)
          name: "key",
          label: "Key",
        },
        {
          type: "text", // Field type (text for name)
          name: "value",
          label: "Value",
        },
      ],
    },
    {
      type: "relationship", // Field type for relationships
      name: "parentcategoryref",
      label: "Parent Category", // Label displayed in the admin UI
      relationTo: "parentcategory",
    },
    {
      type: "relationship", // Field type for relationships
      hasMany: true,
      name: "supplierRef",
      label: "Suppliers", // Label displayed in the admin UI
      relationTo: "companies",
    },
    {
      type: "relationship", // Field type for relationships
      name: "cityref",
      label: "City", // Label displayed in the admin UI
      relationTo: "city",
    },
    {
      type: "textarea", // Field type (text for name)
      name: "description", // Field name,
      label: "Description", // Label displayed in the admin UI
      required: false, // Make the field mandatory
      index: true,
    },
    {
      type: "text", // Field type (text for name)
      name: "slug", // Field name,
      label: "Slug", // Label displayed in the admin UI
      required: false, // Make the field mandatory
      admin: {
        readOnly: true,
      },
    },
    {
      name: "productDescription",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
    },
    {
      name: "metaTitle",
      type: "text",
      label: "Meta Title",
    },
    {
      name: "metaKeyword",
      type: "text",
      label: "Meta Keywords",
    },
    {
      name: "canonical",
      type: "text",
      label: "Canonical",
    },
    {
      name: "metaDescription",
      type: "text",
      label: "Meta Description",
    },

    {
      type: "relationship", // Field type for relationships
      name: "createdBy",
      label: "Created By", // Label displayed in the admin UI
      relationTo: "users",
      defaultValue: ({ user }) => user.id,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
      access: {
        read: () => false,
      },
    },
    {
      type: "relationship", // Field type for relationships
      name: "modifiedBy",
      label: "Modified By", // Label displayed in the admin UI
      relationTo: "users",
      defaultValue: ({ user }) => user.id,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
      access: {
        read: () => false,
      },
    },
    {
      name: "isDeleted",
      label: "Deleted?",
      type: "checkbox",
      defaultValue: false,
    },
  ],
  hooks: {
    afterRead: [
      async ({ doc, req }) => {
        delete doc?.isDeleted;
        delete doc?.updatedAt;
        delete doc?.createdAt;

        delete doc?.parentcategoryref?.metaTitle;
        delete doc?.parentcategoryref?.metaDescription;
        delete doc?.parentcategoryref?.canonical;
        delete doc?.parentcategoryref?.metaKeyword;
        delete doc?.parentcategoryref?.pageContent;

        delete doc?.parentcategoryref?.rootCategoryRef?.metaTitle;
        delete doc?.parentcategoryref?.rootCategoryRef?.metaDescription;
        delete doc?.parentcategoryref?.rootCategoryRef?.canonical;
        delete doc?.parentcategoryref?.rootCategoryRef?.metaKeyword;
        delete doc?.parentcategoryref?.rootCategoryRef?.pageContent;

        delete doc?.parentcategoryref?.isDeleted;
        delete doc?.parentcategoryref?.updatedAt;
        delete doc?.parentcategoryref?.createdAt;

        delete doc?.parentcategoryref?.rootCategoryRef?.isDeleted;
        delete doc?.parentcategoryref?.rootCategoryRef?.updatedAt;
        delete doc?.parentcategoryref?.rootCategoryRef?.createdAt;

        delete doc?.cityref?.isDeleted;
        delete doc?.cityref?.updatedAt;
        delete doc?.cityref?.createdAt;
        delete doc?.cityref?.isActive;

        delete doc?.cityref?.stateRef?.isDeleted;
        delete doc?.cityref?.stateRef?.updatedAt;
        delete doc?.cityref?.stateRef?.createdAt;
        delete doc?.cityref?.stateRef?.isActive;

        delete doc?.cityref?.countryRef?.isDeleted;
        delete doc?.cityref?.countryRef?.updatedAt;
        delete doc?.cityref?.countryRef?.createdAt;
        delete doc?.cityref?.countryRef?.isActive;
        return doc;
      },
    ],
    beforeValidate: [
      async ({ data, req, operation }) => {
        if (operation == "create") {
          data["createdBy"] = req.user.id;
          data["modifiedBy"] = req.user.id;
          data["itemCode"] = await generateUniqueCode(6, req.headers.cookie);
          let category = await getCategoryData(data.parentcategoryref);
          data["slug"] = `/${normalizeSearchTerm(
            category.rootCategoryRef.title
          )}/${normalizeSearchTerm(category.title)}/${normalizeSearchTerm(
            data.title
          )}-${data["itemCode"]}`;
        } else if (operation == "update") {
          data["modifiedBy"] = req.user.id;
        }
        return {
          ...data,
          itemCode: data["itemCode"],
          createdBy: data.createdBy ? data.createdBy : data["createdBy"],
          modifiedBy: data["modifiedBy"],
        };
      },
    ],
  },
};

export default Products;

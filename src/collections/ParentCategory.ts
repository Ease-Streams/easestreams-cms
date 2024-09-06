import {
  HTMLConverterFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload/types";

export const ParentCategory: CollectionConfig = {
  slug: "parentcategory", // Collection slug (used for API endpoints)
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      type: "text", // Field type (text for name)
      name: "title", // Field name
      label: "Category Name", // Label displayed in the admin UI
      required: true, // Make the field mandatory
    },
    {
      type: "textarea", // Field type (text for name)
      name: "description", // Field name
      label: "Description", // Label displayed in the admin UI
      maxLength: 200,
      required: true, // Make the field mandatory
    },
    {
      type: "relationship",
      name: "categoryImage",
      label: "Image",
      relationTo: "media",
      required: false, // Ensure each item has a valid media relation
    },
    {
      type: "relationship", // Field type for relationships
      name: "rootCategoryRef",
      label: "Root Category", // Label displayed in the admin UI
      relationTo: "rootcategory",
      required: true, // Make the field mandatory
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
      name: "pageContent",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          HTMLConverterFeature({}),
        ],
      }),
    },
    {
      type: "relationship", // Field type for relationships
      name: "createdBy",
      label: "Created By", // Label displayed in the admin UI
      relationTo: "users",
      admin: {
        allowCreate: false,
      },
      defaultValue: ({ user }) => user.id,
      access: {
        update: () => false,
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
        allowCreate: false,
      },
      access: {
        update: () => false,
        read: () => false,
      },
      hooks: {
        afterChange: [
          async ({ operation, req, data }) => {
            if (operation === "update") {
              data.modifiedBy = req.user.id;
              return data;
            }
          },
        ],
      },
    },
    {
      name: "isDeleted",
      label: "Deleted?",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};

export default ParentCategory;

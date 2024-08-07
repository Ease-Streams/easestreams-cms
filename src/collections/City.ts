import type { CollectionConfig } from "payload/types";

const fetchStateData: any = async (value: number, cookie: any) => {
  const response = await fetch(`http://localhost:3000/api/state/${value}`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Cookie: cookie,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    return false;
  }
};

export const City: CollectionConfig = {
  slug: "city", // Collection slug (used for API endpoints)
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },

  fields: [
    {
      type: "text", // Field type (text for username)
      name: "title", // Field name
      label: "Name", // Label displayed in the admin UI
      required: true, // Make the field mandatory
    },
    {
      type: "relationship", // Field type for relationships
      name: "stateRef",
      label: "State", // Label displayed in the admin UI
      relationTo: "state",
      required: true, // Make the field mandatory
    },
    {
      name: "countryRef",
      type: "relationship",
      label: "Country",
      relationTo: "country",
    },
    {
      type: "relationship", // Field type for relationships
      name: "createdBy",
      label: "Created By", // Label displayed in the admin UI
      relationTo: "users",
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
      access: {
        update: () => false,
        read: () => false,
      },
      hooks: {
        afterChange: [
          async ({ operation, req, data }) => {
            if (operation === "update") {
              // Your custom logic here
              data.modifiedBy = req.user.id;
              return data;
            }
          },
        ],
      },
    },
    {
      name: "isActive",
      label: "Active",
      type: "checkbox", // Field type for email
      defaultValue: true,
    },
  ],

  hooks: {
    beforeValidate: [
      async ({ context, data, req }) => {
        context.stateData = await fetchStateData(
          data.stateId,
          req.headers.cookie
        );
        return {
          ...data,
          countryId: context.stateData["countryId"]["id"],
        };
      },
    ],
  },
};

export default City;

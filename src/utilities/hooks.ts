import { FieldHook } from "payload/types";
export const setCreatedBy: FieldHook = ({ req, operation }) => {
  if (operation === "create") {
    return req.user?.id || null; // Set createdBy to the current user's ID
  }
};

export const setModifiedBy: FieldHook = ({ req }) => {
  return req.user?.id || null; // Set modifiedBy to the current user's ID
};

// Hook to set the `createdAt` field only during creation
export const setCreatedAt: FieldHook = ({ data, operation }) => {
  if (operation === "create") {
    return new Date(); // Set the current date during creation
  }
  return data?.createdAt; // Keep the existing value during updates
};

// Hook to set the `modifiedAt` field on each modification
export const setModifiedAt: FieldHook = ({ operation }) => {
  if (operation === "update") {
    return new Date(); // Set the current date during update
  }
};

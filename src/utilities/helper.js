export const getSubCategoryData = async (categoryId) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/subcategory/${categoryId}`
  );
  const data = await response.json();
  return data;
};
export const saniTizeText = (title) => {
  // Convert title to lowercase, replace spaces with hyphens, and remove special characters
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .trim()
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};

export const normalizeSearchTerm = (searchTerm) => {
  return searchTerm
    .toLowerCase()
    .replace(/[^\w\s&]/g, "-") // Replace non-word, non-space, and non-ampersand characters
    .replace(/\s+/g, "-") // Replace multiple spaces with a single hyphen
    .replace(/&/g, "-") // Replace ampersands with hyphens
    .replace(/-{2,}/g, "-")
    .trim(); // Replace two or more consecutive hyphens with a single hyphen
};

const allRoles = ["admin", "editor"];
const deletRoles = ["admin"];
export const checkCreateAccess = (user) => {
  if (allRoles.includes(user)) {
    return true;
  }
  return false;
};

export const checkDeleteAccess = (user) => {
  if (deletRoles.includes(user)) {
    return true;
  }
  return false;
};

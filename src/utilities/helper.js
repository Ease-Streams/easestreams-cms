export const getCategoryData = async categoryId => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/parentcategory/${categoryId}`,
  )
  const data = await response.json()
  return data
}

export const normalizeSearchTerm = searchTerm => {
  return searchTerm
    .toLowerCase()
    .replace(/[^\w\s&]/g, '-') // Replace non-word, non-space, and non-ampersand characters
    .replace(/\s+/g, '-') // Replace multiple spaces with a single hyphen
    .replace(/&/g, '-') // Replace ampersands with hyphens
    .replace(/-{2,}/g, '-')
    .trim() // Replace two or more consecutive hyphens with a single hyphen
}

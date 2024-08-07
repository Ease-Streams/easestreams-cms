const fetchOptions = async (code, cookie) => {
  let url = `${process.env.NEXT_PUBLIC_PAYLOAD_URL}/api/products?where[itemCode][equals]=${code}`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Cookie: cookie,
    },
  })
  return await response.json()
}

export async function generateUniqueCode(length, cookie) {
  let code = ''
  let products = []
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  do {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      code += characters.charAt(randomIndex)
    }
    products = await fetchOptions(code, cookie)
  } while (products.totalDocs > 0)
  return code
}

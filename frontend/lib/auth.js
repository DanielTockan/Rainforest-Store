export function getUserId() {
  const token = localStorage.getItem('token')

  if (!token) return false

  const parsedToken = JSON.parse(atob(token.split('.')[1]))
  return parsedToken.sub
}

export function isCreator(comparedId) {
  if (!comparedId) return false
  return getUserId() === comparedId
}

export function getUUID () {

  // later get ID from api, for now a mockup
  return crypto.randomUUID().slice(0,8)
}

export function getUUID () {

  // later get ID from api, for now a mockup
  return crypto.randomUUID().slice(0,8)
}


export async function apiCreateBeetl (data) {
  // await setTimeout(()=>{},400)
  return {status: "successfull"}
}
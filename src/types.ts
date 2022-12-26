
export type EntryType = {
  id: number
  name: string
  beetlsId: string
  min: number
  max: number
}

export type BeetleType = {
  name: string
  targetSum: number | ""
  model: "beta"
}
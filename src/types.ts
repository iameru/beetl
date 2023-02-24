export type BeetlType = {
    slug: string
    target?: number
    title?: string
    description?: string
    calculationType: "percentage" | "step"
};

export type PostBeetl = {
  slug: string
  calculationType: "percentage" | "step"
}

export type BeetlResponse = PostBeetl & {
  id: string
  collectionId: string
  collectionName: string
  created: string
  updated: string
  target: number
  title: string
  description: string
  bids: []
}

export type BidResponse = {
      id: string
      collectionId: string
      collectionName: string
      created: string
      updated: string
      name: string
      min: number
      mid: number
      max: number
      beetl: string
}

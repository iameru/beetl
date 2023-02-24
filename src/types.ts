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
}

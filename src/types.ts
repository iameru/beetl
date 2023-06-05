export type BeetlPost = {
  obfuscation: string;
  slug: string;
  method: string;
  beetlmode: "public" | "private";
  title?: string;
  description?: string;
  target?: 0;
};
export type BeetlPostResponse = BeetlPost & {
  secretkey: string;
};
export type BeetlPatch = BeetlPost & {
  secretkey: string;
};
export type BeetlGetResponse = BeetlPost & {
  created: string;
  updated: string;
};

export type PostBid = {
  name: string;
  min: number;
  mid?: number;
  max: number;
  beetl_obfuscation: string;
  beetl_slug: string;
};
export type GetBid = PostBid & {
  created: string;
  updated: string;
};
export type PostBidResponse = PostBid & {
  created: string;
  updated: string;
  secretkey: string;
};
export type BidGetResponse = {
  bids_total: number;
  bids: GetBid[];
};

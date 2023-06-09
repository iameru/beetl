export type BeetlPost = {
  obfuscation: string;
  slug: string;
  method: string;
  beetlmode: "public" | "private";
  title?: string;
  description?: string;
  target?: number;
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
  id: string;
  created: string;
  updated: string;
};
export type PatchBid = GetBid & {
  secretkey: string;
};
export type PostBidResponse = PostBid & {
  id: string;
  created: string;
  updated: string;
  secretkey: string;
};
export type BidGetResponse = {
  bids_total: number;
  bids: GetBid[];
};

export type BidDelete = {
  beetl_obfuscation: string;
  beetl_slug: string;
  secretkey: string;
};

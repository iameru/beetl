export type possibleCalcTypes = "percentage" | "step";
export type BeetlType = {
  slug: string;
  target?: number;
  title?: string;
  description?: string;
  calculationType: possibleCalcTypes;
};

/*  this gets send to the server to create a beetl  */
export type PostBeetl = {
  slug: string;
  obfuscation: string;
  calculationType: "percentage" | "step";
};

export type BeetlResponse = PostBeetl & {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  target: number;
  title: string;
  description: string;
  bids: [];
};

export type PostBid = {
  id?: string;
  name?: string;
  min?: number | "";
  mid?: number | "";
  max?: number | "";
  beetl: string;
};
export type BidResponse = PostBid & {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
};

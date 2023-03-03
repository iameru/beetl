import { PostBeetl, BeetlResponse, BidResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import appConfig from "beetl.config";
import PocketBase from "pocketbase";

const pb = new PocketBase(appConfig.APIURL);

export function useBeetl(obfuscation: string, slug: string) {
  const query = useQuery<BeetlResponse>(["beetl", obfuscation, slug], () =>
    getBeetl(obfuscation, slug)
  );
  return {
    ...query,
    beetl: query.data,
  };
}
export function useBids(beetlId: string) {
  const query = useQuery(["bids", beetlId], () => getBids(beetlId), {
    enabled: Boolean(beetlId),
  });
  return {
    ...query,
    bids: query.data,
  };
}

export async function createBeetl(data: PostBeetl) {
  const record: BeetlResponse = await pb
    .collection("beetl_beetls")
    .create(data);
  return record;
}

async function getBeetl(obfuscation: string, slug: string) {
  const record: BeetlResponse = await pb
    .collection("beetl_beetls")
    .getFirstListItem(`obfuscation="${obfuscation}" && slug="${slug}"`);
  return record;
}

async function getBids(beetlId: string) {
  const records: BidResponse[] = await pb
    .collection("beetl_bid")
    .getFullList(200, { sort: "created", filter: `beetl.id="${beetlId}"` });
  return records;
}

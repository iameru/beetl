import { BidGetResponse } from "@/types";
import { BeetlPost, BeetlPostResponse, BeetlGetResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import appConfig from "beetl.config";
import axios from "axios";

axios.defaults.baseURL = appConfig.APIURL;


export async function createBeetl(data: BeetlPost): Promise<BeetlPostResponse> {
  const response = await axios.post(`/beetl`, data);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
}
async function getBeetl(obfuscation: string, slug: string): Promise<BeetlGetResponse> {

  const response = await axios.get('/beetl', { params: { obfuscation, slug } });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
}

export function useBeetl(obfuscation: string, slug: string) {
  const query = useQuery<BeetlGetResponse>(["beetl", obfuscation, slug], () =>
    getBeetl(obfuscation, slug)
  );
  return {
    ...query,
    beetl: query.data,
  };
}

async function getBids(obfuscation: string, slug: string): Promise<BidGetResponse> {

  const response = await axios.get('/bids', { params: { obfuscation, slug } });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
}

export function useBids(obfuscation: string, slug: string) {
  const query = useQuery(["bids", obfuscation, slug], () => getBids(obfuscation, slug), {
    enabled: Boolean(obfuscation && slug),
  });
  return {
    ...query,
  };
}

// export async function createBid(data: PostBid) {
//   const record: BidResponse = await pb.collection("beetl_bid").create(data);
//   return record;
// }
// export async function updateBid(data: PostBid) {
//   const record = await pb
//     .collection("beetl_bid")
//     .update(data.id as string, data);
//   return record;
// }
// export async function deleteBid(data: PostBid) {
//   const record = await pb.collection("beetl_bid").delete(data.id as string);
//   return record;
// }


import { BidGetResponse, PatchBid } from "@/types";
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
async function getBeetl(
  obfuscation: string,
  slug: string
): Promise<BeetlGetResponse> {
  const response = await axios.get("/beetl", { params: { obfuscation, slug } });
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

async function getBids(
  obfuscation: string,
  slug: string
): Promise<BidGetResponse> {
  const response = await axios.get("/bids", { params: { obfuscation, slug } });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
}

export function useBids(obfuscation: string, slug: string) {
  const query = useQuery(
    ["bids", obfuscation, slug],
    () => getBids(obfuscation, slug),
    {
      enabled: Boolean(obfuscation && slug),
    }
  );
  return {
    ...query,
  };
}

import { PostBid, GetBid, PostBidResponse } from "@/types";
export async function createBid(data: PostBid): Promise<PostBidResponse> {
  const response = await axios.post("/bid", data);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
}
export async function updateBid(data: PatchBid): Promise<PostBidResponse> {
  const _data = { ...data, id: null };
  const response = await axios.patch("/bid", _data);
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
}

export async function deleteBid(data: PatchBid) {
  const response = await axios.delete("/bid", { data });
  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(response.statusText);
  }
}

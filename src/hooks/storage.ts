import { PostBidResponse, PatchBid } from "@/types";

if (typeof window !== "undefined") {
  const storageBids = JSON.parse(localStorage.getItem("bids") || "[]");
  localStorage.setItem("bids", JSON.stringify(storageBids));
}

type bidStorageType = {
    id: string
    secretkey: string
    obfuscation: string
    slug: string
  };

function addBid(data: PostBidResponse) {

  const storeBid:bidStorageType = {
    id: data.id,
    secretkey: data.secretkey,
    obfuscation: data.beetl_obfuscation,
    slug: data.beetl_slug,
  };

  const storageBids = JSON.parse(localStorage.getItem("bids") || "[]");

  storageBids.push(storeBid);

  localStorage.setItem("bids", JSON.stringify(storageBids));
}

function getBid(id: string): bidStorageType | undefined {
  const storageBids = JSON.parse(localStorage.getItem("bids") || "[]") as []
  return storageBids.find((bid: PatchBid) => bid.id === id)
}

export default function useBidStore() {

  return {
    addBid,
    getBid
  }
}

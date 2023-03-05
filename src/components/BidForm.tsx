import { createBid } from "@/hooks/requests";
import { BeetlResponse, PostBid } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Button from "./Button";

type Props = {
  beetl: BeetlResponse;
  type: "new" | "edit";
  visibilityToggle: Function;
  bid?: PostBid;
};

export default function BidForm({
  beetl,
  type,
  visibilityToggle,
  bid: currentBid,
}: Props) {
  let initialFormState: PostBid;

  if (currentBid) {
    initialFormState = currentBid;
  } else {
    initialFormState = {
      beetl: beetl.id,
      name: "",
      min: "",
      mid: "",
      max: "",
    };
  }

  const [bid, setBid] = useState<PostBid>(initialFormState);

  const queryClient = useQueryClient();
  const mutation = useMutation(() => createBid(bid), {
    onSuccess: () => {
      queryClient.invalidateQueries(["bids", beetl.id]);
      setBid({ beetl: beetl.id });
      visibilityToggle();
    },
  });

  function submitBid() {
    mutation.mutate();
  }

  return (
    <form
      className="absolute left-0 right-0 -mt-7 bg-secondary-light z-10 px-1 py-2 mx-4 grid grid-cols-12 border rounded border-primary-light focus-within:border-primary-dark"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        type="text"
        className="w-full focus:outline-none focus:font-semibold col-span-8 bg-secondary-light"
        value={bid.name}
        placeholder="name"
        onChange={(e) => setBid((prev) => ({ ...prev, name: e.target.value }))}
        required
      />
      <button
        className="col-start-12 text-black text-center hover:cursor-pointer px-2"
        type="button"
        onClick={visibilityToggle}
      >
        hide
      </button>
      <input
        type="number"
        className="w-full focus:outline-none focus:font-semibold text-signal-min col-span-3 bg-secondary-light"
        placeholder="min"
        value={bid.min}
        onChange={(e) =>
          setBid((prev) => ({ ...prev, min: Number(e.target.value) }))
        }
        required
      />
      <input
        type="number"
        className="w-full focus:outline-none focus:font-semibold text-signal-mid col-span-3 bg-secondary-light"
        placeholder="mid"
        value={bid.mid}
        onChange={(e) =>
          setBid((prev) => ({ ...prev, mid: Number(e.target.value) }))
        }
        required
      />
      <input
        type="number"
        className="w-full focus:outline-none focus:font-semibold text-signal-max col-span-3 bg-secondary-light"
        placeholder="max"
        value={bid.max}
        onChange={(e) =>
          setBid((prev) => ({ ...prev, max: Number(e.target.value) }))
        }
        required
      />
      <Button
        className="col-span-3"
        onClick={submitBid}
        label="add"
        type="submit"
      />
    </form>
  );
}

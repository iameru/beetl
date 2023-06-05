import {
  createBid,
  updateBid,
  deleteBid as deleteBidFunc,
} from "@/hooks/requests";
import { BeetlResponse, PostBid } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Button from "./Button";
import { TrashIcon } from "@heroicons/react/20/solid";

type Props = {
  beetl: BeetlResponse;
  type: "new" | "edit";
  visibilityToggle: () => void;
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

  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const queryClient = useQueryClient();
  const createBidMutation = useMutation(() => createBid(bid), {
    onSuccess: () => {
      queryClient.invalidateQueries(["bids", beetl.id]);
      setBid(initialFormState);
      visibilityToggle();
    },
  });
  const updateBidMutation = useMutation(() => updateBid(bid), {
    onSuccess: () => {
      queryClient.invalidateQueries(["bids", beetl.id]);
      /// CHECK IF VIEW IS TOGGLED AGAIN THE OLD DATA IS STILL PRESENT
      visibilityToggle();
    },
  });
  const deleteBidMutation = useMutation(() => deleteBidFunc(bid), {
    onSuccess: () => {
      queryClient.invalidateQueries(["bids", beetl.id]);
      /// CHECK IF VIEW IS TOGGLED AGAIN THE OLD DATA IS STILL PRESENT
      visibilityToggle();
    },
  });

  function deleteBid() {
    deleteBidMutation.mutate();
  }
  function submitBid() {
    if (currentBid) {
      updateBidMutation.mutate();
    } else {
      createBidMutation.mutate();
    }
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
        className="absolute mt-1 col-start-10 rounded-lg bg-warning text-center hover:cursor-pointer hover:bg-danger px-2"
        type="button"
        onClick={() => setShowDeleteWarning(true)}
      >
        <TrashIcon className="h-4 w-5 inline-block text-white" />
      </button>
      {showDeleteWarning && (
        <button
          type="button"
          onClick={() => deleteBid()}
          onMouseLeave={() => setShowDeleteWarning(false)}
          className="absolute col-start-11 col-span-2 p-2 text-center text-white bg-danger rounded-lg"
        >
          Delete this entry!
        </button>
      )}
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
        label={currentBid ? "update" : "add"}
        type="submit"
      />
    </form>
  );
}

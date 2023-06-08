import {
  createBid,
  updateBid,
  deleteBid as deleteBidFunc,
} from "@/hooks/requests";
import { BeetlGetResponse, GetBid, PostBid, PatchBid } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Button from "./Button";
import { TrashIcon } from "@heroicons/react/20/solid";
import useBidStore from "@/hooks/storage";
import ModalTemplate from "./ModalTemplate";
import AskForSecretKeyBid from "./AskForSecretKeyBid";
import {InputBox} from "./Input";

type Props = {
  beetl: BeetlGetResponse;
  type: "new" | "edit";
  visibilityToggle: () => void;
  bid?: GetBid;
};

export default function NewBidForm({
  beetl,
  type,
  visibilityToggle,
  bid,
}: Props) {

  let initialFormState: PostBid | PatchBid = bid || {
    beetl_obfuscation: beetl.obfuscation,
    beetl_slug: beetl.slug,
    name: "",
    min: 0,
    mid: 0,
    max: 0,
  };
  const [_secretKey, _setSecretKey] = useState('')
  if (type === "edit") {
    
    const { getBid } = useBidStore();
    const storedBid = getBid((bid as GetBid).id)
    const secretkey = storedBid?.secretkey
    if (_secretKey) {
      (initialFormState as PatchBid).secretkey = _secretKey
    } else if (secretkey) {
      (initialFormState as PatchBid).secretkey = secretkey
      _setSecretKey(secretkey)
    } 
  }
  const [form, setForm] = useState<PostBid | PatchBid>(initialFormState);

  function handleCancel() {
    setForm(initialFormState);
    visibilityToggle();
  }
  function handleSubmit() {
    
  }
  return (
    <ModalTemplate>
      <h2 className="text-xl font-semibold">
        {type === "new" && "Add New Bid"}
        {type === "edit" && "Edit Bid"}
      </h2>

      <InputBox 
        label="Name" 
        placeholder="Name" 
        type="text"
        value={form.name} 
        onChange={(e) => setForm({ ...form, name: e.target.value })} 
      />
      <InputBox
        label="Min"
        placeholder="Min"
        type="number"
        value={form.min}
        onChange={(e) => setForm({ ...form, min: Number(e.target.value) })}
      />
      <InputBox
        label="Mid"
        placeholder="Mid"
        type="number"
        value={form.mid}
        onChange={(e) => setForm({ ...form, mid: Number(e.target.value) })}
      />
      <InputBox
        label="Max"
        placeholder="Max"
        type="number"
        value={form.max}
        onChange={(e) => setForm({ ...form, max: Number(e.target.value) })}
      />
      {type === 'edit' && <input type='hidden' name='secretkey' value={form.secretkey} />}

      <Button secondary onClick={handleCancel} label="Cancel" />
      <Button onClick={handleSubmit} label="Submit" />
   
      {type === "edit" && !_secretKey && 
        <ModalTemplate>
        <AskForSecretKeyBid cancel={handleCancel} setSecretKey={_setSecretKey} />
      </ModalTemplate>
    }
    </ModalTemplate>
  );
}








function BidForm({ beetl, type, visibilityToggle, bid: currentBid }: Props) {
  let initialFormState: PostBid | PatchBid;

  const { getBid } = useBidStore();

  if (type === "edit") {
    const secretkey = getBid((currentBid as GetBid).id)?.secretkey;
    if (typeof secretkey) {
      initialFormState = { ...currentBid, secretkey: secretkey };
    } else {
      // ask for the secretkey.
      // ask for the secretkey.
      // ask for the secretkey.
      // ask for the secretkey.
    }
  } else {
    initialFormState = {
      name: "",
      min: 0,
      mid: 0,
      max: 0,
      beetl_obfuscation: beetl.obfuscation,
      beetl_slug: beetl.slug,
    };
  }

  const [bid, setBid] = useState<PostBid>(initialFormState);

  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const queryClient = useQueryClient();
  const createBidMutation = useMutation(() => createBid(bid), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["bids", beetl.obfuscation, beetl.slug]);

      const { addBid } = useBidStore();
      addBid(data);
      triggerBidInfo(data.secretkey);

      setBid(initialFormState);
    },
  });
  const updateBidMutation = useMutation(() => updateBid(bid), {
    onSuccess: () => {
      queryClient.invalidateQueries(["bids", beetl.obfuscation, beetl.slug]);

      /// CHECK IF VIEW IS TOGGLED AGAIN THE OLD DATA IS STILL PRESENT
      visibilityToggle();
    },
  });
  const deleteBidMutation = useMutation(() => deleteBidFunc(bid), {
    onSuccess: () => {
      queryClient.invalidateQueries(["bids", beetl.obfuscation, beetl.slug]);
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
  const [showBidInfo, setShowBidInfo] = useState(false);
  const [bidInfo, setBidInfo] = useState<string>("");
  function triggerBidInfo(secretkey: string) {
    setBidInfo(secretkey);
    setShowBidInfo(true);
  }

  if (showBidInfo) {
    return (
      <div className="absolute left-0 right-0 -mt-7 bg-secondary-light z-10 px-1 py-2 mx-4 flex justify-between border rounded border-primary-light focus-within:border-primary-dark">
        <div className="flex flex-col">
          <h3>secretkey kopieren</h3>
          <p>
            Bitte wegspeichern. Falls dein Browser es sich nicht zuverlässig
            merkt kannst du nur mit diesem key dein Gebot ändern:
          </p>
          <div className="flex border-primary border max-w-max rounded">
            <p
              className="max-w-max p-1 hover:cursor-pointer bg-secondary-light hover:bg-secondary-dark"
              onClick={() => {
                navigator.clipboard.writeText(bidInfo);
              }}
            >
              copy to clipboard
            </p>
            <p className="max-w-max p-1">{bidInfo}</p>
          </div>
        </div>
        <button
          className="text-black text-center hover:cursor-pointer px-2"
          type="button"
          onClick={visibilityToggle}
        >
          hide
        </button>
      </div>
    );
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

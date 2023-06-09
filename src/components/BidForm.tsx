import {
  createBid,
  updateBid,
  deleteBid as deleteBidFunc,
} from "@/hooks/requests";
import { BeetlGetResponse, GetBid, PostBid, PatchBid } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Button from "./Button";
import { TrashIcon } from "@heroicons/react/20/solid";
import useBidStore from "@/hooks/storage";
import ModalTemplate from "./ModalTemplate";
import AskForSecretKeyBid from "./AskForSecretKeyBid";
import { InputBox } from "./Input";
import CopyToClick from "./CopyToClickText";

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
    min: NaN,
    mid: NaN,
    max: NaN,
  };
  const [_secretKey, _setSecretKey] = useState("");
  if (type === "edit") {
    const { getBid } = useBidStore();
    const storedBid = getBid((bid as GetBid).id);
    const secretkey = storedBid?.secretkey;
    if (_secretKey) {
      (initialFormState as PatchBid).secretkey = _secretKey;
    } else if (secretkey) {
      (initialFormState as PatchBid).secretkey = secretkey;
      _setSecretKey(secretkey);
    }
  }
  const [form, setForm] = useState<PostBid | PatchBid>(initialFormState);

  const [secretKeyInfo, setSecretKeyInfo] = useState("");
  const queryClient = useQueryClient();
  const createBidMutation = useMutation(() => createBid(form), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["bids", beetl.obfuscation, beetl.slug]);
      const { addBid } = useBidStore();
      addBid(data);
      setSecretKeyInfo(data.secretkey);
    },
  });
  const updateBidMutation = useMutation(() => updateBid(form as PatchBid), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["bids", beetl.obfuscation, beetl.slug]);
    },
  });

  const [confirmDelete, setConfirmDelete] = useState(false);

  function handleCancel() {
    setForm(initialFormState);
    visibilityToggle();
  }
  function handleSubmit() {
    if (type === "new") {
      createBidMutation.mutate();
    }
    if (type === "edit") {
      updateBidMutation.mutate();
    }
    close()
  }
  async function handleDelete() {

    const data = {
      beetl_obfuscation: beetl.obfuscation,
      beetl_slug: beetl.slug,
      secretkey: form.secretkey
    }
    const response = await deleteBidFunc(data)
    if (response.status === 200) {
      queryClient.invalidateQueries(["bids", beetl.obfuscation, beetl.slug]);
      setConfirmDelete(false)
      visibilityToggle()
    }
  }
  function close() {
    visibilityToggle()
    setForm(initialFormState);
    setSecretKeyInfo("");
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
        onKeyDown={(e) => {
          e.key === "Escape" && close();
          e.key === "Enter" && handleSubmit();
        }}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <InputBox
        label="Min"
        placeholder="Min"
        type="number"
        value={form.min}
        onKeyDown={(e) => {
          e.key === "Escape" && close();
          e.key === "Enter" && handleSubmit();
        }}
        onChange={(e) => setForm({ ...form, min: Number(e.target.value) })}
      />
      {beetl.method == "stepwise" && (
        <InputBox
          label="Mid"
          placeholder="Mid"
          type="number"
          value={form.mid}
          onKeyDown={(e) => {
            e.key === "Escape" && close();
            e.key === "Enter" && handleSubmit();
          }}
          onChange={(e) => setForm({ ...form, mid: Number(e.target.value) })}
        />
      )}
      <InputBox
        label="Max"
        placeholder="Max"
        type="number"
        value={form.max}
        onKeyDown={(e) => {
          e.key === "Escape" && close();
          e.key === "Enter" && handleSubmit();
        }}
        onChange={(e) => setForm({ ...form, max: Number(e.target.value) })}
      />
      {type === "edit" && (
        <input type="hidden" name="secretkey" value={form.secretkey} />
      )}

      <Button secondary onClick={handleCancel} label="Cancel" />
      {type === "edit" && <Button onClick={() => setConfirmDelete(true)} label="Delete" className="bg-warning" />}
      <Button onClick={handleSubmit} label={(type === "edit") ? "Update" : "Submit"} />

      {confirmDelete && (
        <ModalTemplate>
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm">
              Are you sure you want to delete this bid?
            </p>
            <div className="flex gap-4">
            <Button
              onClick={() => setConfirmDelete(false) }
              label="Cancel"
              secondary
            />
            <Button
              className="bg-danger"
              onClick={handleDelete}
              label="Delete"
            />
            </div>
          </div>
        </ModalTemplate>
      )}
      {secretKeyInfo && (
        <ModalTemplate>
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm">
              please save this key. In case your browser does not save it for you, you will need it to change your bid later.
            </p>
            <CopyToClick text={secretKeyInfo} />
            <Button onClick={close} label="Got it!" />
          </div>
        </ModalTemplate>
      )}
      {type === "edit" && !_secretKey && (
        <ModalTemplate>
          <AskForSecretKeyBid
            bid={bid as GetBid}
            cancel={handleCancel}
            setSecretKey={_setSecretKey}
          />
        </ModalTemplate>
      )}
    </ModalTemplate>
  );
}

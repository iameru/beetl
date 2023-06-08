import { patchBeetl } from "@/hooks/requests";
import { BeetlGetResponse, BeetlPatch } from "@/types";
import { isEqual, timefmt } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useRef, useState } from "react";
import Button from "./Button";
import { InputBox, InputBoxLabel } from "./Input";
import ModalSuccess from "./ModalSuccess";

type props = {
  beetl: BeetlGetResponse;
  secretkey: string;
};
export default function BeetlUpdateForm({ beetl, secretkey }: props) {
  let initialFormState = { ...beetl, secretkey };
  const [form, setForm] = useState<BeetlPatch>(initialFormState);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  function handleReset() {
    setForm(initialFormState);
    formRef.current?.reset();
  }
  const queryClient = useQueryClient();
  const patchBeetlMutation = useMutation(() => patchBeetl(form), {
    onSuccess: (data) => {
      queryClient.invalidateQueries(["beetl", beetl.obfuscation, beetl.slug]);
      initialFormState = { ...data, secretkey };
      setForm(initialFormState);
      setShowSuccessMessage(true);
    },
  });
  function handleSubmit() {
    patchBeetlMutation.mutate();

    formRef.current?.reset();
  }
  return (
    <>
      {showSuccessMessage && (
        <ModalSuccess setShowSuccessMessage={setShowSuccessMessage} />
      )}
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="p-1 space-y-5"
      >
        <div className="flex justify-between">
          <h1 className="text-xl font-semibold items-center hover:cursor-pointer hover:text-primary-dark">
            Edit
          </h1>
          {isEqual(initialFormState, form) ? (
            <Button
              label="placeholder"
              onClick={() => {}}
              className="invisible"
            />
          ) : (
            <div>
              <Button label="Save Changes" onClick={handleSubmit} />
              <Button
                label="Cancel"
                onClick={handleReset}
                type="button"
                secondary
              />
            </div>
          )}
        </div>
        <InputBox
          label="Title"
          placeholder="Title"
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <InputBoxLabel label="Description">
          <textarea
            value={form.description}
            placeholder="Description"
            className="px-3 border-b-2 border-l rounded-bl max-h-min"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </InputBoxLabel>
        <InputBox
          label="Target Goal"
          placeholder="Target"
          type="number"
          value={form.target}
          onChange={(e) => setForm({ ...form, target: Number(e.target.value) })}
        />
        <InputBoxLabel label="Calculation Method">
          <select
            value={form.method}
            onChange={(e) => setForm({ ...form, method: e.target.value })}
          >
            <option value="percentage">percentage</option>
            <option value="stepwise">stepwise</option>
          </select>
        </InputBoxLabel>
        <InputBoxLabel label="Public Beetl">
          <select
            value={form.beetlmode}
            // @ts-ignore
            onChange={(e) => setForm({ ...form, beetlmode: e.target.value })}
          >
            <option value="public">public</option>
            <option value="private">private</option>
          </select>
        </InputBoxLabel>
        <div className="flex justify-between">
          <p className="text-sm">created {timefmt(beetl.created)}</p>
          <p className="text-sm">last edited {timefmt(beetl.updated)}</p>
        </div>
      </form>
    </>
  );
}

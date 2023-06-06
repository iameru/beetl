import { BeetlGetResponse, BeetlPatch } from "@/types";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

type props = {
  beetl: BeetlGetResponse;
  secretkey: string;
};
export default function BeetlUpdateForm({ beetl, secretkey }: props) {
  const initialFormState = { ...beetl, secretkey };
  const [form, setForm] = useState<BeetlPatch>({ ...beetl, secretkey });

  return (
    <form className="p-1 space-y-2">
      <h1 className="text-xl font-semibold flex items-center hover:cursor-pointer hover:text-primary-dark">
        <PencilSquareIcon className="h-5 w-5 inline-block" />
        Edit
      </h1>

      <pre>{JSON.stringify(form, null, 2)}</pre>

      <div
        className={clsx("px-1 py-0.5 hover:highlight-area", "flex flex-col")}
      >
        <p>title</p>
        <input
          type="text"
          value={beetl.title}
          className=""
          placeholder="title"
        />
      </div>

      <p>title: {beetl.title}</p>
      <p>description: {beetl.description}</p>
      <p>target: {beetl.target}</p>
      <p>method: {beetl.method}</p>
      <p>beetlmode: {beetl.beetlmode}</p>
      <p className="text-sm">last edited {beetl.updated}</p>
    </form>
  );
}

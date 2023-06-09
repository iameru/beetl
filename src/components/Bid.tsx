import { BeetlGetResponse, GetBid } from "@/types";
import clsx from "clsx";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import BidForm from "./BidForm";

type Props = {
  bid: GetBid;
  selected: Boolean;
  setSelected: Function;
  beetl: BeetlGetResponse;
};
export default function Bid({ bid, selected, setSelected, beetl }: Props) {
  const [hovered, setHovered] = useState(false);
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <tr
        key={bid.id}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() =>
          setSelected(() => {
            if (selected) return "";
            return bid.id;
          })
        }
        className={clsx(
          "font-medium cursor-default hover:underline",
          selected && "underline"
        )}
      >
        <td className="flex gap-1">
          <PencilSquareIcon
            aria-label="edit this entry"
            className={clsx(
              "h-5 w-5 inline-block rounded hover:bg-secondary cursor-pointer",
              !hovered && !selected && "invisible"
            )}
            onClick={() => setEditMode((prev) => !prev)}
          />
          {bid.name}
        </td>
        <td className="text-signal-min">{bid.min}</td>
        <td className="text-signal-mid">{bid.mid}</td>
        <td className="text-signal-max">{bid.max}</td>
      </tr>
      {editMode && (
        <tr>
          <td colSpan={4} className="p-0">
            <BidForm
              beetl={beetl}
              type="edit"
              visibilityToggle={() => setEditMode(false)}
              bid={bid}
            />
          </td>
        </tr>
      )}
    </>
  );
}

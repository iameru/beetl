import { BidResponse } from "@/types";
import clsx from "clsx";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import {useState} from "react";

type Props = {
  bid: BidResponse;
  selected: Boolean;
  setSelected: Function;
};
export default function Bid({ bid, selected, setSelected }: Props) {

  const [hovered, setHovered] = useState(false);

  return (
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
      className={clsx("font-medium cursor-default hover:underline", selected && "underline")}
    >
      <td className="flex gap-1">
        <PencilSquareIcon aria-label="edit this entry" className={clsx("h-5 w-5 inline-block rounded hover:bg-secondary cursor-pointer", !hovered && "invisible")} />
        {bid.name}
      </td>
      <td className="text-signal-min">{bid.min}</td>
      <td className="text-signal-mid">{bid.mid}</td>
      <td className="text-signal-max">{bid.max}</td>
    </tr>
  );
}

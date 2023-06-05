import { useBids } from "@/hooks/requests";
import clsx from "clsx";
import Loading from "./Loading";
import { useState } from "react";
import Button from "./Button";
import { BeetlGetResponse } from "@/types";
import BidForm from "./BidForm";
import Bid from "./Bid";

type props = {
  beetl: BeetlGetResponse;
};
export default function Bids({ beetl }: props) {
  const [showAddBid, setShowAddBid] = useState(false);
  const [selectedBid, setSelectedBid] = useState<string>("");
  const { isLoading, isError, data } = useBids(beetl.obfuscation, beetl.slug);

  if (isLoading) return <Loading />;
  if (isError) return <p>error</p>;

  return (
    <>
      <Button
        onClick={() => setShowAddBid((prev) => !prev)}
        label="add your bid"
        className={clsx(showAddBid && "invisible")}
      />
      {showAddBid && (
        <BidForm
          beetl={beetl}
          visibilityToggle={() => setShowAddBid((p) => !p)}
          type="new"
        />
      )}
      <table className="table table-auto border-collapse px-2 w-full">
        <thead className="font-normal">
          <tr>
            <th>name</th>
            <th>min</th>
            <th>mid</th>
            <th>max</th>
          </tr>
        </thead>
        <tbody>
          {data.bids?.map((bid) => {
            return <Bid
              key={bid.id}
              bid={bid}
              beetl={beetl}
              selected={(bid.id === selectedBid)}
              setSelected={setSelectedBid}
            />
          }
          )}
        </tbody>
      </table>
    </>
  );
}

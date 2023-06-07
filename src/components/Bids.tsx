import { useBeetl, useBids } from "@/hooks/requests";
import clsx from "clsx";
import Loading from "./Loading";
import { useState } from "react";
import Button from "./Button";
import { BeetlGetResponse } from "@/types";
import BidForm from "./BidForm";
import Bid from "./Bid";
import { timefmt } from "@/utils";

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
    <main className="flex flex-col gap-4">
      <section className="flex flex-col px-2 gap-2">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold">{beetl.title}</h2>
          <div
            className={clsx(
              beetl.beetlmode == "public" ? "bg-success" : "bg-warning",
              "bg-opacity-30 px-2 rounded"
            )}
          >
            {beetl.beetlmode}
          </div>
        </div>
        <p className="text-sm">{beetl.description}</p>
        <div>
          <p>
            gesammelt werden{" "}
            <span className="bg-black rounded px-1 bg-opacity-5 text-primary-dark">
              {beetl.target}
            </span>
          </p>
          <p>
            Calculation Method:
            <span className="bg-black rounded px-1 bg-opacity-5 text-primary-dark">
              {beetl.method}
            </span>
          </p>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">created {timefmt(beetl.created)}</p>
          <p className="text-sm">last edited {timefmt(beetl.updated)}</p>
        </div>
      </section>

      <Button
        onClick={() => setShowAddBid((prev) => !prev)}
        label="add your bid!"
        className={clsx(showAddBid && "invisible", "w-2/5 min-w-min self-end")}
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
            return (
              <Bid
                key={bid.id}
                bid={bid}
                beetl={beetl}
                selected={bid.id === selectedBid}
                setSelected={setSelectedBid}
              />
            );
          })}
        </tbody>
      </table>
    </main>
  );
}

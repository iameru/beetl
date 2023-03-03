import { createBid, useBids } from "@/hooks/requests";
import clsx from "clsx";
import Loading from "./Loading";
import { useState } from "react";
import Button from "./Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BeetlResponse, PostBid } from "@/types";

type props = {
  beetl: BeetlResponse;
};
export default function Bids({ beetl }: props) {
  const [addBid, setAddBid] = useState(false);
  const [newBid, setNewBid] = useState<PostBid>({ beetl: beetl.id });
  const [selectedBid, setSelectedBid] = useState<string>();
  const { isLoading, isError, bids } = useBids(beetl.id);

  const queryClient = useQueryClient();

  if (isLoading) return <Loading />;
  if (isError) return <p>error</p>;

  const mutation = useMutation(() => createBid(newBid), {
    onSuccess: () => {
      queryClient.invalidateQueries(["bids", beetl.id]);
      setNewBid({ beetl: beetl.id });
      setAddBid(false);
    },
  });

  function submitBid() {
    mutation.mutate();
  }

  return (
    <>
      <Button
        onClick={() => setAddBid((prev) => !prev)}
        label="add your bid"
        className={clsx(addBid && "invisible")}
      />
      {addBid && (
        <form className="absolute left-0 right-0 -mt-7 bg-secondary-light z-10 px-1 py-2 mx-4 grid grid-cols-12 border rounded border-primary-light focus-within:border-primary-dark">
          <input
            type="text"
            className="w-full focus:outline-none focus:font-semibold col-span-8 bg-secondary-light"
            value={newBid.name}
            placeholder="name"
            onChange={(e) =>
              setNewBid((prev) => ({ ...prev, name: e.target.value }))
            }
            required
          />
          <button
            className="col-start-12 text-black text-center hover:cursor-pointer px-2"
            onClick={() => setAddBid((prev) => !prev)}
          >
            hide
          </button>
          <input
            type="number"
            className="w-full focus:outline-none focus:font-semibold text-signal-min col-span-3 bg-secondary-light"
            placeholder="min"
            value={newBid.min}
            onChange={(e) =>
              setNewBid((prev) => ({ ...prev, min: Number(e.target.value) }))
            }
            required
          />
          <input
            type="number"
            className="w-full focus:outline-none focus:font-semibold text-signal-mid col-span-3 bg-secondary-light"
            placeholder="mid"
            value={newBid.mid}
            onChange={(e) =>
              setNewBid((prev) => ({ ...prev, mid: Number(e.target.value) }))
            }
            required
          />
          <input
            type="number"
            className="w-full focus:outline-none focus:font-semibold text-signal-max col-span-3 bg-secondary-light"
            placeholder="max"
            value={newBid.max}
            onChange={(e) =>
              setNewBid((prev) => ({ ...prev, max: Number(e.target.value) }))
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
          {bids?.map((bid) => (
            <tr
              key={bid.id}
              onClick={() =>
                setSelectedBid((prev) => {
                  if (prev === bid.id) return undefined;
                  return bid.id;
                })
              }
              className={clsx(
                "font-medium hover:underline",
                selectedBid === bid.id && "underline"
              )}
            >
              <td>{bid.name}</td>
              <td className="text-signal-min">{bid.min}</td>
              <td className="text-signal-mid">{bid.mid}</td>
              <td className="text-signal-max">{bid.max}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

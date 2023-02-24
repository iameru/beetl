import { useBids } from "@/hooks/requests";
import Loading from "./Loading";

type props = {
  beetlId: string;
};
export default function Bids({ beetlId }: props) {
  const { isLoading, isError, bids } = useBids(beetlId);

  if (isLoading) return <Loading />;
  if (isError) return <p>error</p>;

  return (
    <div className="px-10">
      {bids?.map((bid) => <div key={bid.id} className="flex">
        <p>name: {bid.name}</p>
        <p>updated: {bid.updated}</p>
        <p>min: {bid.min}</p>
        <p>mid: {bid.mid}</p>
        <p>max: {bid.max}</p>
    </div>
      )}
    </div>
  );
}

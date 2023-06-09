import { checkSecretKey } from "@/hooks/requests";
import { GetBid } from "@/types";
import { useState } from "react";
import Button from "./Button";
import { InputBox } from "./Input";

type props = {
  bid: GetBid;
  setSecretKey: Function;
  cancel: () => void;
};

export default function AskForSecretKeyBid({
  bid,
  setSecretKey,
  cancel,
}: props) {
  const [stateSecretKey, setStateSecretKey] = useState("");
  const [tryAgain, setTryAgain] = useState(false);

  async function handleSubmit() {
    const response = await checkSecretKey(bid.id, stateSecretKey);
    if (response.status == "success") {
      setSecretKey(stateSecretKey);
    } else {
      setTryAgain(true);
    }
  }
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Hey {bid.name}</h2>
      <p>
        to edit your bid, you'll need to enter the secret given to you earlier
      </p>
      <div className="flex flex-col gap-2">
        <InputBox
          type="text"
          placeholder="Secret Key"
          label="Secret Key"
          value={stateSecretKey}
          onChange={(e) => setStateSecretKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <div className="self-end flex">
          {tryAgain && (
            <div className="px-2 py-1 flex justify-center items-center border-l-2 border-b-2 border-dotted rounded border-warning">
              thats not the correct secret
            </div>
          )}
          <Button secondary label="cancel" onClick={cancel} />
          <Button label="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </section>
  );
}

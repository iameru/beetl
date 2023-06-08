import { useState } from "react";
import Button from "./Button";

type props = {
  setSecretKey: Function;
}

export default function AskForSecretKeyBid({ setSecretKey }: props) {

  const [stateSecretKey, setStateSecretKey] = useState("");

  function handleSubmit() {
    setSecretKey(stateSecretKey);
  }
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Secret</h2>
      <p>
        to edit this entry you need to enter the secret given to you earlier
      </p>
      <div className="flex gap-2">
      <input 
        type="text" 
        name="secretkey" 
        className="w-full border rounded-lg px-2"
        placeholder="secret key"
        value={stateSecretKey}
        onChange={(e) => setStateSecretKey(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
      />
        <Button label="Go" 
          onClick={handleSubmit}
        />
      </div>
    </section>
  );
}

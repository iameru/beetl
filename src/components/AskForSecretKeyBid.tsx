import { useState } from "react";
import Button from "./Button";
import {InputBox} from "./Input";

type props = {
  setSecretKey: Function;
  cancel: () => void;
}

export default function AskForSecretKeyBid({ setSecretKey, cancel }: props) {

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
      <div className="flex flex-col gap-2">

        <InputBox
          type="text"
          placeholder="Secret Key"
          label="Secret Key"
          value={stateSecretKey}
          onChange={(e) => setStateSecretKey(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <div className="self-end">
        <Button secondary label='cancel' onClick={cancel} />
        <Button label="Submit" 
          onClick={handleSubmit}
        />
        </div>
      </div>
    </section>
  );
}

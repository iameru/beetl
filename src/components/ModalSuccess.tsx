import clsx from "clsx";
import { useEffect } from "react";
import ModalTemplate from "./ModalTemplate";

type props = {
  setShowSuccessMessage: (value: boolean) => void;
};
export default function ModalSuccess({ setShowSuccessMessage }: props) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSuccessMessage(false);
    }, 666);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <ModalTemplate>
      <div
        className={clsx(
          "p-4 bg-success rounded",
          "mx-4",
          "md:w-1/3",
          "flex flex-col justify-center gap-4"
        )}
      >
        <h1 className="text-2xl text-center font-semibold">Success :)</h1>
      </div>
    </ModalTemplate>
  );
}

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
    <ModalTemplate
      innerClassName={clsx(
        "p-4 bg-success bg-opacity-80 rounded",
        "mx-4",
        "md:w-1/3",
        "flex flex-col justify-center gap-4"
      )}
    >
      <h1 className="text-xl text-center">Success :)</h1>
    </ModalTemplate>
  );
}

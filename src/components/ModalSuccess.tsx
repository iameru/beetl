import clsx from "clsx";
import { useEffect } from "react";

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
    <div
      className={clsx(
        "bg-black",
        "bg-opacity-10",
        "absolute w-screen h-screen top-0 left-0 min-w-screen min-h-screen",
        "flex flex-col justify-center items-center"
      )}
    >
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
    </div>
  );
}

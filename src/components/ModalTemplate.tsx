import clsx from "clsx";

type props = {
  children: React.ReactNode;
  className?: string;
}

export default function ModalTemplate({ children, className }: props) {
  return (
    <div
      className={clsx(
        "bg-black",
        "bg-opacity-10",
        "absolute w-screen h-screen top-0 left-0 min-w-screen min-h-screen",
        className ? className : "flex flex-col justify-center items-center"
      )}
    >
      {children}
    </div>
  );
}

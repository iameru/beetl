import clsx from "clsx";

type props = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

export default function ModalTemplate({
  children,
  className,
  innerClassName,
}: props) {
  return (
    <div
      className={clsx(
        "bg-black",
        "bg-opacity-10",
        "absolute w-screen h-screen top-0 left-0 min-w-screen min-h-screen",
        className ? className : "flex flex-col justify-center items-center"
      )}
    >
      <div
        className={clsx(
          innerClassName
            ? innerClassName
            : "border rounded border-primary-light px-4 py-2 bg-white mx-4",
        )}
      >
        {children}
      </div>
    </div>
  );
}

import clsx from "clsx";
import {useRef} from "react";

type props = {
  hint: string;
  children?: JSX.Element;
};

export default function HighlightHint({ hint, children }: props) {
  // {element}
  const ref = useRef<HTMLDivElement>(null)

  return (
    <div
      onClick={() => {
        ref.current?.classList.toggle("invisible");
        ref.current?.classList.toggle("opacity-100");
        ref.current?.classList.toggle("min-w-auto");
      }}
      className="inline-block relative group cursor-pointer self-center"
    >
      {children}
      <span
        ref={ref}
        className={clsx(
          "absolute bg-black text-white",
          "text-xs rounded",
          "top-full left-0",
          "opacity-0 transition-opacity invisible",
          "transform -translate-x-1/2 -translate-y-2",
          "group-hover:opacity-100 group-hover:visible group-hover:min-w-auto",
          "p-1"
        )}
      >
        {hint}
      </span>
    </div>
  );
}

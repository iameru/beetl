import clsx from "clsx";

type Props = {
  label: string
  onClick?: () => void
  secondary?: boolean
  className?: string
  type?: "button" | "submit"
}


export default function Button({ label, onClick, secondary, className, type }: Props) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={clsx("px-4 py-2 rounded-lg",
      secondary ? "bg-secondary-light hover:bg-secondary" : "bg-primary hover:bg-primary-dark text-white",
      className
      )}
    >
      {label}
    </button>
  );
}

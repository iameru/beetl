import clsx from "clsx";

type Props = {
  label: string
  onClick?: () => void
  secondary?: boolean
}

export default function Button({ label, onClick, secondary }: Props) {
  return (
    <button
      onClick={onClick}
      className={clsx("px-4 py-2 rounded-lg",
      secondary ? "bg-secondary-light hover:bg-secondary" : "bg-primary hover:bg-primary-dark text-white"
      )}
    >
      {label}
    </button>
  );
}

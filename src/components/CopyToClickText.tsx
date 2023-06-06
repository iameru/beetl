import { ClipboardDocumentListIcon } from "@heroicons/react/20/solid";

type props = {
  text: string;
};

export default function CopyToClick({ text }: props) {
  return (
    <div
      className="bg-black text-white p-2 relative min-h-max break-all text-sm group hover:cursor-pointer"
      onClick={() => navigator.clipboard.writeText(text)}
      aria-label="copy to clipboard"
    >
      {text}
      <ClipboardDocumentListIcon
        className="h-7 absolute bg-primary-light text-black top-0 right-0 p-1 rounded-bl group-hover:h-9"
      />
    </div>
  );
}

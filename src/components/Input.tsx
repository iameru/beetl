import clsx from "clsx";

export function InputBoxLabel({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className={clsx("px-1 py-0.5", "flex flex-col")}>
      <span className="bg-black bg-opacity-10 w-1/3 rounded-tr px-1">
        {label}
      </span>
      {children}
    </label>
  );
}
type InputBoxProps = {
  label: string;
  placeholder: string;
  type: "text" | "number";
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
export function InputBox({
  type,
  value,
  label,
  placeholder,
  onChange,
  onKeyDown

}: InputBoxProps) {
  return (
    <InputBoxLabel label={label}>
      <input
        type={type}
        value={value}
        className="px-3 border-b-2 border-l rounded-bl"
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </InputBoxLabel>
  );
}

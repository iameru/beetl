import Link from "next/link";
import LocaleSwitch from "./localeSwitch";

export default function Header() {
  return (
    <header className="w-full flex justify-between">
      <Link href="/" className="text-2xl font-semibold">
        Beetl
      </Link>
      <LocaleSwitch />
    </header>
  );
}

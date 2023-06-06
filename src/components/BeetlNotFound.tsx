import Link from "next/link";
import Button from "./Button";

export default function BeetlNotFound() {
  return (
    <div className="flex flex-col py-10 px-2 justify-center items-center w-full h-full">
      <h2>beetl not found..</h2>
      <Link href="/">
        <Button label="create Beetl" />
      </Link>
    </div>
  );
}


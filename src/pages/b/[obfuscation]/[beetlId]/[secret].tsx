import { useRouter } from "next/router";
import CopyToClick from "@/components/CopyToClickText";
import config from "beetl.config";
import Link from "next/link";

export default function EditBeetlView() {
  const router = useRouter();
  const secret = router.query.secret as string;
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded bg-black bg-opacity-10 p-1 space-y-2">
        <p className="text-sm">
          In this screen you or anyone with the link can edit or delete your
          beetl You only get here with the following link! Please copy it
          somewhere before proceeding
        </p>
        <CopyToClick text={config.domainName + router.asPath} />
      </div>
      <Link className="link" href={router.asPath.replace(secret, "")}>
        click here to go to your beetl
      </Link>
      <h1 className="text-xl font-semibold">Edit</h1>
      <p className="text-sm">
        lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      </p>
    </div>
  );
}

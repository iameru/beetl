import { useRouter } from "next/router";
import CopyToClick from "@/components/CopyToClickText";
import config from "beetl.config";
import Link from "next/link";
import { useBeetl } from "@/hooks/requests";
import Loading from "@/components/Loading";
import BeetlNotFound from "@/components/BeetlNotFound";
import { PencilSquareIcon } from "@heroicons/react/20/solid";

export default function EditBeetlView() {
  const router = useRouter();
  const beetlSlug = router.query.beetlId as string;
  const obfuscation = router.query.obfuscation as string;
  const secret = router.query.secret as string;
  const { isLoading, isError, beetl } = useBeetl(obfuscation, beetlSlug);

  if (isLoading) return <Loading />;
  if (isError) return <BeetlNotFound />;
  if (!beetl) return <BeetlNotFound />;

  return (
    <div className="flex flex-col gap-4">
      <div className="highlight-area p-1 space-y-2">
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
      <div className="hover:highlight-area p-1 space-y-2">
        <h1 className="text-xl font-semibold flex items-center hover:cursor-pointer hover:text-primary-dark">
          <PencilSquareIcon className="h-5 w-5 inline-block" />
          Edit
        </h1>
        <p>title: {beetl.title}</p>
        <p>description: {beetl.description}</p>
        <p>target: {beetl.target}</p>
        <p>method: {beetl.method}</p>
        <p>beetlmode: {beetl.beetlmode}</p>
        <p className="text-sm">last edited {beetl.updated}</p>
      </div>
    </div>
  );
}

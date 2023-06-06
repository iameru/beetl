import { useRouter } from "next/router";
import CopyToClick from "@/components/CopyToClickText";
import config from "beetl.config";
import Link from "next/link";
import { useBeetl } from "@/hooks/requests";
import Loading from "@/components/Loading";
import BeetlNotFound from "@/components/BeetlNotFound";
import BeetlUpdateForm from "@/components/BeetlUpdateForm";

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
      <BeetlUpdateForm beetl={beetl} secretkey={secret} />
    </div>
  );
}

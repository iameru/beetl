import Bids from "@/components/Bids";
import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { useBeetl } from "@/hooks/requests";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BeetlView() {
  const router = useRouter();
  const beetlSlug = router.query.beetlId as string;
  const obfuscation = router.query.obfuscation as string;

  const { isLoading, isError, beetl } = useBeetl(obfuscation, beetlSlug);

  if (isLoading) return <Loading />;
  if (isError) return <BeetlNotFound />;
  if (!beetl) return <BeetlNotFound />;

  return (
    <div>
      <Bids beetl={beetl} />
    </div>
  );
}

function BeetlNotFound() {
  return (
    <div className="flex flex-col py-10 px-2 justify-center items-center w-full h-full">
      <h2>beetl not found..</h2>
      <Link href="/">
        <Button label="create Beetl" />
      </Link>
    </div>
  );
}

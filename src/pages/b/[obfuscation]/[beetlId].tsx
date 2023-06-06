import BeetlNotFound from "@/components/BeetlNotFound";
import Bids from "@/components/Bids";
import Loading from "@/components/Loading";
import { useBeetl } from "@/hooks/requests";
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
    <Bids beetl={beetl} />
  );
}


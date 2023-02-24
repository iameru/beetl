import Button from "@/components/Button";
import Loading from "@/components/Loading";
import { useBeetl } from "@/hooks/requests";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BeetlView() {
  const router = useRouter();
  const beetlSlug = router.query.beetlId;

  const { isLoading, isError, beetl } = useBeetl(
    beetlSlug as string
  );

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <div className="flex flex-col py-10 px-2 justify-center items-center w-full h-full">
        <h2>beetl not found..</h2>
        <Link href="/">
          <Button label="create Beetl" />
        </Link>
      </div>
    );
  }
  console.log(beetl)

  return (
    <div>
      <p>calculationType: {beetl?.calculationType}</p>
      <p>created: {beetl?.created}</p>
      <p>description: {beetl?.description}</p>
      <p>target value: {beetl?.target}</p>
      <p>slug: {beetl?.slug}</p>
      <p>title: {beetl?.title}</p>
      <p>updated: {beetl?.updated}</p>
    </div>
  );
}

import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Button from "@/components/Button";
import BeetlInput from "@/components/BeetlInput";
import { useEffect, useState } from "react";
import { randomUrl } from "@/utils";
import { PostBeetl } from "@/types";
import { createBeetl } from "@/hooks/requests";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";

type Props = {};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "de", ["home", "common"])),
  },
});

export default function Index({}: Props) {
  const { t } = useTranslation();
  const router = useRouter();

  const [hydrated, setHydrated] = useState(false);
  const [beetlData, setBeetlData] = useState<PostBeetl>({
    slug: "",
    obfuscation: "",
    calculationType: "percentage",
  });

  useEffect(() => {
    if (hydrated) return;
    setBeetlData((prev: PostBeetl) => ({
      ...prev,
      slug: randomUrl(10),
      obfuscation: randomUrl(5),
    }));
    setHydrated(true);
  }, []);

  const mutation = useMutation(() => createBeetl(beetlData));

  if (mutation.status == "loading") return <Loading />;
  if (mutation.status == "error") {
    // give user some feedback to try again
  }
  if (mutation.status == "success") {
    router.push(`/b/${mutation.data.obfuscation}/${mutation.data.slug}`);
  }

  return (
    <div className="grid grid-flow-row grid-rows-2 w-full h-full min-h-full py-10">
      <p className="w-4/5">{t("home:greetingText")}</p>
      <div className="flex flex-col gap-5 max-w-full w-full">
        <BeetlInput state={beetlData} setState={setBeetlData} />
        <div className="flex flex-col items-end">
          <p className="text-secondary-dark">{t("home:createHint")}</p>
          <div className="flex gap-1">
            <Button
              label={t("home:buttonOptions")}
              secondary={true}
              onClick={() => {}}
            />
            <Button
              label={t("home:buttonCreate")}
              onClick={async (event: React.ChangeEvent) => {
                console.log(beetlData);
                mutation.mutate();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

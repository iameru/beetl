import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Button from "@/components/Button";
import { useEffect, useState } from "react";
import { randomUrl, saneUrl } from "@/utils";
import { BeetlPost } from "@/types";
import { createBeetl } from "@/hooks/requests";
import { useMutation } from "@tanstack/react-query";
import Loading from "@/components/Loading";
import { useRouter } from "next/router";
import appConfig from "beetl.config";

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
  const [beetlData, setBeetlData] = useState<BeetlPost>({
    slug: "",
    obfuscation: "",
    method: "percentage",
    beetlmode: "public",
  });

  useEffect(() => {
    if (hydrated) return;
    setBeetlData((prev: BeetlPost) => ({
      ...prev,
      slug: randomUrl(10),
      obfuscation: randomUrl(5),
    }));
    setHydrated(true);
  }, [hydrated]);

  const mutation = useMutation(() => createBeetl(beetlData));

  if (mutation.status == "loading") return <Loading />;
  if (mutation.status == "error") {
    // give user some feedback to try again
  }
  if (mutation.status == "success") {
    router.push(`/b/${mutation.data.obfuscation}/${mutation.data.slug}`);
  }

  function handleCreateBeetl() {
    mutation.mutate();
  }
  return (
    <div className="grid grid-flow-row grid-rows-2 w-full h-full min-h-full py-10">
      <p className="w-4/5">{t("home:greetingText")}</p>
      <div className="flex flex-col gap-5 max-w-full w-full">
        <div className="flex focus-within:border-primary-dark text-secondary-dark border border-secondary rounded-md py-2 px-2 w-full justify-center">
          <span className="text-secondary">
            {appConfig.domainName}/b/{beetlData.obfuscation}/
          </span>
          <input
            className="flex-shrink-0 w-1/2 min-w-0 focus:outline-none"
            onChange={(event) => {
              const newUrl = saneUrl(event.target.value);
              setBeetlData((prev: BeetlPost) => ({
                ...prev,
                slug: newUrl,
                obfuscation: randomUrl(5),
              }));
            }}
            onKeyUp={(event) => {
              if (event.key == "Enter") {
                handleCreateBeetl();
              }
            }}
            maxLength={40}
            type="text"
            value={beetlData.slug}
          />
        </div>

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
              onClick={() => {
                handleCreateBeetl();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

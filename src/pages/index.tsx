import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Button from "@/components/Button";
import BeetlInput from "@/components/BeetlInput";
import { useEffect, useState } from "react";
import { randomUrl } from "@/utils";

type Props = {};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "de", ["home", "common"])),
  },
});

export default function Index({}: Props) {
  const { t } = useTranslation();

  const [beetlUrl, setBeetlUrl] = useState("");
  const [urlRandomizer, setUrlRandomizer] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (hydrated) return;
    setUrlRandomizer(randomUrl(5));
    setBeetlUrl(randomUrl(10));
    setHydrated(true);
  }, []);

  return (
    <div className="grid grid-flow-row grid-rows-2 w-full h-full min-h-full py-10">
      <p className="w-4/5">{t("home:greetingText")}</p>
      <div className="flex flex-col gap-5 max-w-full w-full">
        <BeetlInput
          beetlUrl={beetlUrl}
          setBeetlUrl={setBeetlUrl}
          urlRandomizer={urlRandomizer}
          setUrlRandomizer={setUrlRandomizer}
        />
        <div className="flex flex-col items-end">
          <p className="text-secondary-dark">{t("home:createHint")}</p>
          <div className="flex gap-1">
            <Button
              label={t("home:buttonOptions")}
              secondary={true}
              onClick={() => {}}
            />
            <Button label={t("home:buttonCreate")} onClick={() => {}} />
          </div>
        </div>
      </div>
    </div>
  );
}

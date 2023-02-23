import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = {};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "de", ["home", "common"])),
  },
});

export default function Index(props: Props) {
  const { t } = useTranslation();

  return (
    <div className="flex-1">
      <p>Home</p>
      <p>{t("common:appname")} von common</p>
      <h2 className="bg-yellow-50 p-10 text-4xl">{t("home:testFromHome")}</h2>
    </div>
  );
}

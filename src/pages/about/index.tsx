import { useTranslation } from "react-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = {};

export default function About() {
  const { t } = useTranslation("common");

  console.log(t);
  return (
    <div className="flex-1">
      <p>About</p>
      <h2>{t("testString")}</h2>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";


type Props = {}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'de', ["about"])),
  },
});

export default function About(props:Props) {
  const { t } = useTranslation("about");


  return (
    <div className="flex-1">
      <p>About</p>
      <h2 className="bg-yellow-50 p-10 text-4xl">{t("testString")}</h2>
    </div>
  );
}


import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

type Props = {};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "de", ["about"])),
  },
});

export default function About(props: Props) {
  const { t, ready } = useTranslation("about");

  if (!ready) return <div>loading</div>;

  const infoBlocks: InfoProps[] = t("infoBlocks", { returnObjects: true });

  console.log(infoBlocks);

  return (
    <div className="grid grid-flow-row flex-1 py-10 gap-6">
      {infoBlocks.map((block: any) => (
        <InfoBlock title={block.title} text={block.text} />
      ))}
    </div>
  );
}

type InfoProps = { title: string; text: string };

function InfoBlock({ title, text }: InfoProps) {
  return (
    <div className="space-y-1">
      <h2 className="font-semibold text-xl">{title}</h2>
      <p>{text}</p>
    </div>
  );
}

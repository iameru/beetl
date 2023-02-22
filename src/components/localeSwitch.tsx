import { useRouter } from "next/router";
import { i18n } from "../../next-i18next.config";
import { LanguageIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import clsx from "clsx";

export default function LocaleSwitch() {
  const router = useRouter();
  function changeLocale(chosenLocale: string) {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: chosenLocale });
  }

  const [showLanguages, setShowLanguages] = useState(false);

  return (
    <div className="flex gap-2">
      {showLanguages && (
        <>
          {i18n.locales.map((locale) => {
            return (
              <button
                className={clsx("text-sm rounded p-1 px-2",
                              router.locale === locale ? "bg-slate-900 text-white" : "hover:bg-neutral-200")}
                key={locale}
                onClick={() => changeLocale(locale)}
              >
                {locale}
              </button>
            );
          })}
        </>
      )}
      <button className={clsx("text-sm hover:bg-neutral-200 rounded p-1", showLanguages && "bg-neutral-200")} onClick={() => setShowLanguages((c) => !c)}>
        <LanguageIcon className="h-6" />
      </button>
    </div>
  );
}

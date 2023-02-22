import { useRouter } from "next/router";
import { i18n } from "../../next-i18next.config";
import { LanguageIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

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
                className="text-sm hover:bg-slate-400"
                key={locale}
                onClick={() => changeLocale(locale)}
              >
                {locale}
              </button>
            );
          })}
        </>
      )}
      <button className="text-sm" onClick={() => setShowLanguages((c) => !c)}>
        <LanguageIcon className="h-6" />
      </button>
    </div>
  );
}

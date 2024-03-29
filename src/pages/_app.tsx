import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import Header from "@/components/Header";

import { appWithTranslation } from "next-i18next";

import { Work_Sans } from "@next/font/google";

import { i18n as i18nConfig } from "next-i18next.config";
import appConfig from "beetl.config";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const font = Work_Sans({ subsets: ["latin"] });

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${font.style.fontFamily};
        }
      `}</style>
      <Head>
        <title>beetl</title>
        <meta name="description" content="equalize finances, bid together" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {i18nConfig.locales.map((locale) => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={`${appConfig.domainName}/${locale}${router.asPath}`}
          />
        ))}
      </Head>
      <div className="px-5 py-5 h-screen w-screen transition-all ease-in-out">
        <QueryClientProvider client={queryClient}>
          {appConfig.DEV && <ReactQueryDevtools initialIsOpen={false} />}
          <div className="flex flex-col gap-4 w-full h-full min-h-full justify-between">
            <Header />
            <div className="flex-1 px-1 shrink-0 h-min w-full">
              <Component {...pageProps} />
            </div>
            <footer className="w-full min-h-fit mb-4">
              {router.pathname === "/about" ? (
                <Link href="/" className="flex items-center">
                  <ChevronLeftIcon aria-label="Go Back" className="h-8" />{" "}
                  Create a Beetl
                </Link>
              ) : (
                <Link href="/about">About</Link>
              )}
            </footer>
          </div>
        </QueryClientProvider>
      </div>
    </>
  );
}

export default appWithTranslation(App);

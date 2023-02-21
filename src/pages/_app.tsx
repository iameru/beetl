import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>beetl</title>
        <meta name="description" content="equalize finances" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="px-8 py-5 h-screen w-screen">
        <div className="flex flex-col gap-4 w-full min-h-full justify-between">
          <header className="w-full"><Link href="/">Beetl</Link></header>
          <Component {...pageProps} />
          <footer className="w-full">
            {router.pathname === "/about" ? (
              <Link href="/">Create a Beetl</Link>
            ) : (
              <Link href="/about">About</Link>
            )}
          </footer>
        </div>
      </div>
    </>
  );
}

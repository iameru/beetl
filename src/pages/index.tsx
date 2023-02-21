import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>beetl</title>
        <meta name="description" content="equalize finances" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-purple-900 border m-10 w-screen">
        <marquee>greetings from main</marquee>
      </main>
    </>
  );
}

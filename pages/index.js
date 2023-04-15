import React from "react";
import Head from "next/head";

import Banner from "@/components/banner/Banner";
import NavBar from "@/components/navbar/NavBar";
import SectionCards from "@/components/card/SectionCards";
import { setURL, dummyFetch, getWatchedTitles } from "@/lib/videos";

import styles from "@/styles/Home.module.css";
import { UseRedirectUser } from "@/util/redirect";

export const getServerSideProps = async (context) => {
  const { userId, jwtToken } = await UseRedirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const watchedList = await getWatchedTitles(userId, jwtToken);

  // const animeList = await setURL("anime%20trailers");
  // const genshinList = await setURL("genshin%20impact");
  // const popularList = await setURL("popular");
  // const productivityList = await setURL("productivity");

  const animeList = dummyFetch();
  const genshinList = dummyFetch();
  const productivityList = dummyFetch();
  const popularList = dummyFetch("popular");

  return {
    props: {
      animeList,
      genshinList,
      productivityList,
      popularList,
      watchedList,
    },
  };
};

export default function Home({
  animeList,
  genshinList,
  productivityList,
  popularList,
  watchedList,
}) {
  return (
    <React.Fragment>
      <Head>
        <title>Nextflix</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavBar />
      <Banner
        title="Kamisato Ayaka"
        subTitle="Hoyoverse"
        imageURL="/static/ayaka.jpg"
        videoId="1_wHgvZyZdk"
      />

      <div className={styles.sectionWrapper}>
        <SectionCards title="Anime Trailers" videos={animeList} size="large" />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCards
          title="Genshin Impact"
          videos={genshinList}
          size="medium"
        />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCards
          title="Popular/Trending"
          videos={popularList}
          size="small"
        />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCards
          title="Productivity"
          videos={productivityList}
          size="small"
        />
      </div>
      <div className={styles.sectionWrapper}>
        <SectionCards
          title="Watch it again"
          videos={watchedList}
          size="small"
        />
      </div>
    </React.Fragment>
  );
}

import React from "react";
import Head from "next/head";

import NavBar from "@/components/navbar/NavBar";
import SectionCards from "@/components/card/SectionCards";

import styles from "@/styles/MyList.module.css";
import { getMyListVideos } from "@/lib/videos";
import useRedirectUser from "@/util/redirect";

export const getServerSideProps = async (context) => {
  const { userId, jwtToken, redirect = null } = await useRedirectUser(context);

  if (redirect) {
    return { redirect };
  }
  ("");

  const watchedVideos = await getMyListVideos(userId, jwtToken);
  return {
    props: {
      watchedVideos,
    },
  };
};

const MyList = ({ watchedVideos }) => {
  return (
    <React.Fragment>
      <Head>
        <title>My List</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
      </main>
      <div className={styles.sectionWrapper}>
        <SectionCards title="My List" videos={ watchedVideos } size="small" />
      </div>
    </React.Fragment>
  );
};

export default MyList;

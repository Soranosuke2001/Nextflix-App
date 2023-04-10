import React from "react";
import Head from "next/head";

import NavBar from "@/components/navbar/NavBar";
import SectionCards from "@/components/card/SectionCards";

import styles from '@/styles/MyList.module.css';

const MyList = () => {
    return (
        <React.Fragment>
            <Head >
                <title>My List</title>
            </Head>
            <main className={styles.main}>
                <NavBar />
            </main>
            <div className={styles.sectionWrapper}>
                <SectionCards title="My List" videos={[]} size="small" />
            </div>
        </React.Fragment>
    );
};

export default MyList;
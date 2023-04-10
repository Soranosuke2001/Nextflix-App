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
            <main>
                <NavBar />
            </main>
            <div>
                <SectionCards title="" videos={[]} size="small" />
            </div>
        </React.Fragment>
    );
};

export default MyList;
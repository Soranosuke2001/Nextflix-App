import Head from "next/head";

import NavBar from "@/components/navbar/NavBar";

import styles from "@/styles/login.module.css";
import React from "react";

const Login = () => {
  const emailSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Signing In");
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Head>
          <title>Nextflix Login</title>
        </Head>
        <header className={styles.header}>
          <NavBar username="" auth="true" />
        </header>
        <main className={styles.main}>
          <div className={styles.mainWrapper}>
            <h1 className={styles.signinHeader}>Sign In</h1>
            <input
              className={styles.emailInput}
              type="text"
              placeholder="Email"
            />
            <p className={styles.userMsg}>Please Enter a Valid Email</p>
            <button className={styles.loginBtn} onClick={emailSubmitHandler}>
              Sign In
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;

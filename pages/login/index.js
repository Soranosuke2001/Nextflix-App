import { useRef, useState } from "react";
import Head from "next/head";

import NavBar from "@/components/navbar/NavBar";

import styles from "@/styles/login.module.css";
import React from "react";

const Login = () => {
    const [invalidEmail, setInvalidEmail] = useState(false);
    const emailInput = useRef(null);

  const emailSubmitHandler = (event) => {
    event.preventDefault();

    const userEmail = emailInput.current.value;

    if (!userEmail.trim().includes('@')) {
        setInvalidEmail(true);
        return;
    } 
    setInvalidEmail(false);
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
              ref={emailInput}
            />
            {invalidEmail && (<p className={styles.userMsg}>Please Enter a Valid Email</p>)}
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

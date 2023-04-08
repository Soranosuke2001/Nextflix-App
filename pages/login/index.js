import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";

import { magicLogin } from "@/lib/magic-client";

import styles from "@/styles/login.module.css";

const Login = () => {
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const emailInput = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleComplete = () => {
      setLoginLoading(false);
    };

    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const emailSubmitHandler = (event) => {
    event.preventDefault();
    setLoginLoading(true);

    const userEmail = emailInput.current.value;

    if (!userEmail.trim().includes("@")) {
      setInvalidEmail(true);
      return;
    }
    setInvalidEmail(false);
    setLoginLoading(false);

    const didToken = magicLogin(userEmail);
    if (didToken) {
      router.push("/");
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Head>
          <title>Nextflix Login</title>
        </Head>
        <header className={styles.header}>
          <div className={styles.wrapper}>
            <a className={styles.logoLink} href="/login">
              <div className={styles.logoWrapper}>
                <Image
                  src="/static/icon/netflix.svg"
                  alt="Netflix Logo"
                  width="128"
                  height="48"
                />
              </div>
            </a>
          </div>
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
            {invalidEmail && (
              <p className={styles.userMsg}>Please Enter a Valid Email</p>
            )}
            <button className={styles.loginBtn} onClick={emailSubmitHandler}>
              {loginLoading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;

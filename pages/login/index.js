import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { mClient } from "@/lib/magic-client";

import styles from "@/styles/Login.module.css";

const Login = () => {
  const [loginLoading, setLoginLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
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

  const userInputChangeHandler = (event) => {
    setErrorMessage("");
    const userInput = event.target.value; 

    console.log(userInput)
    setUserEmail(userInput);
  };

  const signinSubmissionHandler = async (event) => {
    event.preventDefault();
    setLoginLoading(true);

    if (userEmail) {
      if (userEmail.includes('@')) {
        try {
          const didToken = await mClient.auth.loginWithMagicLink({ email: userEmail });

          if (didToken) {
            setLoginLoading(false);
            router.push('/');
          }
        } catch (error) {
          console.log('Error logging the user in: ', error);
          setLoginLoading(false);
        };
      } else {
        setLoginLoading(false);
        setErrorMessage('Please enter a valid email address');
        console.log('Enter a valid email address');
      };
    } else {
      setLoginLoading(false);
      setErrorMessage('Please enter a valid email address');
      console.log('Valid Email was not provided');
    };
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Head>
          <title>Nextflix Login</title>
        </Head>
        <header className={styles.header}>
          <div className={styles.headerWrapper}>
            <a className={styles.logoLink}>
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
              onChange={userInputChangeHandler}
            />
            {errorMessage && (
              <p className={styles.userMsg}>{errorMessage}</p>
            )}
            <button className={styles.loginBtn} onClick={signinSubmissionHandler}>
              {loginLoading ? "Loading..." : "Sign In"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;

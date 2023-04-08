import Head from "next/head";

import NavBar from "@/components/navbar/NavBar";

import styles from "@/styles/login.module.css";

const Login = () => {
    const emailSubmitHandler = () => {
        console.log('Signing In');
    };
    
  return (
    <div>
      <Head>
        <title>Nextflix Login</title>
      </Head>
      <header>
        <NavBar username="" auth="true" />
      </header>
      <main>
        <h1>Sign In</h1>
        <input type="text" placeholder="Email" />
        <button onClick={emailSubmitHandler}>Sign In</button>
      </main>
    </div>
  );
};

export default Login;

import React, { useEffect } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { userInfo } from "@/lib/magic-client";

import styles from "./NavBar.module.css";

const NavBar = (props) => {
  const { auth } = props;

  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { email, publicAddress } = await  userInfo();
      setUsername(email);
    };

    fetchUserInfo();
  }, [])

  const homeHandler = (event) => {
    event.preventDefault();
    router.push("/");
  };

  const myListHandler = (event) => {
    event.preventDefault();
    router.push("/browse/my-list");
  };

  const dropdownHandler = (event) => {
    event.preventDefault();
    setDropdown((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>
            <Image
              src="/static/icon/netflix.svg"
              alt="Netflix Logo"
              width="128"
              height="48"
            />
          </div>
        </a>
        {auth === "false" ? (
          <React.Fragment>
            <ul className={styles.navItems}>
              <li className={styles.navItem} onClick={homeHandler}>
                Home
              </li>
              <li className={styles.navItem2} onClick={myListHandler}>
                My List
              </li>
            </ul>

            <nav className={styles.navContainer}>
              <div>
                <button className={styles.usernameBtn}>
                  <p className={styles.username} onClick={dropdownHandler}>
                    <Image
                      src="/static/icon/profile.svg"
                      alt="user profile image"
                      width="50"
                      height="50"
                    />
                  </p>
                </button>
                {dropdown && (
                  <div className={styles.navDropdown}>
                    <div>
                      <p className={styles.linkName}>{username}</p>
                      <Link className={styles.linkName} href="/login">
                        Sign Out
                      </Link>
                      <div className={styles.lineWrapper}></div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

export default NavBar;

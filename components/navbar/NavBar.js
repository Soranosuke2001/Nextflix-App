import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import { mClient } from "@/lib/magic-client";

import styles from "./NavBar.module.css";

const NavBar = () => {
  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { email } = await mClient.user.getMetadata();
      const didToken = await mClient.user.getIdToken();
      console.log({ didToken });

      if (email) {
        setUsername(email);
      }
    };

    try {
      fetchUserInfo();
    } catch (error) {
      console.log("Error fetching user info: ", error);
    }
  }, []);

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

  const logoutHandler = async (event) => {
    event.preventDefault();

    try {
      await mClient.user.logout();
      console.log(await mClient.user.isLoggedIn());
      router.push("/login");
    } catch (error) {
      console.log("Error logging the user out: ", error);
      router.push("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
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
            <button className={styles.usernameBtn} onClick={dropdownHandler}>
              <p className={styles.username}>
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
                  <a className={styles.linkName} onClick={logoutHandler}>
                    Sign Out
                  </a>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;

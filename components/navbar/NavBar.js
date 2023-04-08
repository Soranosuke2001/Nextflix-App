import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import styles from "./NavBar.module.css";

const NavBar = (props) => {
  const { username } = props;

  const router = useRouter();
  const [dropdown, setDropdown] = useState(false);

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
                  <Link className={styles.linkName} href="/login">
                    Sign Out
                  </Link>
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

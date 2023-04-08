import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./NavBar.module.css";

const NavBar = (props) => {
  const { username } = props;

  const router = useRouter();

  const homeHandler = (event) => {
    event.preventDefault();
    router.push('/');

  }

  const myListHandler = (event) => {
    event.preventDefault();
    router.push('/browse/my-list');
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>Netflix</div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={homeHandler}>Home</li>
          <li className={styles.navItem2} onClick={myListHandler}>My List</li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn}>
              <p className={styles.username}>{username}</p>
            </button>
            {/* Expand more icons */}
            <div className={styles.navDropdown}>
              <div>
                <Link className={styles.linkName} href='/login'>Sign Out</Link>
                <div className={styles.lineWrapper}></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;

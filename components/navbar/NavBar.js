import styles from "./NavBar.module.css";

const NavBar = (props) => {
  const { username } = props;
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink} href="/">
          <div className={styles.logoWrapper}>Netflix</div>
        </a>
      </div>
      <ul className={styles.navItems}>
        <li className={styles.navItem}>Home</li>
        <li className={styles.navItem2}>My List</li>
      </ul>

      <nav className={styles.navContainer}>
        <div>
          <button className={styles.usernameBtn}>
            <p className={styles.username}>{username}</p>
          </button>
          {/* Expand more icons */}
          <div className={styles.navDropdown}>
            <div>
              <a className={styles.linkName}>Sign Out</a>
              <div className={styles.lineWrapper}></div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;

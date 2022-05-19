import styles from "../styles/Hamburger.module.css";

const Hamburger = ({ displayHamburgerMenu }) => {
  return (
    <button className={styles.hamburger} onClick={displayHamburgerMenu}>
      <span className={styles.hamburger__box}>
        <span className={styles.hamburger__inner}></span>
      </span>
    </button>
  );
};

export default Hamburger;

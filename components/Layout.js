import Head from "next/head";
import Link from "next/dist/client/link";
import Image from "next/image";
import logo from "../public/devRoadLogo.svg";
import styles from "../styles/Layout.module.css";
import Hamburger from "./Hamburger";
import { useRef } from "react";

export const siteTitle = "DevRoad Blog";

const Layout = ({ children, home }) => {
  const hamburger = useRef(null);
  const displayHamburgerMenu = () => {
    hamburger.current.classList.toggle(`${styles.hamburgerMenu_active}`);
  };
  return (
    <div className={styles.layout}>
      <Head>
        <meta
          name="description"
          content="DevRoad Blog about programming and web technologies"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <Link href="/">
          <a>
            <Image src={logo} width={208}></Image>
          </a>
        </Link>
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            <li className={styles.nav_list__item}>
              <Link href="/">
                <a className={styles.nav_list__link}>Home</a>
              </Link>
            </li>
            <li className={styles.nav_list__item}>
              <Link href="/about">
                <a className={styles.nav_list__link}>About</a>
              </Link>
            </li>
            <li className={styles.nav_list__item}>
              <Link href="/contact">
                <a className={styles.nav_list__link}>Contact</a>
              </Link>
            </li>
            <li>
              {" "}
              <Hamburger
                displayHamburgerMenu={displayHamburgerMenu}
              ></Hamburger>
            </li>
          </ul>
          <ul ref={hamburger} className={styles.hamburgerMenu}>
            <li className={styles.hamburgerMenu__item}>
              <Link href="/">
                <a className={styles.nav_list__link}>Home</a>
              </Link>
            </li>
            <li className={styles.hamburgerMenu__item}>
              <Link href="/about">
                <a className={styles.nav_list__link}>About</a>
              </Link>
            </li>
            <li className={styles.hamburgerMenu__item}>
              <Link href="/contact">
                <a className={styles.nav_list__link}>Contact</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.home}>{children}</main>
      {!home && (
        <div className={styles.back}>
          <Link href="/">
            <a className={styles.nav_list__link}>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;

import { useRef } from "react";
import Layout from "../components/Layout";
import styles from "../styles/contact.module.css";

const contact = () => {
  const copied = useRef();

  const mailCopy = (mail) => {
    navigator.clipboard.writeText(`${mail}`);
    copied.current.classList.add(`${styles.active}`);
  };

  return (
    <Layout>
      <section className={styles.contact}>
        <h2 className={styles.contact__header}>Contact mail</h2>
        <div className={styles.contact__info}>
          <p
            className={styles.contact__mail}
            onClick={() => mailCopy("devroad@protonmail.com")}
          >
            devroad@protonmail.com
          </p>
          <span ref={copied} className={styles.contact__copied}>
            Copied
          </span>
        </div>
      </section>
    </Layout>
  );
};

export default contact;

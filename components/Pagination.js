import styles from "../styles/Pagination.module.css";

const Pagination = ({ pages, page, setPage }) => {
  return (
    <div className={styles.pagination}>
      <span
        className={styles.page_button}
        onClick={() => (page > 0 ? setPage(page - 1) : setPage(page))}
      >{`<<`}</span>
      <div>{pages}</div>
      <span
        className={styles.page_button}
        onClick={() =>
          page < pages.length - 1 ? setPage(page + 1) : setPage(page)
        }
      >{`>>`}</span>
    </div>
  );
};

export default Pagination;

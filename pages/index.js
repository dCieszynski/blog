import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import sanity from "../lib/sanity";
import Date from "../components/Date";
import Layout, { siteTitle } from "../components/Layout";
import Pagination from "../components/Pagination";
import React, { useEffect, useState } from "react";

const query = `*[_type == "post"] | order(publishedAt desc) {
  title,
  slug,
  author,
  publishedAt,
  description,
}`;

export const getStaticProps = async () => {
  const posts = await sanity.fetch(query);
  return {
    props: {
      posts,
    },
  };
};

export default function Home({ posts }) {
  const postPerPage = 20;
  let postsOnPage = posts.slice(0, postPerPage);

  const [pageContent, setPageContent] = useState(postsOnPage);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (postsOnPage !== posts.slice(0, postPerPage)) {
      postsOnPage = posts.slice(
        postPerPage * page,
        postPerPage * page + postPerPage
      );
      setPageContent(postsOnPage);
    }
  }, [page]);

  const getPages = () => {
    const countPages = (postPerPage, posts) => {
      const numberOfPages = Math.ceil(posts.length / postPerPage);
      return numberOfPages;
    };

    let content = [];
    let pages = countPages(postPerPage, posts);
    for (let i = 0; i < pages; i++) {
      let className = styles.page_button;
      if (page == i) {
        className = styles.page_button + " " + styles.active;
        content.push(
          <span className={className} key={i} onClick={() => setPage(i)}>
            {i + 1}
          </span>
        );
      }
      if (page != i) {
        content.push(
          <span
            className={styles.page_button}
            key={i}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </span>
        );
      }
    }
    return content;
  };

  const pages = getPages();

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <p className={styles.description}>
        Blog about programming and web technologies
      </p>
      <section>
        <h2 className={styles.header2}>Posts</h2>
        <div>
          {pageContent.map((post) => (
            <div key={post.slug.current} className={styles.post}>
              <Link href={`/post/${post.slug.current}`}>
                <a className={styles.post__title}>{post.title}</a>
              </Link>
              <p className={styles.post__info}>
                <Date dateString={post.publishedAt}></Date> |{" "}
                <span>{post.author}</span>
              </p>
              <p className={styles.post__text}>
                {post.description}{" "}
                <Link href={`/post/${post.slug.current}`}>
                  <a className={styles.grey}> [→]</a>
                </Link>
              </p>
            </div>
          ))}
        </div>
      </section>
      <Pagination pages={pages} page={page} setPage={setPage} />
    </Layout>
  );
}

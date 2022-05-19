import Head from "next/head";
import Layout from "../../components/Layout";
import Date from "../../components/Date";
import sanity from "../../lib/sanity";
import styles from "../../styles/post.module.css";
import SanityBlockContent from "@sanity/block-content-to-react";

export const getStaticPaths = async () => {
  const queryPostSlug = `*[_type == "post"] {slug}`;
  const posts = await sanity.fetch(queryPostSlug);
  const paths = posts.map((post) => ({
    params: { slug: post.slug.current },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const { slug = "" } = context.params;
  const post = await sanity.fetch(
    `*[_type == "post" && slug.current == $slug][0]
  `,
    { slug }
  );
  return {
    props: { post },
  };
};

const Post = ({ post }) => {
  console.log(post.body);
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <section>
        <h1 className={styles.post__title}>{post.title}</h1>
        <p className={styles.post__info}>
          <Date dateString={post.publishedAt}></Date> |{" "}
          <span>{post.author}</span>
        </p>
        <SanityBlockContent
          className={styles.post__content}
          blocks={post.body}
          projectId="0ax73iur"
          dataset="production"
        ></SanityBlockContent>
      </section>
    </Layout>
  );
};

export default Post;

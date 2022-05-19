import Image from "next/image";
import Layout from "../components/Layout";
import sanity from "../lib/sanity";
import styles from "../styles/post.module.css";
import SanityBlockContent from "@sanity/block-content-to-react";

const query = `*[_type == "bio"][0 ]{
  author,
  "imageUrl": image.asset->url,
  body,
}`;

export const getStaticProps = async () => {
  const bio = await sanity.fetch(query);
  return {
    props: {
      bio,
    },
  };
};

const imgLoader = ({ src }) => {
  return `${src}`;
};

const about = ({ bio }) => {
  console.log(bio.body);
  return (
    <Layout>
      <div>
        <Image
          loader={imgLoader}
          src={bio.imageUrl}
          width={800}
          height={450}
        ></Image>
        <div>
          <h1 className={styles.bio__title}>{bio.author}</h1>
          <SanityBlockContent
            className={styles.post__content}
            blocks={bio.body}
            projectId="0ax73iur"
            dataset="production"
          ></SanityBlockContent>
        </div>
      </div>
    </Layout>
  );
};

export default about;

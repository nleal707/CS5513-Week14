// Import the Head component from Next.js to manage the document's <head>
import Head from 'next/head';
// Import the Layout component and siteTitle variable for a consistent page structure and title
import Layout, { siteTitle } from '../components/layout';
// Import utility styles for common styling patterns
import utilStyles from '../styles/utils.module.css';
// Import a function to fetch and sort blog post data from an external source
import { getSortedPostsData } from '../lib/posts-json';
// Import the Link component from Next.js for client-side navigation
import Link from 'next/link';
// Import a custom Date component to format and display dates
import Date from '../components/date';
// Import the Button component from the react-bootstrap library
import Button from 'react-bootstrap/Button';

// Export an async function called getStaticProps for static site generation (SSG) with ISR
export async function getStaticProps() {
  // Fetch the sorted post data at build time
  const allPostsData = await getSortedPostsData();
  // Return the fetched data as props to the component
  return {
    props: {
      allPostsData,
    },
    revalidate: 60
  };
}

// Define and export the Posts component, which displays a list of blog posts
export default function Posts({ allPostsData }) {
  // The component returns JSX to be rendered to the screen
  return (
    <Layout>
      <Head>
        <title>Blog Posts - {siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>Blog Posts</h1>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {allPostsData && allPostsData.length > 0 ? (
            allPostsData.map(({ id, date, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>
            ))
          ) : (
            <li className={utilStyles.listItem}>No posts available</li>
          )}
        </ul>
      </section>
      <h2>
        <Button className={utilStyles.button}><Link className={utilStyles.buttonLink} href="/">Back to home</Link></Button>
      </h2>
    </Layout>
  );
}


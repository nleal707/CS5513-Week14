// Import the Head component from Next.js to manage the document's <head>
import Head from 'next/head';
// Import the Layout component and siteTitle variable for a consistent page structure and title
import Layout, { siteTitle } from '../components/layout';
// Import utility styles for common styling patterns
import utilStyles from '../styles/utils.module.css';
// Import a function to fetch and sort snack data
import { getSortedSnacksData } from '../lib/snacks-json';
// Import the Link component from Next.js for client-side navigation
import Link from 'next/link';
// Import the Button component from the react-bootstrap library
import Button from 'react-bootstrap/Button';

// Export an async function called getStaticProps for static site generation (SSG) with ISR
export async function getStaticProps() {
  // Fetch the sorted snack data at build time
  const allSnacksData = await getSortedSnacksData();
  // Return the fetched data as props to the component
  return {
    props: {
      allSnacksData,
    },
    revalidate: 60
  };
}

// Define and export the Snacks component, which displays a list of snacks
export default function Snacks({ allSnacksData = [] }) {
  // The component returns JSX to be rendered to the screen
  return (
    <Layout>
      <Head>
        <title>Snacks - {siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>Snacks</h1>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {allSnacksData && allSnacksData.length > 0 ? (
            allSnacksData.map(({ id, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/snacks/${id}`}>{title}</Link>
                <br />
              </li>
            ))
          ) : (
            <li className={utilStyles.listItem}>No snacks available</li>
          )}
        </ul>
      </section>
      <h2>
        <Button className={utilStyles.button}><Link className={utilStyles.buttonLink} href="/">Back to home</Link></Button>
      </h2>
    </Layout>
  );
}


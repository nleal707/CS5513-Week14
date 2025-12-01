// Import the Head component from Next.js to manage the document's <head>
import Head from 'next/head';
// Import the Layout component and siteTitle variable for a consistent page structure and title
import Layout, { siteTitle } from '../components/layout';
// Import utility styles for common styling patterns
import utilStyles from '../styles/utils.module.css';
// Import a function to fetch and sort transaction data
import { getSortedTransactionsData } from '../lib/transactions-json';
// Import the Link component from Next.js for client-side navigation
import Link from 'next/link';
// Import the Button component from the react-bootstrap library
import Button from 'react-bootstrap/Button';

// Export an async function called getStaticProps for static site generation (SSG) with ISR
export async function getStaticProps() {
  // Fetch the sorted transaction data at build time
  const allTransactionsData = await getSortedTransactionsData();
  // Return the fetched data as props to the component
  return {
    props: {
      allTransactionsData,
    },
    revalidate: 60
  };
}

// Define and export the Transactions component, which displays a list of transactions
export default function Transactions({ allTransactionsData = [] }) {
  // The component returns JSX to be rendered to the screen
  return (
    <Layout>
      <Head>
        <title>Transactions - {siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>Transactions</h1>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {allTransactionsData && allTransactionsData.length > 0 ? (
            allTransactionsData.map(({ id, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/transactions/${id}`}>{title}</Link>
                <br />
              </li>
            ))
          ) : (
            <li className={utilStyles.listItem}>No transactions available</li>
          )}
        </ul>
      </section>
      <h2>
        <Button className={utilStyles.button}><Link className={utilStyles.buttonLink} href="/">Back to home</Link></Button>
      </h2>
    </Layout>
  );
}


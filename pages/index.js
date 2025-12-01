// Import the Head component from Next.js to manage the document's <head>
import Head from 'next/head';
// Import the Layout component and siteTitle variable for a consistent page structure and title
import Layout, { siteTitle } from '../components/layout';
// Import utility styles for common styling patterns
import utilStyles from '../styles/utils.module.css';
// Import a function to fetch and sort blog post data from an external source. Changed from posts.js to posts-json.js.
import { getSortedPostsData } from '../lib/posts-json';
import { getSortedContactsData } from '../lib/contacts-json';
import { getSortedProductsData } from '../lib/products-json';
import { getSortedTransactionsData } from '../lib/transactions-json';
import { getSortedSnacksData } from '../lib/snacks-json';
import { getSortedPlacesData } from '../lib/places-json';
// Import the Link component from Next.js for client-side navigation
import Link from 'next/link';
// Import a custom Date component to format and display dates
import Date from '../components/date';
// Import the Image component from Next.js
import Image from 'next/image'
 
// Export an async function called getStaticProps for static site generation (SSG)
export async function getStaticProps() {
  // Fetch the sorted post data at build time
  // const allPostsData = getSortedPostsData();
  const allPostsData = await getSortedPostsData();
  const allContactsData = await getSortedContactsData();
  const allProductsData = await getSortedProductsData();
  const allTransactionsData = await getSortedTransactionsData();
  const allSnacksData = await getSortedSnacksData();
  const allPlacesData = await getSortedPlacesData();
  // Return the fetched data as props to the Home component
  return {
    props: {
      allPostsData,
      allContactsData,
      allProductsData,
      allTransactionsData,
      allSnacksData,
      allPlacesData
    },
    revalidate: 60
  };
}
 
// Define and export the Home component, which serves as the main page
export default function Home ({ allPostsData, allContactsData, allProductsData, allTransactionsData, allSnacksData, allPlacesData }) {
  // The component returns JSX to be rendered to the screen
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm Nick, a full stack web developer.</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {/* removed featured_image because it does not exists in json data*/}
          {allPostsData.map(({ id, date, title /* , featured_image*/ }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
              {/* removed featured_image because it does not exists in json data
              <br />
              <Image
                src={featured_image}
                width={400}
                height={300}
                alt="featured image"
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
              */}
            </li>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Contacts</h2>
        <ul className={utilStyles.list}>
          {allContactsData && allContactsData.length > 0 ? (
            allContactsData.map(({ id, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/contacts/${id}`}>{title}</Link>
                <br />
              </li>
            ))
          ) : (
            <li className={utilStyles.listItem}>No contacts available</li>
          )}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Products</h2>
        <ul className={utilStyles.list}>
          {allProductsData && allProductsData.length > 0 ? (
            allProductsData.map(({ id, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/products/${id}`}>{title}</Link>
                <br />
              </li>
            ))
          ) : (
            <li className={utilStyles.listItem}>No products available</li>
          )}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Transactions</h2>
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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Snacks</h2>
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
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Places</h2>
        <ul className={utilStyles.list}>
          {allPlacesData && allPlacesData.length > 0 ? (
            allPlacesData.map(({ id, title }) => (
              <li className={utilStyles.listItem} key={id}>
                <Link href={`/places/${id}`}>{title}</Link>
                <br />
              </li>
            ))
          ) : (
            <li className={utilStyles.listItem}>No places available</li>
          )}
        </ul>
      </section>
    </Layout>
  );
}
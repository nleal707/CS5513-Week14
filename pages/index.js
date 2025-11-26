import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { fetchCptList } from '../lib/wordpress';
import Date from '../components/date';

export async function getStaticProps() {
  const contacts = await fetchCptList('contact');

  return {
    props: {
      contacts,
    },
    revalidate: 60,
  };
}

export default function Home({ contacts }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm Nick, a full stack web developer.</p>
        <p>
          Need products or transactions instead? Visit{' '}
          <Link href="/products">/products</Link> or{' '}
          <Link href="/transactions">/transactions</Link>.
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Contacts</h2>
        <ul className={utilStyles.list}>
          {contacts.map(({ id, title, slug, date }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/contacts/${slug}`}>{title}</Link>
              <br />
              {date && (
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
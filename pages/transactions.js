import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { fetchCptList } from '../lib/wordpress';
import Date from '../components/date';

export async function getStaticProps() {
  const transactions = await fetchCptList('transaction');

  return {
    props: {
      transactions,
    },
    revalidate: 60,
  };
}

export default function TransactionsPage({ transactions }) {
  return (
    <Layout>
      <Head>
        <title>Transactions</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={utilStyles.headingLg}>Transactions</h1>
        <p>
          Need contacts or products? Visit <Link href="/">home</Link> or{' '}
          <Link href="/products">products</Link>.
        </p>
        <ul className={utilStyles.list}>
          {transactions.map(({ id, title, slug, date }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/transactions/${slug}`}>{title}</Link>
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


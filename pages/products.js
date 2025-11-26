import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { fetchCptList } from '../lib/wordpress';
import Date from '../components/date';

export async function getStaticProps() {
  const products = await fetchCptList('product');

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
}

export default function ProductsPage({ products }) {
  return (
    <Layout>
      <Head>
        <title>Products</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1 className={utilStyles.headingLg}>Products</h1>
        <p>
          Looking for contacts or transactions? Visit <Link href="/">home</Link>{' '}
          or <Link href="/transactions">transactions</Link>.
        </p>
        <ul className={utilStyles.list}>
          {products.map(({ id, title, slug, date }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/products/${slug}`}>{title}</Link>
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


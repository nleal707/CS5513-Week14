import Head from 'next/head';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import Date from '../../components/date';
import Link from 'next/link';
import { createCptStaticPaths, createCptStaticProps } from '../../lib/cpt-static';

export const getStaticPaths = createCptStaticPaths('product');
export const getStaticProps = createCptStaticProps('product');

export default function ProductDetailPage({ post }) {
  const customFieldEntries = Object.entries(post.customFields || {});
  const visibleFields = customFieldEntries.slice(0, Math.max(3, customFieldEntries.length));

  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <article className={utilStyles.headingMd}>
        <h1 className={utilStyles.headingXl}>{post.title}</h1>
        {post.date && (
          <p className={utilStyles.lightText}>
            <Date dateString={post.date} />
          </p>
        )}
        <section
          className={utilStyles.headingMd}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {visibleFields.length > 0 && (
          <section className={utilStyles.headingMd}>
            <h2 className={utilStyles.headingLg}>Product Details</h2>
            <dl className={utilStyles.fieldList}>
              {visibleFields.map(([key, value]) => (
                <div key={key} className={utilStyles.fieldRow}>
                  <dt>{key}</dt>
                  <dd>{String(value)}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        <p>
          <Link href="/products">Back to products</Link>
        </p>
      </article>
    </Layout>
  );
}

